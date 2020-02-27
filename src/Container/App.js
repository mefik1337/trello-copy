import React, {useState, useRef} from 'react';
import './App.scss';
import {Board} from "../Components/Board/Board";
import {Card} from "../Components/Card/Card";

function App() {
    const data = [
        {title: 'To make', cards:['Card 1', 'Card 2']},
        {title: 'In progress', cards:['Card 3', 'Card 4']},
        {title: 'Done', cards:['Card 5', 'Card 6']},
    ];

    const [isDragging, setIsDragging] = useState(false);

    const draggableItem = useRef();

    const handleDragStart = (e, params) => {
        console.log('Drag...', params);
        draggableItem.current = params;
        setTimeout(() =>
            setIsDragging(true),0
        );
    };

    const handleDragEnd = () => {
        console.log('dragging over..');
        setIsDragging(false);
        draggableItem.current = null;
    };

    const handleStyles = (params) => {
        const currentElement = draggableItem.current;
        if(currentElement.itemIndex === params.itemIndex && currentElement.groupIndex === params.groupIndex) {
            return "current Card"
        }
        return "Card"
    };

    return (
        <div className="App">
            <h1 className="trello__title">Trello clone</h1>
            <div className="wrapper">
                {data.map((group, groupIndex) => (
                    <Board key={group.title} title={group.title}>
                        {group.cards.map((item, itemIndex) =>(
                            <Card key={item} >
                                <div
                                    className={isDragging ? handleStyles({groupIndex, itemIndex}) : "Card"}
                                     onDragStart={e => handleDragStart(e, {groupIndex, itemIndex})}
                                     onDragEnd={handleDragEnd}
                                     draggable>
                                    <p className="Card__text">{item}</p>
                                </div>
                            </Card>
                        ))}
                    </Board>
                ))}
            </div>
        </div>
    );
}

export default App;
