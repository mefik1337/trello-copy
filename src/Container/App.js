import React, {useState, useRef} from 'react';
import './App.scss';
import {Board} from "../Components/Board/Board";
import {Card} from "../Components/Card/Card";

function App() {
    const data = [
        {title: 'To make', cards: ['Card 1', 'Card 2']},
        {title: 'In progress', cards: ['Card 3', 'Card 4']},
        {title: 'Done', cards: ['Card 5', 'Card 6']},
    ];
    const [dataState, setDataState] = useState(data);
    const [isDragging, setIsDragging] = useState(false);

    const draggableItem = useRef();
    const draggableNode = useRef();

    const handleDragStart = (e, params) => {
        console.log('Drag...', params);
        draggableNode.current = e.target;
        draggableNode.current.addEventListener('dragend', handleDragEnd);
        draggableItem.current = params;
        setTimeout(() => setIsDragging(true), 0);
    };

    const handleDragEnd = () => {
        console.log('dragging over..');
        setIsDragging(false);
        draggableItem.current = null;
        draggableNode.current.removeEventListener('dragend', handleDragEnd);
        draggableNode.current = null;
    };

    const handleDragEnter = (e, params) => {
        console.log('enter..', params);
        const currentItem = draggableItem.current;
        if (e.target !== draggableNode.current) {
            console.log("IM NOT A CURRENT TARGET! =)");
            setDataState(oldData => {
                let newData = [...oldData];
                newData[params.groupIndex]
                    .cards.splice(params.itemIndex, 0, newData[currentItem.groupIndex]
                    .cards.splice(currentItem.itemIndex, 1)[0]);
                draggableItem.current = params;
                return newData
            })

        }
    };

    const handleStyles = (params) => {
        const currentElement = draggableItem.current;
        if (currentElement.itemIndex === params.itemIndex && currentElement.groupIndex === params.groupIndex) {
            return "current Card"
        }
        return "Card"
    };

    return (
        <div className="App">
            <h1 className="trello__title">Trello clone</h1>
            <div className="wrapper">
                {dataState.map((group, groupIndex) => (
                    <Board key={group.title}
                    >
                        <div className="Title" onDragEnter={isDragging ? e => handleDragEnter(e, {groupIndex, itemIndex: 0} ): null}>
                            <b>{group.title}</b>
                        </div>
                        {group.cards.map((item, itemIndex) => (
                            <Card key={item}>
                                <div
                                    className={isDragging ? handleStyles({groupIndex, itemIndex}) : "Card"}
                                    draggable
                                    onDragStart={e => handleDragStart(e, {groupIndex, itemIndex})}
                                    onDragEnter={isDragging ? e => handleDragEnter(e, {groupIndex, itemIndex}) : null}
                                >
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
