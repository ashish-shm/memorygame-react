import shuffle from 'shuffle-array';

class MemoryCards {
    constructor() {
        this.cards = [];
        this.total_images = 8;
    }

    generateCardSet = () => {
        
        this.cards = [];
        let id = 1;
        for (let i = 1; i <= this.total_images; i++) {
            const card1 = {
                id: id,
                image: i,
                flipped: false,
                matched: false
            };
            id++;
            const card2 = {
                id: id,
                image: i,
                flipped: false,
                matched: false
            };
            this.cards.push(card1);
            this.cards.push(card2);
            id++;
        }

        shuffle(this.cards);
    }

    getCard = (id) => {
        for (let i = 0; i < 2 * this.total_images; i++) {
            if (this.cards[i].id === id) {
                return this.cards[i];
            }
        };
    }

    flipCard = (id, flipped) => {
        this.getCard(id).flipped = flipped;
    }

    setCardAsMatched = (id, matched) => {
        this.getCard(id).matched = matched;
    }

    cardsHaveIdenticalImages = (id1, id2) => {
        if (this.getCard(id1).image === this.getCard(id2).image) {
            return true;
        } else {
            return false;
        }
    }

};

export default MemoryCards;
