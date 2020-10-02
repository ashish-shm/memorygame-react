import React, { Component } from 'react';
import './style.css';
import CardView from './CardView';
import MemoryCards from './MemoryCards';


class App extends Component {
    state = {};

    constructor(props) {
        super(props)
        this.memoryCards = new MemoryCards();
    }

    componentDidMount() {
        this.startGame();
    }

    startGame = () => {
        this.memoryCards.generateCardSet();
        this.setState({
            turnNo: 1,
            pairsFound: 0,
            numClicksWithinTurn: 0,
            firstId: null,
            secondId: null
        });
    }

    getCardViews = () => {
        const cardViews = [];
        const onClick = this.handleCardClick;
        this.memoryCards.cards.forEach(c => {
            const cardView = <CardView key={c.id}
                id={c.id}
                image={c.image}
                flipped={c.flipped}
                matched={c.matched}
                onClick={onClick} />;
            cardViews.push(cardView);
        });
        return cardViews;
    }

    clearCards = (id1, id2) => {
        if (this.state.numClicksWithinTurn !== 2) {
            return;
        }
        this.memoryCards.flipCard(this.state.firstId, false);
        this.memoryCards.flipCard(this.state.secondId, false);
        this.setState({
            firstId: null,
            secondId: null,
            numClicksWithinTurn: 0,
            turnNo: this.state.turnNo + 1
        });
    }

    handleCardClick = (id, image) => {
        if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
            if (this.state.numClicksWithinTurn === 2) {
                this.clearCards(this.state.firstId, this.state.secondId);
            }
            this.memoryCards.flipCard(id, true);
            this.setState({
                firstId: id,
                numClicksWithinTurn: 1
            });
        } else if (this.state.numClicksWithinTurn === 1) {
            this.memoryCards.flipCard(id, true);
            this.setState({
                secondId: id,
                numClicksWithinTurn: 2
            });

            if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
                this.memoryCards.setCardAsMatched(this.state.firstId, true);
                this.memoryCards.setCardAsMatched(id, true);
                this.setState({
                    pairsFound: this.state.pairsFound + 1,
                    firstId: undefined,
                    secondId: undefined,
                    turnNo: this.state.turnNo + 1,
                    numClicksWithinTurn: 0
                });

            } else {
                this.timeout = setTimeout(() => {
                    this.clearCards(this.state.firstId, this.state.secondId);
                }, 5000);
            }

        }
    }

   

    render() {
        const cardViews = this.getCardViews();
        let gameStatus = <div className='Game-status'>
            <p>Turn: {this.state.turnNo}</p>
            <p>Pairs found: {this.state.pairsFound}</p>
        </div>;

        if (this.state.pairsFound === this.memoryCards.NUM_IMAGES) {
            gameStatus = <div className='Game-status'>
                <p>GAME COMPLETE!</p>
                <p>You used {this.state.turnNo - 1} turns</p>
                </div>;
        }

        return (
            <div className='Game '>
                <div className='status'>
                    {gameStatus}
                </div>
                <div className='CardContainer flex'>
                    {cardViews}
                </div>
            </div>
        );
    }
}

export default App;
