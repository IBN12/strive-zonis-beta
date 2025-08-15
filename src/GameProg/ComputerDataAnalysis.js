import { gameTools } from "./GameTools";
import { compCards } from "./CompCards";
import { model } from "./DataModel";
import { ConfidenceSystem } from "./ConfidenceSystem";

// HeuristicAnalysis(): Will perform a heuristic on the battle data that is provided: 
class HeuristicAnalysis {

};

// ComputerDataAnalysis(): ....
export function ComputerDataAnalysis(position){
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
   
    // Add data relational data banks to the model for the first analysis read. 
    AddToDataModel(); 

    // Begin Evaluation:
    if (position === "Before")
    {
        // WGO: This will occur after the player action is completed in order to read the data
        // from the player action before the computer action. 
        console.log("Data Analysis Before Computer Move."); // Testing
        Before();
    }
    else if (position === "After")
    {
        console.log("Data Analysis After Computer Move."); // Testing
        After();
    }
}

// AddToDataModel(): ....
function AddToDataModel(){
    if (!gameTools.dataModelAddedTo)
    {
        model.AddToEsseHistory(compCards); 
        gameTools.dataModelAddedTo = true;  
    }
}

// Before(): Before the computer move - after the player move
function Before(){
    EvaluateCardCategoryBefore();
    EvaluatePlayerActionBefore(); 

    console.log("Before - Computer Esse: ", gameTools.compBattleCard.esse); // Testing 
    console.log("Before - Player Esse: ", gameTools.battleCard.esse); // Testing 
    // EvaluateEsseBefore();
    console.log("\n"); // Testing
}

// After(): After the computer move - before the player move.
function After(){
    console.log("After - Computer Esse: ", gameTools.compBattleCard.esse); // Testing 
    console.log("After - Player Esse: ", gameTools.battleCard.esse); // Testing 
    // EvaluateEsseAfter(); 
    console.log("\n"); // Testing 
}

