import React, {useState, useRef, useReducer} from 'react';
import './App.scss';
import {Board} from "../Components/Board/Board";
import {Card} from "../Components/Card/Card";
import Input from "../Components/Input/Input";

const initialData = [
    {title: 'To make', cards: ['Card 1', 'Card 2']},
    {title: 'In progress', cards: ['Card 3', 'Card 4']},
    {title: 'Done', cards: ['Card 5', 'Card 6']},
];

function App() {
    const [dataState, setDataState] = useState(initialData);
    const [isDragging, setIsDragging] = useState(false);
    const [isDraggingBoard, setIsDraggingBoard] = useState(false);
    const [columnName, setColumnName] = useState('');
    const [errorsColumns, setErrorsColumns] = useState('');
    let [cardInput, setCardInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            0: '',
            1: '',
            2: '',
        }
    );
    let [errorsCards, setErrorsCardsInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            0: '',
            1: '',
            2: '',
        }
    );
    const draggableItem = useRef();
    const draggableNode = useRef();
    const draggableItemBoard = useRef();
    const draggableNodeBoard = useRef();
    //items
    const handleDragStart = (e, params) => {
        e.stopPropagation();
        draggableNode.current = e.currentTarget;
        draggableNode.current.addEventListener('dragend', handleDragEnd);
        draggableItem.current = params;
        setTimeout(() => setIsDragging(true), 0);
    };
    //board
    const handleDragStartBoard = (e, params) => {
        draggableNodeBoard.current = e.currentTarget;
        draggableItemBoard.current = params;
        setTimeout(() => setIsDraggingBoard(true), 0);
    };
    //cart
    const handleDragEnd = (e) => {
        e.stopPropagation();
        setIsDragging(false);
        draggableNode.current.removeEventListener('dragend', handleDragEnd);
        draggableItem.current = null;
        draggableNode.current = null;
    };
    //board
    const handleDragEndBoard = (e) => {
        e.stopPropagation();
        setIsDraggingBoard(false);
        draggableItemBoard.current = null;
        draggableNodeBoard.current = null;
    };


    const handleDragEnter = (e, params) => {
        let currentItem = draggableItem.current;
        if (e.currentTarget !== draggableNode.current) {
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
    const handleDragEnterBoard = (e, params) => {
        let currentBoard = draggableItemBoard.current;
        if (e.currentTarget !== draggableNodeBoard.current) {
            setDataState(oldData => {
                const newData = JSON.parse(JSON.stringify(oldData));
                newData.splice(params.groupIndex, 0, newData.splice(currentBoard.groupIndex, 1)[0]);
                return newData;
            });
        }
    };
    const handleStyles = (params) => {
        const currentElement = draggableItem.current;
        if (currentElement.itemIndex === params.itemIndex && currentElement.groupIndex === params.groupIndex) {
            return "Card current"
        }
        return "Card"
    };

    const handleStylesBoard = (params) => {
        const currentElement = draggableItemBoard.current;
        if (currentElement.groupIndex === params.groupIndex) {
            return "Board currentBoard"
        }
        return "Board"
    };
    const handleColumnInput = (e) => {setColumnName(e.target.value)};
    const handleSubmitColumns = (e) => {
        e.preventDefault();
        setErrorsColumns('');
            if(columnName){
                const newData = [...dataState, {title: columnName, cards: []}];
                setDataState(newData);
                setColumnName('');
            } else {
                setErrorsColumns('Cant be empty');
            }

    };

    const handleCardInput = (e) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setCardInput({[name]: newValue});
    };

    const handleSubmitInput = (e, group, groupIndex) => {
        e.preventDefault();
        setErrorsCardsInput({[groupIndex]: ''});
        if(cardInput[groupIndex]){
            const newData = [...dataState];
            newData[groupIndex].cards.push(cardInput[groupIndex]);
            setDataState(newData);
            setCardInput({[groupIndex]: ''});
        } else {
            setErrorsCardsInput({[groupIndex]: 'Can\'t be empty'});
        }
    };

    return (
        <div className="App">
            <h1 className="trello__title">Trello clone</h1>
            <div className="wrapper">
                {dataState.map((group, groupIndex) => (
                    <Board key={group.title}
                           title={group.title}
                           group={group}
                           groupIndex={groupIndex}
                           onDragStart={e => handleDragStartBoard(e, {groupIndex})}
                           onDragEnter={isDragging ? e => handleDragEnter(e, {groupIndex, itemIndex: 0}) : null}
                           onDragEnterBoard={isDraggingBoard ? e => handleDragEnterBoard(e, {groupIndex}) : null}
                           onDragEnd={handleDragEndBoard}
                           changeStylesBoard={isDraggingBoard ? handleStylesBoard({groupIndex}) : "Board"}
                    >
                        {group.cards.map((item, itemIndex) => (
                            <Card key={item}
                                  changeStyles={isDragging ? handleStyles({groupIndex, itemIndex}) : "Card"}
                                  onDragStart={e => handleDragStart(e, {groupIndex, itemIndex})}
                                  onDragEnter={isDragging ? e => handleDragEnter(e, {groupIndex, itemIndex}) : null}
                                  item={item}
                            >
                            </Card>
                        ))}
                        <Input
                            key={groupIndex}
                            Name={cardInput[groupIndex]}
                            id={groupIndex}
                            errors={errorsCards[groupIndex]}
                            handleSubmit={e => handleSubmitInput(e, {group}, groupIndex)}
                            handleInput={e => handleCardInput(e)}
                        />
                    </Board>
                ))}
                    <Input
                        errors={errorsColumns}
                        handleSubmit={handleSubmitColumns}
                        handleInput={handleColumnInput}
                        Name={columnName}
                    />
            </div>
        </div>
    );
}

export default App;
