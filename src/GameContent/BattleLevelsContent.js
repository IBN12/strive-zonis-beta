import { gameTools } from "../GameProg/GameTools";
import { userCards } from "../GameProg/UserCards";

// BattleLevelsContent(): The battle level content.
export function BattleLevelsContent(controls){
    /** |Controls Guide|
     * 0 => The initial start for all content declaration in the BattleLevelsContent() function.
     * 
     * 1 => The 'BattleArenaSection()' and 'BattleCardDeckSection()' will be reset after the player
     * switches cards in the 'BattleCardDeckSection()' function. 
     */
    const battleLevelsContent = document.querySelector('.battle-levels-content'); 
    // const battleLevelSection = document.querySelector('.battle-level-section');
    const battleArenaSection = document.querySelector('.battle-arena-section'); 
    const battleCardDeckSection = document.querySelector('.battle-card-deck-section');
    
    if (controls === 0)
    {
        BattleLevelSection();
        BattleArenaSection();
        BattleCardDeckSection(); 
    }
    else if (controls === 1)
    {
        battleLevelsContent.removeChild(battleArenaSection);
        battleLevelsContent.removeChild(battleCardDeckSection); 
        BattleArenaSection();
        BattleCardDeckSection(); 
    }
}

// BattleLevelSection(): Will display the levels that the user is on.  
function BattleLevelSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content'); 

    const battleLevelSection = document.createElement('section'); 
    battleLevelSection.classList.add('battle-level-section');

    // Will display each level the user is on. 
    const battleLevel = document.createElement('h4');
    battleLevel.textContent = "level 1: Unknown Birth"; 

    battleLevelSection.appendChild(battleLevel); 
    battleLevelsContent.appendChild(battleLevelSection); 
}

// BattleSection(): All battles will occur here against the computer.
function BattleArenaSection(){
    const battleLevelsContent = document.querySelector('.battle-levels-content');

    const battleArenaSection = document.createElement('section'); 
    battleArenaSection.classList.add('battle-arena-section'); 

    const userCard = document.createElement('section');
    if (gameTools.switchedCards)
    {
        userCard.textContent = gameTools.battleCard; 
    }
    else 
    {
        userCard.textContent = userCards[0].name; // Default card for the battle arena before switching cards.  
    }

    const compCard = document.createElement('section'); 

    battleArenaSection.appendChild(userCard);
    battleArenaSection.appendChild(compCard); 
    battleLevelsContent.appendChild(battleArenaSection); 
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
    
    battleCardDeckSection.appendChild(userCardDeck); 
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