// EvaluateCardCategoryBefore(): Will evaluate the card category before the computer action.
function EvaluateCardCategoryBefore(){
 
    if (ConfidenceSystem.confidenceLostFromCateEval === 0)
    {
        if (gameTools.battleCard.cate === "supra")
        {
            console.log(`Player card evaluated as ${gameTools.battleCard.cate}`); // Testing
            console.log(`Computer confidence lost by .5`); // Testing 
            gameTools.compBattleCard.confidence -= .5;
            gameTools.compBattleCard.confidenceLost += .5;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            ConfidenceSystem.confidenceLostFromCateEval = .5;
            ConfidenceSystem.confidenceForSupraCate = 0;
        }
        else if (gameTools.battleCard.cate === "fere")
        {
            console.log(`Player card evaluated as ${gameTools.battleCard.cate}.`); // Testing 
            console.log('Computer confidence lost by .3'); // Testing 
            gameTools.compBattleCard.confidence -= .3;
            gameTools.compBattleCard.confidenceLost += .3;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            ConfidenceSystem.confidenceLostFromCateEval = .3;
            ConfidenceSystem.confidenceForFereCate = 0;
        }
        else if (gameTools.battleCard.cate === "bonum")
        {
            console.log(`Player card evaluated as ${gameTools.battleCard.cate}`); // Testing
            console.log('Computer confidence lost by .1'); // Testing 
            gameTools.compBattleCard.confidence -= .1;
            gameTools.compBattleCard.confidenceLost += .1;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            ConfidenceSystem.confidenceLostFromCateEval = .1; 
            ConfidenceSystem.confidenceForBonumCate = 0; 
        }
    }
    else
    {
        // WGO: If the player battle card was switched to another card from a different 'cate' during the player action and 
        // before the computer action, then the computer confidence will change before the computer
        // action. This allows the computer justify its next action with a different set of heuristic values. 
        if (gameTools.battleCard.cate === "supra")
        {
            console.log("Player card evaluated as supra"); // Testing 
            if (ConfidenceSystem.confidenceLostFromCateEval === .3)
            {
                ConfidenceSystem.confidenceLostFromCateEval = .5;
                ConfidenceSystem.confidenceForSupraCate = 0; 
                ConfidenceSystem.confidenceForFereCate = .3;

                gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForFereCate;
                gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromCateEval; 
                gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForFereCate; 
                gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromCateEval; 

                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (ConfidenceSystem.confidenceLostFromCateEval === .1)
            {
                ConfidenceSystem.confidenceLostFromCateEval = .5;
                ConfidenceSystem.confidenceForSupraCate = 0;
                ConfidenceSystem.confidenceForBonumCate = .1; 

                gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForBonumCate; 
                gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromCateEval; 
                gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForBonumCate; 
                gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromCateEval;

                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
        }
        else if (gameTools.battleCard.cate === "fere")
        {
            console.log("Player card evaluated as fere"); // Testing 
            if (ConfidenceSystem.confidenceLostFromCateEval === .5)
            {
                ConfidenceSystem.confidenceLostFromCateEval = .3;
                ConfidenceSystem.confidenceForFereCate = 0;
                ConfidenceSystem.confidenceForSupraCate = .5;

                gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForSupraCate; 
                gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromCateEval;
                gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForSupraCate; 
                gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromCateEval; 

                
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (ConfidenceSystem.confidenceLostFromCateEval === .1)
            {
                ConfidenceSystem.confidenceLostFromCateEval = .3;
                ConfidenceSystem.confidenceForFereCate = 0; 
                ConfidenceSystem.confidenceForBonumCate = .1; 

                gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForBonumCate;
                gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromCateEval;
                gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForBonumCate;  
                gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromCateEval; 

                
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
        }
        else if (gameTools.battleCard.cate === "bonum")
        {
            console.log("Player card evaluated as bonum");  // Testing
            if (ConfidenceSystem.confidenceLostFromCateEval === .5)
            {
                ConfidenceSystem.confidenceLostFromCateEval = .1;
                ConfidenceSystem.confidenceForBonumCate = 0;
                ConfidenceSystem.confidenceForSupraCate = .5; 

                gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForSupraCate;
                gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromCateEval;
                gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForSupraCate;  
                gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromCateEval;

                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (ConfidenceSystem.confidenceLostFromCateEval === .3)
            {
                ConfidenceSystem.confidenceLostFromCateEval = .1;
                ConfidenceSystem.confidenceForBonumCate = 0;
                ConfidenceSystem.confidenceForFereCate = .3; 

                gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForFereCate; 
                gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromCateEval;
                gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForFereCate; 
                gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromCateEval; 

                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
        }
    }
}

// EvaluatePlayerCardActionBefore(): Will evaluate the players action before the computer action. 
function EvaluatePlayerActionBefore(){
    /** |Computer Confidence Lost Based On Player Attack Points|
    * If the player attack Point is 0, then 0 computer confidence is lost.
    * If the player attack point is 1/3 (.3), then .1 computer confidence is lost.
    * If the player attack point is 1/2 (.5), then .2 computer confidence is lost. 
    * If the player attack point is 2/3 (.6), then .3 computer confidence is lost.
    * If the player attack point is 3/4 (.75), then .4 computer confidence is lost. 
    * If the player attacks point is 1 (Critical Hit), then .5 computer confidence is lost.  
    */

    console.log("\nEvaluating the player action..."); // Testing

    if (gameTools.userAction === "Attack")
    {
        if (ConfidenceSystem.confidenceLostFromAttkPtEval === 0)
        {
            if (gameTools.userAttkPoint === 1/3)
            {
                ConfidenceSystem.confidenceLostFromAttkPtEval = .1;
                ConfidenceSystem.confidenceForOneThird = 0;   

                gameTools.compBattleCard.confidence -= .1;
                gameTools.compBattleCard.confidenceLost += .1; 
            }
            else if (gameTools.userAttkPoint === 1/2)
            {
                ConfidenceSystem.confidenceLostFromAttkPtEval = .2;
                ConfidenceSystem.confidenceForOneHalf = 0; 

                gameTools.compBattleCard.confidence -= .2;
                gameTools.compBattleCard.confidenceLost += .2; 
            }
            else if (gameTools.userAttkPoint === 2/3)
            {
                ConfidenceSystem.confidenceLostFromAttkPtEval = .3; 
                ConfidenceSystem.confidenceForTwoThirds = 0;

                gameTools.compBattleCard.confidence -= .3;
                gameTools.compBattleCard.confidenceLost += .3; 
            }
            else if (gameTools.userAttkPoint === 3/4)
            {
                ConfidenceSystem.confidenceLostFromAttkPtEval = .4;
                ConfidenceSystem.confidenceForThreeFourths = 0;

                gameTools.compBattleCard.confidence -= .4;
                gameTools.compBattleCard.confidenceLost += .4; 
            }
            else if (gameTools.userAttkPoint === 1)
            {
                ConfidenceSystem.confidenceLostFromAttkPtEval = .5;
                ConfidenceSystem.confidenceForOne = 0; 

                gameTools.compBattleCard.confidence -= .5;
                gameTools.compBattleCard.confidenceLost += .5; 
            }
        }
        else
        {
            // WGO: If the new attack point is 1/3 of the attack, then you need to change the confidence. 
            if (gameTools.userAttkPoint === 1/3)
            {
                if (ConfidenceSystem.confidenceLostFromAttkPtEval === .2) // Previous 1/2 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval === .1;
                    ConfidenceSystem.confidenceForOneThird = 0; 
                    ConfidenceSystem.confidenceForOneHalf = .2;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneHalf;
                    gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneHalf;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval;  
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .3) // Previous 2/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval === .1
                    ConfidenceSystem.confidenceForOneThird = 0; 
                    ConfidenceSystem.confidenceForTwoThirds = .3;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForTwoThirds;
                    gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromAttkPtEval; 
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForTwoThirds; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .4) // Previous 3/4 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .1;
                    ConfidenceSystem.confidenceForOneThird = 0; 
                    ConfidenceSystem.confidenceForThreeFourths = .4;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForThreeFourths; 
                    gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForThreeFourths;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .5) // Previous 1 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .1;
                    ConfidenceSystem.confidenceForOneThird = 0; 
                    ConfidenceSystem.confidenceForOne = .5; 

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOne;
                    gameTools.compBattleCard.confidence -= ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOne;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
            }
            else if (gameTools.userAttkPoint === 1/2)
            {
                if (ConfidenceSystem.confidenceLostFromAttkPtEval === .1) // Previous 1/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .2;
                    ConfidenceSystem.confidenceForOneHalf = 0; 
                    ConfidenceSystem.confidenceForOneThird = .1; 

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneThird;
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneThird;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .3) // Previous 2/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .2;
                    ConfidenceSystem.confidenceForOneHalf = 0; 
                    ConfidenceSystem.confidenceForTwoThirds = .3;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForTwoThirds
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForTwoThirds
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .4) // Previous 3/4 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .2;
                    ConfidenceSystem.confidenceForOneHalf = 0; 
                    ConfidenceSystem.confidenceForThreeFourths = .4;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForThreeFourths;
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForThreeFourths;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .5) // Previous 1 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .2;
                    ConfidenceSystem.confidenceForOneHalf = 0; 
                    ConfidenceSystem.confidenceForOne = .5;
                    
                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOne;
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOne; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
            }
            else if (gameTools.userAttkPoint === 2/3)
            {
                if (ConfidenceSystem.confidenceLostFromAttkPtEval === .1) // Previous 1/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .3; 
                    ConfidenceSystem.confidenceForTwoThirds = 0;
                    ConfidenceSystem.confidenceForOneThird = .1;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneThird; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneThird;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                } 
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .2) // Previous 1/2 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .3; 
                    ConfidenceSystem.confidenceForTwoThirds = 0;
                    ConfidenceSystem.confidenceForOneHalf = .2;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneHalf; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneHalf; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .4) // Previous 3/4 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .3; 
                    ConfidenceSystem.confidenceForTwoThirds = 0;
                    ConfidenceSystem.confidenceForThreeFourths = .4;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForThreeFourths;
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForThreeFourths; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .5) // Previous 1 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .3; 
                    ConfidenceSystem.confidenceForTwoThirds = 0;
                    ConfidenceSystem.confidenceForOne = .5;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOne; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOne; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
            }
            else if (gameTools.userAttkPoint === 3/4)
            {
                if (ConfidenceSystem.confidenceLostFromAttkPtEval === .1) // Previous 1/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .4;
                    ConfidenceSystem.confidenceForThreeFourths = 0;
                    ConfidenceSystem.confidenceForOneThird = .1;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneThird; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneThird; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .2) // Previous 1/2 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .4;
                    ConfidenceSystem.confidenceForThreeFourths = 0;
                    ConfidenceSystem.confidenceForOneHalf = .2;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneHalf; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneHalf; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .3) // Previous 2/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .4;
                    ConfidenceSystem.confidenceForThreeFourths = 0;
                    ConfidenceSystem.confidenceForTwoThirds = .3; 

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForTwoThirds; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForTwoThirds; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .5) // Previous 1 Attk Point 
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .4;
                    ConfidenceSystem.confidenceForThreeFourths = 0;
                    ConfidenceSystem.confidenceForOne = .5;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOne;
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOne;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
            }
            else if (gameTools.userAttkPoint === 1)
            {
                if (ConfidenceSystem.confidenceLostFromAttkPtEval === .1) // Previous 1/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .5;
                    ConfidenceSystem.confidenceForOne = 0; 
                    ConfidenceSystem.confidenceForOneThird = .1;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneThird;
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneThird;
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .2) // Previous 1/2 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .5;
                    ConfidenceSystem.confidenceForOne = 0; 
                    ConfidenceSystem.confidenceForOneHalf = .2;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForOneHalf; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForOneHalf; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .3) // Previous 2/3 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .5;
                    ConfidenceSystem.confidenceForOne = 0; 
                    ConfidenceSystem.confidenceForTwoThirds = .3;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForTwoThirds; 
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForTwoThirds; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
                else if (ConfidenceSystem.confidenceLostFromAttkPtEval === .4) // Previous 3/4 Attk Point
                {
                    ConfidenceSystem.confidenceLostFromAttkPtEval = .5;
                    ConfidenceSystem.confidenceForOne = 0; 
                    ConfidenceSystem.confidenceForThreeFourths = .4;

                    gameTools.compBattleCard.confidence += ConfidenceSystem.confidenceForThreeFourths;
                    gameTools.compBattleCard.confidence -=  ConfidenceSystem.confidenceLostFromAttkPtEval;
                    gameTools.compBattleCard.confidenceLost -= ConfidenceSystem.confidenceForThreeFourths; 
                    gameTools.compBattleCard.confidenceLost += ConfidenceSystem.confidenceLostFromAttkPtEval; 
                }
            }
        }
    }
    else if (gameTools.userAction === "Defend")
    {
    }
}

