// InGameMenuContent(): This is the in game menu content.
export function InGameMenuContent(controls){
    const menuContainer = document.createElement('div');
    const menuButton = document.createElement('button'); 

    if (controls === "ShuffleCardsContent")
    {
        InGameShuffleCardsMenu();
    }

}

// InGameShuffleCardsMenu(): The in game menu for the shuffle cards content. 
function InGameShuffleCardsMenu(){
    const shuffleCardsContent = document.querySelector('.shuffle-cards-content'); 

    const container = document.createElement('div'); 
    const menuButton = document.createElement('button');
    menuButton.textContent = "MENU"; 

    container.appendChild(menuButton);
    shuffleCardsContent.appendChild(container); 
}