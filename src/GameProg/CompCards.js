import { otherCards } from "./OtherCards"
import { gameTools } from "./GameTools"

export let compCards = [];

// CreateCompDeck(): Will create the computer card deck based on the level. 
export function CreateCompCardDeck(){
    otherCards.forEach((card) => {
        if (card.levelCard === gameTools.currentLevel)
        {
            compCards.push(card);
        }
    });
}
