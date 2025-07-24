import { gameTools } from "./GameTools";



// ComputerDataAnalysis(): ....
export function ComputerDataAnalysis(){
    /** |BCDA (Basic Computer Data Analysis Read)|
     * The computer will read the basic interactive battle elements currently in the
     * battle arena. The computer can read:
     * -> Player battle card (name, attk, cate, def, esse->health).
     * -> Previous player action.
     * -> Previous player damage. 
     * -> Player current singularity points.  
     * 
     * This data will build an transition/input for our FSM. The computer will choose 
     * which state it wants to use for its move.
     */

    // Reads player battle card: 
    if (gameTools.battleCard.cate === "supra")
    {
        // Computer will know that Supras have high attacks and low defense.
        // Cards with high attacks will have bigger critical hits if the they land a '1 attack point'.
        // Computer knows that this is the best card defeat to quickly to avoid the possible critical hits.   
        console.log(`Players battle card name: ${gameTools.battleCard.name}`); // Testing 
        console.log(`Players battle card category: ${gameTools.battleCard.cate}`); // Testing
    }

    // Reads player action: 
    if (gameTools.userAction === "Attack")
    {
        // Attacks could be calculated with low attack points or high attack points like 1.
        // The attacks depend heavily on the category of the card.
        // Critical bonum hits might not be such a big deal for a few turns.
        // Critical fere hits aren't to far off from supra criticals but won't be such a big
        // deal for 2 or 3 turns.
        // Critrical supra hits are the danger zone and should be defended against at all cost. 
        // A miss from either category puts you in a good spot for your next turn. 

        console.log(`Players previous move: ${gameTools.userAction}`); // Testing 

        if (gameTools.userAttkDamage > 0)
        {
            console.log(`Players attack damage: ${gameTools.userAttkDamage}`); // Testing 
        }
        else if (gameTools.userAttkDamage === 0)
        {
            console.log(`Players attacks was a miss.`); // Testing 
        }
    }
    else if (gameTools.userAction === "Defense")
    {
        console.log(`Player's previous move: ${gameTools.userAction}`); // Testing 
    }

    // Reads player singularity points:
    if (gameTools.userSingularityPoints > 0)
    {
        console.log(`Players SP: ${gameTools.userSingularityPoints}`); // Testing 
    }
}