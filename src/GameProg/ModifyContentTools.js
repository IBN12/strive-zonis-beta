// ModifyContentTools(): Will modify content tools during application actitvites and events.
export function ModifyContentTools(content, reason){

    // Shuffle Cards Content: 
    if (content === 'Shuffle Cards Content')
    {
        const shuffleCardsDisplayed = document.querySelectorAll('.shuffle-cards-content > div > div'); 
        const shuffleCardsContentButtons = document.querySelectorAll('.shuffle-cards-content > button'); 
        if (reason === 'open card info window')
        {
            shuffleCardsDisplayed.forEach((card) => {
                card.classList.add('no-click'); 
            }); 

            shuffleCardsContentButtons.forEach((button) => {
                button.disabled = true; 
            }); 
        }
        else if (reason === 'close card info window')
        {
            shuffleCardsDisplayed.forEach((card) => {
                card.classList.remove('no-click');
            });

            shuffleCardsContentButtons.forEach((button) => {
                button.disabled = false;
            }); 
        }
    }
}