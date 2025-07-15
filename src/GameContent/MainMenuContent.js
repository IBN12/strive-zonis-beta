import { ShuffleCardsContent } from "./ShuffleCardsContent";

// MainMenuContent(): The main menu content for the application. 
export function MainMenuContent(){
    AppTitle();
    MenuButtons(); 
}

// AppTitle(): The Application title.
function AppTitle(){
    const mainMenuContent = document.querySelector('.main-menu-content');

    const appTitle = document.createElement('h1');
    appTitle.textContent = "STRIVE";

    mainMenuContent.appendChild(appTitle); 
}

// MenuButtons(): All menu buttons for the main menu.
function MenuButtons(){
    const mainMenuContent = document.querySelector('.main-menu-content'); 

    // Start Game:
    const startButton = document.createElement('button');
    startButton.textContent = "Start Game"; 
    startButton.addEventListener('click', StartGame);

    // Settings:
    const settingsButton = document.createElement('button');
    settingsButton.textContent = "Settings";

    // Sosu Studio Port/Main Page:
    const sosuStudioButton = document.createElement('button');
    sosuStudioButton.textContent = "SoSu Studio";

    mainMenuContent.appendChild(startButton);
    mainMenuContent.appendChild(settingsButton); 
    mainMenuContent.appendChild(sosuStudioButton);  
}

// StartGame(): Will start a new game. 
function StartGame(){
    // ShuffleCardsContent(0);
}