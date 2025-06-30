import { gameTools } from "./GameTools";

// singularityPoints(): Singularity points for certain actions will be gathered in this function. 
export function singularityPoints(action, attkPoints){

    /** |Temporary Attack Point System|:
    * 0: 0 * attk
    * 1/3: 1/3 * attk
    * 1/2: 1/2 * attk ---> toFixed() method
    * 2/3: 2/3 * attk ---> toFixed() method
    * 3/4: 3/4 * attk
    * 1: 1 * attk
    */

    /** |Temporary Singularity Point System|
     * All Singularity Points will be done through direct conversion for now. 
     * Example: (Action Points) converted to Singularity Points.
     * 
     * => |Attack Points|
     * 0 SP: 0 attk
     * 10 SP: 1/3 attk
     * 20 SP: 1/2 attk
     * 30 SP: 2/3 attk
     * 40 SP: 3/4 attk
     * 50 SP: 1 Critical Attk
    */

    if (action === "Attack")
    {
        switch(attkPoints)
        {
            case 0:
                gameTools.userSingularityPoints += 0;
                break;
            case 1/3:
                gameTools.userSingularityPoints += 10;
                break;
            case 1/2:
                gameTools.userSingularityPoints += 20;
                break;
            case 2/3:
                gameTools.userSingularityPoints += 30;
                break;
            case 3/4:
                gameTools.userSingularityPoints += 40;
                break;
            case 1:
                gameTools.userSingularityPoints += 50;
                break;
            default:
                gameTools.userSingularityPoints = null; 
        }
    }

}