// InitiateApplication(): Will initiate the entire application. 
export function InitiateApplication(){
    console.log("Application will initiate"); 

    MainMenuDOM();
    ShuffleCardsDOM(); 
    BattleLevelsDOM(); 
}

// MainMenuContent(): The main menu content. 
function MainMenuDOM(){
    const content = document.getElementById('content');

    const mainMenuContent = document.createElement('div'); 
    mainMenuContent.classList.add('main-menu-content'); 

    content.appendChild(mainMenuContent); 

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
    startButton.textContent = 'Start Game';
    startButton.addEventListener('click', StartGame);

    // Settings:
    const settingsButton = document.createElement('button');
    settingsButton.textContent = 'Settings';

    // SoSu Studio Port/Main Page: 
    const sosuStudioButton = document.createElement('button');
    sosuStudioButton.textContent = 'SoSu Studio';

    mainMenuContent.appendChild(startButton);
    mainMenuContent.appendChild(settingsButton);
    mainMenuContent.appendChild(sosuStudioButton); 
}

// StartGame(): Will start a new game. 
function StartGame(){
    // ShuffleCardsContent(0); 
}

// ShuffleCardsContent(): The shuffle cards content.
function ShuffleCardsDOM(){
    const content = document.getElementById('content');

    const shuffleCardsContent = document.createElement('div');
    shuffleCardsContent.classList.add('shuffle-cards-content'); 

    content.appendChild(shuffleCardsContent); 
}

//BattleLevelsDOM(): Battle level content.
function BattleLevelsDOM(){
    const content = document.getElementById('content');

    const battleLevelsContent = document.createElement('div'); 
    battleLevelsContent.classList.add('battle-levels-content'); 

    content.appendChild(battleLevelsContent);  
}