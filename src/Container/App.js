import React from 'react';
import './App.scss';
import {Board} from "../Components/Board/Board";
import {Card} from "../Components/Card/Card";

function App() {
    return (
        <div className="App">
            <h1 className="trello__title">Trello clone</h1>

            <div className="wrapper">
                <Board>
                    <Card>Card 1</Card>
                    <Card>Card 2</Card>
                </Board>
                <Board>
                    <Card>Card 3</Card>
                    <Card>Card 4</Card>
                </Board>
                <Board>
                    <Card>Card 5</Card>
                    <Card>Card 6</Card>
                </Board>
            </div>
        </div>
    );
}

export default App;
