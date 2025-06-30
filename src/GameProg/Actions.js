import { otherCards } from "./OtherCards";
import { userCards } from "./UserCards";
import { singularityPoints } from "./SingularityPoints";

// Actions(): Will return a response for every action that the player takes.  
export function Actions(action, actionBy, pBattleCard, cBattleCard){

    let playerBattleCard = null;
    let compBattleCard = null;
    const attkPoints = [1/3, 1/2, 0, 2/3, 3/4, 1, 0]; 

    // Search for the User Battle Card object currently in the battle arena:
    userCards.forEach((card) => {
        if (card.name === pBattleCard)
        {
            playerBattleCard = card;
        }
    });    

    // Search for the Computer Battle Card object currently in the battle arena:
    otherCards.forEach((card) => {
        if (card.name === cBattleCard)
        {
            compBattleCard = card;
        }
    });

    if (actionBy === "Player") // Player Actions
    {
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

            const randomNumber = Math.floor(Math.random() * attkPoints.length);

            let playerAttk = playerBattleCard.attk * attkPoints[randomNumber]; 

            playerAttk = Number(playerAttk.toFixed(0));

            compBattleCard.esse -= playerAttk;

            singularityPoints(action, attkPoints[randomNumber]); // User Singularity Points 
         
            if (playerAttk === 0)
            {
                return 'Missed!';
            }
            else if (playerAttk !== 0 && playerAttk !== 1)
            {
                return `${playerAttk} Hit!`
            }
            else
            {
                return `${playerAttk} Critical Hit!`; 
            }
        }
    }
    else if (actionBy === "Computer") // Computer Actions 
    {
        if (action === "Attack")
        {
            // Computer Attack Logic....
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

            const randomNumber = Math.floor(Math.random() * attkPoints.length); 

            let compAttk = compBattleCard.attk * attkPoints[randomNumber];

            compAttk = Number(compAttk.toFixed(0)); 

            playerBattleCard.esse -= compAttk;
            
            if (compAttk === 0)
            {
                return `Missed!`;
            }
            else if (compAttk !== 0 && compAttk !== 1)
            {
                return `${compAttk} Hit!`; 
            }
            else 
            {
                return `${compAttk} Critical Hit!`; 
            }
        }
    }
}