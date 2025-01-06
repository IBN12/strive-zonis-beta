import { userCards } from "../GameProg/UserCards";
import { ShuffleGate } from "../GameProg/ShuffleGate";

// ShuffleCardsContent(): The shuffle cards content.
export function ShuffleCardsContent(controls){
    /** |Controls Guide|
     * 0 => The initial start for all content declaration in the shuffleCardsContent() function. 
     * 
     * 1 => Will reset all the content declaration in the shuffleCardsContent() function 
     * after the user clicks the shuffle button. This will shuffle the initiator card deck
     * and create a new deck of 4 initiator cards for the user that will also be displayed
     * in the DisplayCardsSection() function. 
     */
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content');
    
    if (controls === 0)
    {
        DisplayCardsSection(); 
        DisplayCards();
        ShuffleButton(); 
        StartButton(); 
    }
    else if (controls === 1)
    {
        shuffleCardsContent.replaceChildren();
        DisplayCardsSection();
        DisplayCards();
        ShuffleButton(); 
        StartButton();  
    }
}

// DisplayCardsSection(): Creates a display card section.
function DisplayCardsSection(){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 

    const displayCardsSection = document.createElement('div');
    displayCardsSection.classList.add('display-cards-section'); 

    for (let i = 0; i < 4; i++){
        const card = document.createElement('div');
        displayCardsSection.appendChild(card); 
    }

    shuffleCardsContent.appendChild(displayCardsSection);
}

// DisplayCards(): Will display all the shuffled initiator cards. 
function DisplayCards(){
    const displayedCards = document.querySelectorAll('.display-cards-section > div'); 

    if (userCards.length === 0)
    {
        displayedCards.forEach((card) => {
            card.textContent = "No Card"; 
        });
    }
    else
    {
        displayedCards.forEach((card, index) => {
            card.textContent = `${userCards[index].name}`;
        });
    }
}

// ShuffleButton(): Will shuffle cards in the card deck.  
function ShuffleButton(){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 
    
    const shuffleButton = document.createElement('button');
    shuffleButton.textContent = 'Shuffle'; 

    shuffleButton.addEventListener('click', ShuffleCards); 

    shuffleCardsContent.appendChild(shuffleButton); 
}

// StartButton(): Will start the game and send the user to the battle arena. 
function StartButton(){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 

    const startButton = document.createElement('button'); 
    startButton.textContent = 'Start';

    shuffleCardsContent.appendChild(startButton); 
}

// ShuffleCards(): Will shuffle the cards consistently. 
function ShuffleCards(e){
    userCards = ShuffleGate(); 
    
    // Disable all the buttons to avoid rapid user clicks. 
    const shuffleButton = document.querySelectorAll('.shuffle-cards-content > button');
    shuffleButton.forEach((button) => {
        button.disabled = true;
    }); 

    const displayedCards = document.querySelectorAll('.display-cards-section > div'); 

    displayedCards.forEach((card, index) => {
        switch(index)
        {
            case 0:
                card.classList.add('shuffle-card-animation');
                setTimeout(() => {card.classList.remove('shuffle-card-animation')}, 1000);
                break;
            case 1: 
                setTimeout(() => {card.classList.add('shuffle-card-animation')}, 1000);
                setTimeout(() => {card.classList.remove('shuffle-card-animation')},  2000); 
                break;
            case 2: 
                setTimeout(() => {card.classList.add('shuffle-card-animation')}, 2000); 
                setTimeout(() => {card.classList.remove('shuffle-card-animation')}, 3000); 
                break;
            case 3: 
                setTimeout(() => {card.classList.add('shuffle-card-animation')}, 3000);
                setTimeout(() => {card.classList.remove('shuffle-card-animation')}, 4000); 
                break;
            default:
                return;
        }
    });

    setTimeout(() => {
        ShuffleCardsContent(1);   
    }, 4500);
}