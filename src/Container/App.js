import React from 'react';
import './App.scss';
import {Board} from "../Components/Board/Board";
import {Card} from "../Components/Card/Card";

function App() {
    const data = [
        {title: 'To make', cards:['Card 1', 'Card 2']},
        {title: 'In progress', cards:['Card 2', 'Card 3']},
        {title: 'Done', cards:['Card 4', 'Card 5']},
    ];

    return (
        <div className="App">
            <h1 className="trello__title">Trello clone</h1>
            <div className="wrapper">
                {data.map((group, groupIndex) => (
                    <Board key={group.title}>
                        {group.cards.map((item, itemIndex) =>(
                            <Card key={item}><p className="Card__text">{item}</p></Card>
                        ))}
                    </Board>
                ))}
            </div>
        </div>
    );
}

export default App;
