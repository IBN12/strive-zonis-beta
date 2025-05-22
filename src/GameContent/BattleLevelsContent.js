import { gameTools } from "../GameProg/GameTools";
import { userCards } from "../GameProg/UserCards";
import { levels } from "../GameProg/Levels";
import { otherCards } from "../GameProg/OtherCards";
import { CreateCompCardDeck, compCards } from "../GameProg/CompCards";

// BattleLevelsContent(): The battle level content.
export function BattleLevelsContent(controls){
    /** |Controls Guide|
     * 0 => The initial start for all content declaration in the BattleLevelsContent() function.
     * 
     * 1 => The 'BattleArenaSection()' and 'BattleCardDeckSection()' will be reset after the player
     * switches cards in the 'BattleCardDeckSection()' function. 
     */

    // Create comp card deck based on the level: 
    if (!gameTools.compCardDeckCreated)
    {
        CreateCompCardDeck();
        gameTools.compCardDeckCreated = true;  
    }

    const battleLevelsContent = document.querySelector('.battle-levels-content'); 
    // const battleLevelSection = document.querySelector('.battle-level-section');
    const battleArenaSection = document.querySelector('.battle-arena-section'); 
    const battleCardStatsSection = document.querySelector('.battle-card-stats-section'); 
    const battleCardDeckSection = document.querySelector('.battle-card-deck-section');
    const battleCommandSection = document.querySelector('.battle-command-section'); 
    
    if (controls === 0)
    {
        BattleLevelSection();
        BattleArenaSection();
        
        BattleCardStatsSection(); 
        BattleCardDeckSection(); 
        BattleCommandSection(); 
    }
    else if (controls === 1)
    {
        battleLevelsContent.removeChild(battleArenaSection);
        battleLevelsContent.removeChild(battleCardStatsSection); 
        battleLevelsContent.removeChild(battleCardDeckSection); 
        battleLevelsContent.removeChild(battleCommandSection); 
        BattleArenaSection();
        BattleCardStatsSection();
        BattleCardDeckSection(); 
        BattleCommandSection(); 
    }
}

// BattleLevelSection(): Will display the levels that the user is on.  
function BattleLevelSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content'); 

    const battleLevelSection = document.createElement('section'); 
    battleLevelSection.classList.add('battle-level-section');

    // Will display each level the user is on. 
    const battleLevel = document.createElement('h4');

    // Current Level:  
    levels.forEach((level) => {
        if (level.level === gameTools.currentLevel)
        {
            battleLevel.textContent = `Level: ${level.level} - ${level.levelName}`; 
        }
    }); 

    battleLevelSection.appendChild(battleLevel); 
    battleLevelsContent.appendChild(battleLevelSection); 
}

// BattleSection(): All battles will occur here against the computer.
function BattleArenaSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content');

    const battleArenaSection = document.createElement('section'); 
    battleArenaSection.classList.add('battle-arena-section'); 

    // User Battle Card: 
    const userCard = document.createElement('section');
    if (gameTools.switchedCards)
    {
        userCard.textContent = gameTools.battleCard; 
    }
    else 
    {
        gameTools.battleCard = userCards[0].name;  // Set 'current battle card' before switching cards. 
        userCard.textContent = userCards[0].name; // Default card for the battle arena before switching cards.  
    }

    // Computer Battle Card: 
    const compCard = document.createElement('section'); 
    if (gameTools.compSwitchedCards)
    {
        console.log("The Computer has switched cards"); // Testing 
    }
    else
    {
        gameTools.compBattleCard = compCards[0]; // Set 'current comp battle card' before comp switches cards. 
        compCard.textContent = compCards[0].name;  // Default comp card for th  battle arena before switching cards. 
    }
    
    battleArenaSection.appendChild(userCard);
    battleArenaSection.appendChild(compCard); 
    battleLevelsContent.appendChild(battleArenaSection); 
}

// BattleCardStats(): The battle card stats of each card in the arena. 
function BattleCardStatsSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content'); 

    const battleCardStatsSection = document.createElement('section');
    battleCardStatsSection.classList.add('battle-card-stats-section');

    // User Battle Card Stats---
    const userBattleCardStats = document.createElement('section'); 
    userCards.forEach((card) => {
        if (card.name === gameTools.battleCard)
        {
            const cate = document.createElement('div'); 
            cate.textContent = `Cate: ${card.cate}`;

            const attk = document.createElement('div'); 
            attk.textContent = `Attk: ${card.attk}`;

            const def = document.createElement('div');
            def.textContent = `Def: ${card.def}`; 

            const esse = document.createElement('div'); 
            esse.textContent = `Esse: ${card.esse}`; 

            userBattleCardStats.appendChild(cate); 
            userBattleCardStats.appendChild(attk); 
            userBattleCardStats.appendChild(def);
            userBattleCardStats.appendChild(esse); 
        }
    });

    // Comp Battle Card Stats--- 
    const compBattleCardStats = document.createElement('section'); 
    

    battleCardStatsSection.appendChild(userBattleCardStats); 
    battleLevelsContent.appendChild(battleCardStatsSection);  
}

// BattleCardDeckSection(): The user can switch there cards here by clicking on the card icons in the deck. 
function BattleCardDeckSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content'); 

    const battleCardDeckSection = document.createElement('section');
    battleCardDeckSection.classList.add('battle-card-deck-section'); 

    const playerBattleCard = document.querySelector('.battle-arena-section > section:nth-child(1)');

    // User Card Deck---
    const userCardDeck = document.createElement('section');
    for (let i = 0; i < userCards.length; i++)
    {
        if (userCards[i].name !== playerBattleCard.textContent)
        {
            const card = document.createElement('div'); 
            card.textContent = userCards[i].shortName; 

            card.addEventListener('click', SwitchCards);

            userCardDeck.appendChild(card); 
        }
    }

    // Comp Card Deck--- 
    const compCardDeck = document.createElement('section'); 
    otherCards.forEach((card) => {
        if (card.levelCard === gameTools.currentLevel)
        {
            const compCard = document.createElement('div');
            compCard.textContent = card.shortName;
            compCardDeck.appendChild(compCard);  
        }
    });
    
    battleCardDeckSection.appendChild(userCardDeck); 
    battleCardDeckSection.appendChild(compCardDeck); 
    battleLevelsContent.appendChild(battleCardDeckSection); 
}

// SwitchCards(): The battle arena cards will be changed out. 
function SwitchCards(e){
    gameTools.switchedCards = true; 

    userCards.forEach((card) => {
        if (card.shortName === e.target.textContent)
        {
            gameTools.battleCard = card.name; 
        }
    });

    // WGO: Will reset some functions in the 'Battle Levels Content' after the player switches cards.
    // Note: This will need to be implemented for the computer also. 
    BattleLevelsContent(1); 
}

// BattleCommandSection(): Player can launch commands from this section. 
function BattleCommandSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content'); 
    
    const battleCommandSection = document.createElement('section'); 
    battleCommandSection.classList.add('battle-command-section'); 

    const attackButton = document.createElement('button'); 
    attackButton.textContent = "Attack";
    const defendButton = document.createElement('button'); 
    defendButton.textContent = "Defend";

    battleCommandSection.appendChild(attackButton); 
    battleCommandSection.appendChild(defendButton); 
    battleLevelsContent.appendChild(battleCommandSection); 
}