// EvaluateEsseBefore(): Evaluate esse before the computer move - After the player move. 
function EvaluateEsseBefore(){
    let esseLength = gameTools.battleCard.esse - gameTools.compBattleCard.esse;
    console.log('Essence Length: ', esseLength); // Testing 
    console.log('User Attack Damage: ', gameTools.userAttkDamage); // Testing 

    esseLength = Math.abs(esseLength); 
    
    if (gameTools.userAction === "Attack" && gameTools.userAttkDamage != 0)
    {
        if (esseLength > 0 && esseLength < 10)
        {
            console.log('Computer confidence lost by .1 = .1'); // Testing
            gameTools.compBattleCard.confidence -= .1;
            gameTools.compBattleCard.confidenceLost += .1;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing

        }
        else if (esseLength >= 10 && esseLength < 20)
        {
            console.log('Computer confidence lost by .1 + .1 = .2'); // Testing 
            gameTools.compBattleCard.confidence -= .2;
            gameTools.compBattleCard.confidenceLost += .2;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 20 && esseLength < 30)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 = .3'); // Testing 
            gameTools.compBattleCard.confidence -= .3;
            gameTools.compBattleCard.confidenceLost += .3;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 30 && esseLength < 40)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 + .1 = .4'); // Testing 
            gameTools.compBattleCard.confidence -= .4;
            gameTools.compBattleCard.confidenceLost += .4;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 40 && esseLength < 50)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 + .1 + .1 = .5'); // Testing 
            gameTools.compBattleCard.confidence -= .5;
            gameTools.compBattleCard.confidenceLost += .5;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 50 && esseLength < 60)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 + .1 + .1 + .1 = .6'); // Testing 
            gameTools.compBattleCard.confidence -= .6;
            gameTools.compBattleCard.confidenceLost += .6;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 60 && esseLength < 70)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 + .1 + .1 + .1 + .1 = .7'); // Testing 
            gameTools.compBattleCard.confidence -= .7;
            gameTools.compBattleCard.confidenceLost += .7;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 70 && esseLength < 80)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 + .1 + .1 + .1 + .1 + .1 = .8'); // Testing
            gameTools.compBattleCard.confidence -= .8;
            gameTools.compBattleCard.confidenceLost += .8;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 80 && esseLength < 90)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 + .1 + .1 + .1 + .1 + .1 + .1 = .9'); // Testing 
            gameTools.compBattleCard.confidence -= .9;
            gameTools.compBattleCard.confidenceLost += .9;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
        else if (esseLength >= 90 && esseLength < 100)
        {
            console.log('Computer confidence lost by .1 + .1 + .1 + .1 + .1 + .1 + .1 + .1 + .1 + .1 = 1'); // Testing 
            gameTools.compBattleCard.confidence -= 1;
            gameTools.compBattleCard.confidenceLost += 1;
            console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
            console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            model.SetEsseHistory(gameTools.compBattleCard.name, esseLength, gameTools.compBattleCard.confidenceLost);
            console.log('Esse History: ', model.esseHistory); // Testing
        }
    }
}



