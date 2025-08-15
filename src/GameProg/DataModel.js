import { gameTools } from "./GameTools";

class DataModel {
    constructor(){
        this.esseHistory = [];
        this.transition = 0;
    }

    AddToEsseHistory(compCards){
        compCards.forEach(card => this.esseHistory.push({name: card.name})); 
    }

    SetEsseHistory(name, esseLength, confidenceLost){
        this.esseHistory.forEach((dataName, index) => {
            if (dataName.name === name)
            {
                this.esseHistory[index][esseLength] = confidenceLost; 
            }
        });
    }
}

export const model = new DataModel(); 