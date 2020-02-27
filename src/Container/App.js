import React, {useState, useRef} from 'react';
import './App.scss';
import {Board} from "../Components/Board/Board";
import {Card} from "../Components/Card/Card";

const initialData = [
    {title: 'To make', cards: ['Card 1', 'Card 2']},
    {title: 'In progress', cards: ['Card 3', 'Card 4']},
    {title: 'Done', cards: ['Card 5', 'Card 6']},
];

function App() {
    const [dataState, setDataState] = useState(initialData);
    const [isDragging, setIsDragging] = useState(false);

    const draggableItem = useRef();
    const draggableNode = useRef();

    const handleDragStart = (e, params) => {
        // console.log('Drag...', params);
        draggableNode.current = e.target;
        draggableItem.current = params;
        setTimeout(() => setIsDragging(true), 0);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        draggableItem.current = null;
        draggableNode.current = null;
    };

    const handleDragEnter = (e, params) => {
        // console.log('enter..', params);
        const currentItem = draggableItem.current;
        if (e.target !== draggableNode.current) {
            // console.log("IM NOT A CURRENT TARGET! =)");
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
                           title={group.title}
                           onDragEnter={isDragging ? e => handleDragEnter(e, {groupIndex, itemIndex: 0}) : null}
                    >
                        {group.cards.map((item, itemIndex) => (
                            <Card key={item}
                                  changeStyles={isDragging ? handleStyles({groupIndex, itemIndex}) : "Card"}
                                  onDragStart={e => handleDragStart(e, {groupIndex, itemIndex})}
                                  onDragEnter={isDragging ? e => handleDragEnter(e, {groupIndex, itemIndex}) : null}
                                  onDragEnd={handleDragEnd}
                                  item={item}
                            >
                            </Card>
                        ))}
                    </Board>
                ))}
            </div>
        </div>
    );
}

export default App;
