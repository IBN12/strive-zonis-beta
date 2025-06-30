import { gameTools } from "../GameProg/GameTools";
import { userCards } from "../GameProg/UserCards";
import { levels } from "../GameProg/Levels";
import { otherCards } from "../GameProg/OtherCards";
import { Actions } from "../GameProg/Actions";
import { CreateCompCardDeck, compCards } from "../GameProg/CompCards";

// BattleLevelsContent(): The battle level content.
export function BattleLevelsContent(controls){
    /** |Controls Guide|
     * 0 => The initial start for all content declaration in the BattleLevelsContent() function.
     * 
     * 1 => The 'BattleArenaSection()' and 'BattleCardDeckSection()' will be reset after the player
     * switches cards in the 'BattleCardDeckSection()' function.
     * 
     * 2 => Will reset all the sections to display the computers new esse stat in the
     * 'BattleCardStatsSection'. This is done right after the player attacks the computer,
     * and the computer produces the damage output. 
     */

    // Create comp card deck based on the level: 
    if (!gameTools.compCardDeckCreated)
    {
        CreateCompCardDeck();
        gameTools.compCardDeckCreated = true;  
    }

    const battleLevelsContent = document.querySelector('.battle-levels-content'); 
    // const battleLevelSection = document.querySelector('.battle-level-section');
    const battleSingularityPointSection = document.querySelector('.battle-singularity-point-section'); 
    const battleArenaSection = document.querySelector('.battle-arena-section'); 
    const battleCardStatsSection = document.querySelector('.battle-card-stats-section'); 
    const battleCardDeckSection = document.querySelector('.battle-card-deck-section');
    const battleCommandSection = document.querySelector('.battle-command-section'); 
    
    if (controls === 0)
    {
        BattleLevelSection();
        BattleSingularityPointSection();
        BattleArenaSection();
        
        BattleCardStatsSection(); 
        BattleCardDeckSection(); 
        BattleCommandSection(); 
    }
    else if (controls === 1)
    {
        battleLevelsContent.removeChild(battleSingularityPointSection);
        battleLevelsContent.removeChild(battleArenaSection);
        battleLevelsContent.removeChild(battleCardStatsSection); 
        battleLevelsContent.removeChild(battleCardDeckSection); 
        battleLevelsContent.removeChild(battleCommandSection); 
        BattleSingularityPointSection(); 
        BattleArenaSection();
        BattleCardStatsSection();
        BattleCardDeckSection(); 
        BattleCommandSection(); 
    }
    else if (controls === 2)
    {
        battleLevelsContent.removeChild(battleSingularityPointSection); 
        battleLevelsContent.removeChild(battleArenaSection);
        battleLevelsContent.removeChild(battleCardStatsSection); 
        battleLevelsContent.removeChild(battleCardDeckSection);
        battleLevelsContent.removeChild(battleCommandSection); 
        BattleSingularityPointSection();
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

// BattleSingularityPointSection(): This section will contain all the singularity points obtained during battle.
function BattleSingularityPointSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content'); 

    const battleSingularityPointSection = document.createElement('section'); 
    battleSingularityPointSection.classList.add('battle-singularity-point-section');

    const userSP = document.createElement('section'); 
    userSP.textContent = '0 SP';
    const compSP = document.createElement('section'); 
    compSP.textContent = '0 SP';

    battleSingularityPointSection.appendChild(userSP);
    battleSingularityPointSection.appendChild(compSP); 

    battleLevelsContent.appendChild(battleSingularityPointSection); 
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
        gameTools.compBattleCard = compCards[0].name; // Set 'current comp battle card' before comp switches cards. 
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
    compCards.forEach((card) => {
        if (card.name === gameTools.compBattleCard)
        {
            const cate = document.createElement('div');
            cate.textContent = `Cate: ${card.cate}`;

            const attk = document.createElement('div');
            attk.textContent = `Attk: ${card.attk}`;

            const def = document.createElement('div');
            def.textContent = `Def: ${card.def}`;

            const esse = document.createElement('div'); 
            esse.textContent = `Esse: ${card.esse}`;

            compBattleCardStats.appendChild(cate);
            compBattleCardStats.appendChild(attk);
            compBattleCardStats.appendChild(def);
            compBattleCardStats.appendChild(esse); 
        }
    });
    
    battleCardStatsSection.appendChild(userBattleCardStats); 
    battleCardStatsSection.appendChild(compBattleCardStats); 
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

    attackButton.addEventListener('click', PlayerMove);
    defendButton.addEventListener('click', PlayerMove); 

    battleCommandSection.appendChild(attackButton); 
    battleCommandSection.appendChild(defendButton); 
    battleLevelsContent.appendChild(battleCommandSection); 
}

// PlayerMove(): Each player move command will be stationed in this function. 
function PlayerMove(e){
    const compCard = document.querySelector('.battle-arena-section > section:nth-child(2)');
    const userCard = document.querySelector('.battle-arena-section > section:nth-child(1)');

    if (e.target.textContent === 'Attack') // Attack Move
    {
        userCard.classList.add('user-card-attack-anim');

        // Actions(): Will represent all Player and Computer Movements. 
        const actionResponse = Actions('Attack', 'Player', gameTools.battleCard, gameTools.compBattleCard); 

        const damage = document.createElement('div'); 
        damage.textContent = actionResponse; 

        console.log("User SP: ", gameTools.userSingularityPoints); // Testing 

        // WGO: Will append the the 'Comp Battle Card' and produce the damage response cause by the players attack.
        // Will wait 0.5secs for the damage element to append so the computer doesn't attack right when the damage appends. 
        setTimeout(() => {
            compCard.appendChild(damage);
        }, 500); 

        // WGO: (1) Will remove the Player 'user card attack animation'.
        // (2) Damage response will be removed from the 'Comp Battle Card'. 
        // (3) Will reset all the sections in the 'Battle Levels Content' to showcase the new amount of esse
        // that the 'Comp Battle Card' has after the damage caused the Player (An extra 800 secs added after the
        // damage response was added to the 'Comp Battle Card' | Total Time: 1300 secs | Control === 2). 
        setTimeout(() => {
            userCard.classList.remove('user-card-attack-anim');

            const damage = document.querySelector('.battle-arena-section > section:nth-child(2) > div');
            compCard.removeChild(damage); 

            BattleLevelsContent(2); 
        }, 1300);
    }
    if (e.target.textContent === 'defend') // Defend Move 
    {
        const userCard = document.querySelector('.battle-arena-section > section:nth-child(1)'); 
        console.log(userCard); // Testing 
    }

    // WGO: (1) Will call the computer move function after the player move has been initiated.
    // The computer move will have a timer in-order for the player animation to finish. 
    // Overall wait for the computer movement will be 1.9 secs (extra 600 secs) for right now.
    // We are using time for simple algorithms.  
    // (2) The computers damage caused by the players attack will also be removed once
    // the computer is ready for their action. 
    setTimeout(() => { 
        ComputerMove(); 
    }, 1900);
}

// ComputerMove(): Each player move command will be stationed in this function.
function ComputerMove(){
    const userCard = document.querySelector('.battle-arena-section > section:nth-child(1)');
    console.log('Computer turn to attack...'); // Testing 
    // TODO Note: I will have to implement some type of the computer movement algorithm.
    // I may base it on a difficulty level and machine learning algorithms. 
    // But for now I will make a simple algorithm for computer movement. 

    /** Simple Algorithm Computer Movement:
     * Note: This algorithm is temporary
     * compMovement => variable will hold every computer movement. Temporary movement is attack. 
     * Case 1: Computer Attack
    */
    const compMovement = 'Attack';

    if (compMovement === 'Attack') // Computer Attack
    {
        const compCard = document.querySelector('.battle-arena-section > section:nth-child(2)');
        compCard.classList.add('comp-card-attack-anim');

        const actionResponse = Actions('Attack', 'Computer', gameTools.battleCard, gameTools.compBattleCard);

        const damage = document.createElement('div'); 
        damage.textContent = actionResponse; 

        // WGO: Will add the damage amount to the 'User Card' after the computer attack. Appended after .5s. 
        setTimeout(() => {
            userCard.appendChild(damage); 
        }, 500);

        // WGO: (1) Will remove the 'Comp Card Attack Animation' after an additional .8 secs (800 secs more).
        // (2) Removes the damage the from the 'User Card' after .8 secs (800 secs more).
        // (3) Reloads all the sections in the 'Battle Levels Content' to visually see the 'User Card' stats 
        // after the computer attack. 
        // Finialized: This sequence occurs right after the User Card receives damage, that is .8 secs (800 secs more)
        // which results in 1.3 secs (1300 secs total).
        setTimeout(() => {
            compCard.classList.remove('comp-card-attack-anim');  
            userCard.removeChild(damage);
            BattleLevelsContent(2); 
        }, 1300);
    }

    // setTimeout(() => {
    //     BattleLevelsContent(2);
    // }, 1200);
}