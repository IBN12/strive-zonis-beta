import { initiatorCards } from "./InitiatorCards";

// ShuffleGate(): Will shuffle all the initiator cards. 
export function ShuffleGate(){
    let supraCards = [];
    let fereCards = [];
    let bonumCards = [];
    let shuffledUserDeck = [];

    initiatorCards.forEach((card) => {
        if (card.cate === "supra")
        {
            supraCards.push(card); 
        }
        else if (card.cate === "fere")
        {
            fereCards.push(card); 
        }
        else if (card.cate === "bonum")
        {
            bonumCards.push(card); 
        }
    });

    shuffledUserDeck.push(supraCards[ShuffleSupraCards(supraCards.length)]); 
    shuffledUserDeck.push(fereCards[ShuffleFereCards(fereCards.length)]);
    const shuffledIndex = ShuffleBonumCards(bonumCards.length);
    shuffledUserDeck.push(bonumCards[shuffledIndex[0]]);
    shuffledUserDeck.push(bonumCards[shuffledIndex[1]]);
    
    return shuffledUserDeck; 
}

// ShuffleSupraCards(): Will shuffle the supra cards.
function ShuffleSupraCards(length){
    const randomNum = Math.floor(Math.random() * length); 
    return randomNum;  
}

// ShuffleFereCards(): Will shuffle the fere cards.
function ShuffleFereCards(length){
    const randomNum = Math.floor(Math.random() * length);
    return randomNum;
}

// ShuffleBonumCards(): Will shuffle the bonum cards.
function ShuffleBonumCards(length){
    let match = false;
    let shuffledIndex = [];
    const randomNum = Math.floor(Math.random() * length);

    while (!match)
    {
        const nextRandomNum = Math.floor(Math.random() * length);

        if (randomNum !== nextRandomNum)
        {
            shuffledIndex.push(randomNum);
            shuffledIndex.push(nextRandomNum);
            match = true;
        }
    }

    return shuffledIndex;
}