// EvaluateEsseAfter(): Evalute esse after the computer move - Before the player move.
function EvaluateEsseAfter(){
    let esseLength = gameTools.battleCard.esse - gameTools.compBattleCard.esse;
    console.log('Essence Length: ', esseLength); // Testing
    let newConfidenceLost = 0; 

    if (gameTools.compAction === "Attack" && gameTools.compAttkDamage !== 0)
    {
        if (esseLength > 0) // Player is ahead in esse. 
        {
            if (esseLength > 0 && esseLength < 10)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .1); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .1);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 10 && esseLength < 20)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .2); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .2);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 20 && esseLength < 30)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .3); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .3);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 30 && esseLength < 40)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .4); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .4);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 40 && esselength < 50)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .5); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .5);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 50 && esseLength < 60)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .6); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .6);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 60 && esseLength < 70)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .7); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .7);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 70 && esseLength < 80)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .8); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .8);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 80 && esseLength < 90)
            {
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - .9); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - .9);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
            else if (esseLength >= 90 && esseLength <100)
            { 
                gameTools.compBattleCard.confidence += (gameTools.compBattleCard.confidenceLost - 1); 
                newConfidenceLost = (gameTools.compBattleCard.confidenceLost - 1);
                gameTools.compBattleCard.confidenceLost -= newConfidenceLost; 
                console.log("Confidence: ", gameTools.compBattleCard.confidence); // Testing 
                console.log("Confidence Lost: ", gameTools.compBattleCard.confidenceLost); // Testing 
            }
        }
        else if (esseLength < 0)
        {
            console.log("The Computer is ahead in esse."); // Testing 
            console.log("Esse Length: ", esseLength); // Testing
        }
    }
}