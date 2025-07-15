// CardDefeated(): ...
export function CardDefeated(cardDefeated, cardDeck, deathAnimation){
    console.log(cardDefeated); // Testing

    if (deathAnimation)
    {
        // Will remove the defeated card from the card deck. 
        cardDeck.forEach((card, index) => {
            if (card.defeated)
            {
                cardDeck.splice(index, 1); 
            }
        });
    }
    else
    {
        cardDefeated.defeated = true; 
        cardDefeated.esse = 0; 
    }
}