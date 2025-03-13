import { userCards } from "../GameProg/UserCards";
import { ShuffleGate } from "../GameProg/ShuffleGate";
import { gameTools } from "../GameProg/GameTools";
import { ModifyContentTools } from "../GameProg/ModifyContentTools";

import closeButton from "../Images/GameTools/window-close.svg"; 

import { BattleLevelsContent } from "./BattleLevelsContent";

// ShuffleCardsContent(): The shuffle cards content.
export function ShuffleCardsContent(controls){
    /** |Controls Guide|
     * 0 => The initial start for all content declaration in the shuffleCardsContent() function. 
     * 
     * 1 => Will reset all the content declaration in the shuffleCardsContent() function 
     * after the user clicks the shuffle button. This will shuffle the initiator card deck
     * and create a new deck of 4 initiator cards for the user that will also be displayed
     * in the DisplayCardsSection() function. 
     * 
     * 2 => Will reset the ShuffleButton() and StartButton() functions when the player reaches the
     * shuffle limit and continues to click the 'Shuffle Button'. 
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
    else if (controls === 2)
    {
        const shuffleButton = document.querySelector('.shuffle-cards-content > button:nth-child(2)');
        const startButton = document.querySelector('.shuffle-cards-content > button:nth-child(3)');

        shuffleCardsContent.removeChild(shuffleButton);
        shuffleCardsContent.removeChild(startButton); 

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
            card.addEventListener('click', OpenCardInfoWindow); 
        });
    }
}

// OpenCardInfoWindow(): Will open a window for the user from the 'display card section' that will showcase the initiator cards info.
function OpenCardInfoWindow(e){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 

    console.log(e.target); // Testing 
    const cardInfoWindow = document.createElement('div'); 
    cardInfoWindow.classList.add('card-info-window'); 
    cardInfoWindow.classList.add('open-card-info-window'); 
    
    // Close Window Button Section:
    const closeWindowButtonSection = document.createElement('div'); 
    const closeWindowButton = document.createElement('img'); 
    closeWindowButton.src = closeButton;
    closeWindowButtonSection.appendChild(closeWindowButton);
    closeWindowButton.addEventListener('click', CloseCardInfoWindow); 

    ModifyContentTools('Shuffle Cards Content', 'open card info window'); 

    cardInfoWindow.appendChild(closeWindowButtonSection);
    shuffleCardsContent.appendChild(cardInfoWindow); 
} 

// CloseCardInfoWindow(): Will close the display window for each card in the 'display card section'.
function CloseCardInfoWindow(){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 

    const cardInfoWindow = document.querySelector('.card-info-window');
    cardInfoWindow.classList.remove('open-card-info-window'); 
    cardInfoWindow.classList.add('close-card-info-window');

    // WGO: Wait a half second for the animation to end before removing 'card info window'. 
    setTimeout(() => {shuffleCardsContent.removeChild(cardInfoWindow);}, 500);

    // WGO: Wait to remove the 'no-click class' when the player closes the window to avoid rapid-clicks. 
    setTimeout(() => {ModifyContentTools('Shuffle Cards Content', 'close card info window');}, 700); 
}

// ShuffleButton(): Will shuffle cards in the card deck.  
function ShuffleButton(){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 
    
    const shuffleButton = document.createElement('button');

    if (gameTools.numberOfShuffles === 3)
    {
        console.log('Shuffle limit reached'); // Testing 
        gameTools.shuffleLimitReached = true;
        shuffleButton.removeEventListener('click', ShuffleCards); 
        shuffleButton.classList.add('shuffle-limit-reached');
        shuffleButton.innerHTML = `Shuffle (${gameTools.numberOfShuffles}) <span>Limit Reached</span>`; 

        // WGO: Will reset the 'ShuffleButton()' and 'StartButton()' functions when the shuffle limit is reached
        // and continues to click the 'Shuffle Button'.  
        shuffleButton.addEventListener('click', () => {
            ShuffleCardsContent(2);
        });
    }
    else
    {
        shuffleButton.addEventListener('click', ShuffleCards); 
        shuffleButton.textContent = `Shuffle (${gameTools.numberOfShuffles})`;
    }

    shuffleCardsContent.appendChild(shuffleButton); 
}

// StartButton(): Will start the game and send the user to the battle arena. 
function StartButton(){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 

    const startButton = document.createElement('button'); 
    startButton.textContent = 'Start';

    if (userCards.length === 0)
    {
        startButton.disabled = true;  
    }

    startButton.addEventListener('click', StartGame); 

    shuffleCardsContent.appendChild(startButton); 
}

// StartGame(): Will begin the game.
function StartGame(){
    BattleLevelsContent(0); 
}

// ShuffleCards(): Will shuffle the cards consistently. 
function ShuffleCards(e){
    userCards = ShuffleGate(); 

    console.log(userCards); // Testing 

    gameTools.numberOfShuffles++; 
    console.log('Shuffles: ', gameTools.numberOfShuffles); // Testing 
    console.log('\n'); // Testing 

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