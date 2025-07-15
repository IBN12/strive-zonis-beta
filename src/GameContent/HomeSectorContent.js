import { MainMenuContent } from "./MainMenuContent";

// HomeSectorContent(): The home page for the entire application. 
export function HomeSectorContent(){
    MainSection(); 
}

// MainSection(): The main section for the home page.
function MainSection(){
    const homeSectorContent = document.querySelector('.home-sector-content');

    const mainSection = document.createElement('main');

    const playStriveBtn = document.createElement('button');
    playStriveBtn.textContent = 'Play Strive'; 

    // WGO: Will open the main game here: 
    playStriveBtn.addEventListener('click', PlayStrivePortal);

    mainSection.appendChild(playStriveBtn);
    homeSectorContent.appendChild(mainSection);
}

// PlayStrivePortal(): Will take the player to the Strive main menu. 
function PlayStrivePortal(){
    MainMenuContent(); 
}