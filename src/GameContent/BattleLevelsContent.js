import { gameTools } from "../GameProg/GameTools";
import { userCards } from "../GameProg/UserCards";
import { levels } from "../GameProg/Levels";
import { otherCards } from "../GameProg/OtherCards";
import { Actions } from "../GameProg/Actions";
import { CreateCompCardDeck, compCards } from "../GameProg/CompCards";
import { CardDefeated } from "../GameProg/CardDefeated";
import { ModifyContentTools } from "../GameProg/ModifyContentTools";

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
     * 
     * 3 => Will reset the 'BattleCardStatsSection()', 'BattleCardDeckSection()', and 'BattleCommandSection()' when
     * the 'Computer Battle Card' is defeated. Other functions and variables will also be reset inside the 
     * 'BattleLevelsContent(3)' function. 
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
    else if (controls === 3)
    {
        battleLevelsContent.removeChild(battleCardStatsSection); 
        battleLevelsContent.removeChild(battleCardDeckSection); 
        battleLevelsContent.removeChild(battleCommandSection); 
        BattleCardStatsSection();
        BattleCardDeckSection();
        BattleCommandSection(); 

        // WGO: New SP Score with the animation finishing after the 'action response'
        BattleLevelsContent(2); 

        // WGO: (1) Will initiate the death animation for the 'computer battle card'.
        // (2) Will call the 'CardDefeated' function to eliminate the the 'computer battle card' from the 'comp card deck'.
        // Extra 400 seconds added after the 'BattleLevelsContent' was reset. 
        setTimeout(() => {
            const compCard = document.querySelector('.battle-arena-section > section:nth-child(2)');
            compCard.classList.add('death-anim');
            gameTools.compCardDeathAnimAdded = true; 

            CardDefeated(gameTools.compBattleCard, compCards, gameTools.compCardDeathAnimAdded);
            gameTools.compCardDeathAnimAdded = false; 
        }, 1600);

        // WGO: Reset the entire 'BattleLevelsContent' to remove the 'computer battle card' from the arena.  
        // 900 extra seconds after 'Computer Battle Card' death animation is added and completes animation.
        setTimeout(() => {
            BattleLevelsContent(1);
        }, 2500);
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

    // User SP Logic: 
    const userSP = document.createElement('section'); 
    if (gameTools.userSingularityPoints > 0 && gameTools.userTurn)
    {
        gameTools.userTurn = false; 

        if (gameTools.userSingularityPoints > gameTools.userPreviousSingularityPoints)
        {
            userSP.classList.add("sp-anim"); 
        }

        userSP.textContent = `${gameTools.userSingularityPoints} SP`; 
        gameTools.userPreviousSingularityPoints = gameTools.userSingularityPoints; 
        console.log("Player SP: ", gameTools.userSingularityPoints); // Testing 
        console.log("\n"); // Testing 
    }
    else
    {
        userSP.textContent = `${gameTools.userSingularityPoints} SP`; 
    }

    // Computer SP Logic:
    const compSP = document.createElement('section'); 
    if (gameTools.compSingularityPoints > 0 && gameTools.compTurn)
    {
        gameTools.compTurn = false; 

        if (gameTools.compSingularityPoints > gameTools.compPreviousSingularityPoints)
        {
            compSP.classList.add("sp-anim"); 
        }

        compSP.textContent = `${gameTools.compSingularityPoints} SP`; 
        gameTools.compPreviousSingularityPoints = gameTools.compSingularityPoints;
        console.log("Computer SP: ", gameTools.compSingularityPoints); // Testing 
        console.log("\n"); // Testing 
    }
    else
    {
        compSP.textContent = `${gameTools.compSingularityPoints} SP`;  
    }

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
        userCard.textContent = gameTools.battleCard.name; 
    }
    else 
    {
        gameTools.battleCard = userCards[0]; // Set 'current battle card' before switching cards.
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
        // gameTools.compBattleCard = compCards[0].name; // Set 'current comp battle card' before comp switches cards. 
        gameTools.compBattleCard = compCards[0];
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
        if (card.name === gameTools.battleCard.name)
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
        if (card.name === gameTools.compBattleCard.name)
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
    const computerBattleCard = document.querySelector('.battle-arena-section > section:nth-child(2)'); 

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
        if (card.name !== computerBattleCard.textContent && card.levelCard === gameTools.currentLevel && !card.defeated)
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
            gameTools.battleCard = card; 
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

    gameTools.userTurn = true; 
    console.log("Player Action..."); // Testing 

    if (e.target.textContent === 'Attack') // Attack Move
    {
        // Gather the action that the user took and save it as data until the next turn: 
        gameTools.userAction = e.target.textContent;

        // ModifyContentTools: Lets modify content tools so the application doesn't cause any errors from rapid clicking
        // or animation interruption:
        ModifyContentTools("Battle Levels Content", "Attack"); 

        userCard.classList.add('user-card-attack-anim');

        // Actions(): Will represent all Player and Computer Movements. 
        const actionResponse = Actions('Attack', 'Player', gameTools.battleCard, gameTools.compBattleCard); 

        const damage = document.createElement('div'); 
        damage.textContent = actionResponse; 

        // WGO: Will append the 'Comp Battle Card' and produce the damage response cause by the players attack.
        // Will wait 0.5secs for the damage element to append so the computer doesn't attack right when the damage appends. 
        setTimeout(() => {
            compCard.appendChild(damage);
        }, 500); 

        if (gameTools.compBattleCard.defeated) // Test if the user has defeated the computer battle card. 
        {
            // WGO: Main Reason: Controls=3 resets the content to display esse at 0 when the 'comp battle card' has been defeated.
            // Only the 'battle card stats section', 'battle card deck section', and 'battle card command section' will
            // be reset so the death animation can still initiate. 
            // 700 extra seconds after 'Computer Battle Card' damage was added. 
            setTimeout(() => {
                userCard.classList.remove('user-card-attack-anim'); 

                compCard.removeChild(damage);

                BattleLevelsContent(3); 

                ModifyContentTools("Battle Levels Content", "Attack"); 
            }, 1200);
        }
        else
        {
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

                ModifyContentTools("Battle Levels Content", "Attack"); 
            }, 1300);

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
    }
    if (e.target.textContent === 'Defend') // Defend Move 
    {
        const defend = document.createElement('section'); 
        defend.classList.add('user-card-defend-anim');

        let userCardHeight = userCard.clientHeight;
        let userCardWidth = userCard.clientWidth;
        document.documentElement.style.setProperty('--user-card-height', `${userCardHeight}px`);
        document.documentElement.style.setProperty('--user-card-width', `${userCardWidth}px`);

        userCard.appendChild(defend); 
    }
}

// ComputerMove(): Each player move command will be stationed in this function.
function ComputerMove(){
    const compCard = document.querySelector('.battle-arena-section > section:nth-child(2)');
    const userCard = document.querySelector('.battle-arena-section > section:nth-child(1)');

    gameTools.compTurn = true; 
    console.log("Computer Action..."); // Testing 
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

            ModifyContentTools("Battle Levels Content", "Attack"); 
        }, 1300);

        // WGO: ...
        setTimeout(() => {
            ModifyContentTools("Battle Levels Content", "Attack Sequence Done"); 
        }, 1900);
    }

    // setTimeout(() => {
    //     BattleLevelsContent(2);
    // }, 1200);
}