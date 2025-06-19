import { otherCards } from "./OtherCards";
import { userCards } from "./UserCards";

// Actions(): Will return a response for every action that the player takes.  
export function Actions(action, pBattleCard, cBattleCard){
    console.log('action: ', action); // Testing 
    console.log('Player Battle Card: ', pBattleCard); // Testing
    let playerBattleCard = null;
    let compBattleCard = null;

    // Search for the battle card object by matching the name and assigning it to a variable:
    userCards.forEach((card) => {
        if (card.name === pBattleCard)
        {
            playerBattleCard = card;
        }
    });    

    // Search for the comp battle card object the same way.
    otherCards.forEach((card) => {
        if (card.name === cBattleCard)
        {
            compBattleCard = card;
        }
    });

    if (action === "Attack")
    {
        // TODO Note: The attack point system will change, this is just a temporary
        // system for now. 
        /** Temporary Standard Attack Point System: 
         * 0: 0 * attk
         * 1/3: 1/3 * attk
         * 1/2: 1/2 * attk ---> toFixed() method
         * 2/3: 2/3 * attk ---> toFixed() method
         * 3/4: 3/4 * attk
         * 1: 1 * attk
         */
        console.log('Battle Card Attack Points: ', playerBattleCard.attk); // Testing 
        console.log('0 * attk: ', playerBattleCard.attk * 0); // Testing 
        console.log('1/3 * attk: ', playerBattleCard.attk * 1/3); // Testing ---> toFixed() method 
        console.log('1/2 * attk: ', playerBattleCard.attk * 1/2); // Testing 
        console.log('2/3 * attk: ', playerBattleCard.attk * 2/3); // Testing ---> toFixed() method
        console.log('3/4 * attk: ', playerBattleCard.attk * 3/4); // Testing 
        console.log('1 * attk: ', playerBattleCard.attk * 1); // Testing 
        const attkPoints = [1/3, 1/2, 0, 2/3, 3/4, 1, 0]; 
        const randomNumber = Math.floor(Math.random() * attkPoints.length);
        let playerAttk = playerBattleCard.attk * attkPoints[randomNumber]; 
        playerAttk = Number(playerAttk.toFixed(0));
        console.log('Random Attack Points: ', attkPoints[randomNumber]); // Testing 
        console.log('Random Attack Generated: ', playerAttk); // Testing 
        console.log('Random Attack Point: ', typeof(playerAttk)); // Testing 
        console.log('\n'); //Testing 

        if (playerAttk === 0)
        {
            return 'Missed!';
        }
        else if (playerAttk !== 0 && playerAttk !== 1)
        {
            compBattleCard.esse -= playerAttk;
            return `${playerAttk} Hit!`
        }
        else
        {
            return `${playerAttk} Critical Hit!`; 
        }
    }
}