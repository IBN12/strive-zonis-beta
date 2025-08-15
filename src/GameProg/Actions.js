import { userCards } from "./UserCards";
import { compCards } from "./CompCards";
import { singularityPoints } from "./SingularityPoints";
import { CardDefeated } from "./CardDefeated";
import { gameTools } from "./GameTools";


// Actions(): Will return a response for every action that the player takes.  
export function Actions(action, actionBy, playerBattleCard, compBattleCard){
    const attkPoints = [1/3, 1/2, 0, 2/3, 3/4, 1, 0]; 

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

            gameTools.userAttkDamage = playerAttk; // Store the attk damage for analytics.
            gameTools.userAttkPoint = attkPoints[randomNumber]; // Store the attk point for analytics. 

            //  Test if the 'comp battle card' has been defeated. 
            if (compBattleCard.esse <= 0)
            {
                console.log(`${compBattleCard.name} has been defeated!`); // Testing 
                CardDefeated(compBattleCard, compCards, gameTools.compCardDeathAnimAdded);
            }

            singularityPoints(action, actionBy, attkPoints[randomNumber]); // User Singularity Points 
         
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
        else if (action === "Defend")
        {   
            return 'Defending'; 
        }
    }
    else if (actionBy === "Computer") // Computer Actions 
    {
        if (action === "Attack")
        {
            gameTools.compAction = "Attack"; 
            let attkDamageLost = 0;

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

            if (gameTools.userAction === "Defend")
            {
                gameTools.userAction = null; // Set the user action back to null to avoid defend continuation. 

                if (compAttk !== 0) // Not a miss
                {
                    attkDamageLost = playerBattleCard.def;

                    if ((compAttk - playerBattleCard.def) <= 0) // Full Defend
                    {
                        playerBattleCard.esse -= 0
                        gameTools.compAttkDamage = 0; 
                    }
                    else
                    {
                        playerBattleCard.esse -= (compAttk - playerBattleCard.def); 
                        gameTools.compAttkDamage = compAttk - playerBattleCard.def; 
                        console.log("Computer Attack damage after user defends: ", (compAttk - playerBattleCard.def)); // Testing  
                    }
                }
                else
                {
                    playerBattleCard.esse -= compAttk; 
                    gameTools.compAttkDamage = compAttk; 
                }
            }
            else
            {
                playerBattleCard.esse -= compAttk;
                gameTools.compAttkDamage = compAttk; 
            }

            singularityPoints(action, actionBy, attkPoints[randomNumber]); // Computer Singularity Points 
            
            if (compAttk === 0)
            {
                return `Missed!`;
            }
            else if (compAttk !== 0 && compAttk !== 1)
            {
                if (gameTools.compAttkDamage === 0)
                {
                    return `0 Hit!`; 
                }
                else 
                {
                    return `${compAttk - attkDamageLost} Hit!`; 
                }
            }
            else 
            {
                return `${compAttk - attkDamageLost} Critical Hit!`; 
            }
        }
    }
}