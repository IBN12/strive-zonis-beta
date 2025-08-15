// ConfidenceSystem: Will manage and audit the computer confidence points:
export const ConfidenceSystem = {
    // Confidence evaluation for player card category: 
    confidenceLostFromCateEval: 0,
    confidenceForSupraCate: .5,
    confidenceForFereCate: .3,
    confidenceForBonumCate: .1, 

    // Confidence evaluation for the player action (Attack Point Eval): 
    confidenceLostFromAttkPtEval: 0,
    confidenceForOneThird: .1,
    confidenceForOneHalf: .2, 
    confidenceForTwoThirds: .3,
    confidenceForThreeFourths: .4,
    confidenceForOne: .5, 
}