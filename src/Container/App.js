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
    const [newIndex, setNewIndex] = useState(3);
    let [cardInput, setCardInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            0: '',
            1: '',
            2: '',
        }
    );
    let [errorsCards, setErrorsCards] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            0: '',
            1: '',
            2: '',
        }
    );
    const draggableCard = useRef();
    const draggableCardNode = useRef();
    const draggableBoard = useRef();
    const draggableBoardNode = useRef();
    //items
    const handleDragStart = (e, params) => {
        e.stopPropagation();
        draggableCardNode.current = e.currentTarget;
        draggableCardNode.current.addEventListener('dragend', handleDragEnd);
        draggableCard.current = params;
        setTimeout(() => setIsDragging(true), 0);
    };
    //board
    const handleDragStartBoard = (e, params) => {
        draggableBoardNode.current = e.currentTarget;
        draggableBoard.current = params;
        setCardInput({[params.groupIndex]: ''});
        setTimeout(() => setIsDraggingBoard(true), 0);
    };
    //cart
    const handleDragEnd = (e) => {
        e.stopPropagation();
        setIsDragging(false);
        draggableCardNode.current.removeEventListener('dragend', handleDragEnd);
        draggableCard.current = null;
        draggableCardNode.current = null;
    };
    //board
    const handleDragEndBoard = (e) => {
        e.stopPropagation();
        setIsDraggingBoard(false);
        draggableBoard.current = null;
        draggableBoardNode.current = null;
    };


    const handleDragEnter = (e, params) => {
        let currentItem = draggableCard.current;
        if (e.currentTarget !== draggableCardNode.current) {
            setDataState(oldData => {
                let newData = [...oldData];
                newData[params.groupIndex]
                    .cards.splice(params.itemIndex, 0, newData[currentItem.groupIndex]
                    .cards.splice(currentItem.itemIndex, 1)[0]);
                draggableCard.current = params;
                return newData
            })
        }
    };
    const handleDragEnterBoard = (e, params) => {
        let currentBoard = draggableBoard.current;
        if (e.currentTarget !== draggableBoardNode.current) {
            setDataState(oldData => {
                const newData = JSON.parse(JSON.stringify(oldData));
                newData.splice(params.groupIndex, 0, newData.splice(currentBoard.groupIndex, 1)[0]);
                draggableCard.current = params;
                return newData;
            });
        }
    };
    const stylesCard = (params) => {
        const currentElement = draggableCard.current;
        if (currentElement.itemIndex === params.itemIndex && currentElement.groupIndex === params.groupIndex) {
            return "Card current"
        }
        return "Card"
    };

    const stylesBoard = (params) => {
        const currentElement = draggableBoard.current;
        if (currentElement.groupIndex === params.groupIndex) {
            return "Board currentBoard"
        }
        return "Board"
    };
    const handleChangeColumns = (e) => {setColumnName(e.target.value)};
    const handleSubmitColumns = (e) => {
        e.preventDefault();
        setErrorsColumns('');
            if(columnName){
                const newData = [...dataState, {title: columnName, cards: []}];
                setNewIndex(prevState => {
                  return prevState + 1
                });
                setDataState(newData);
                setColumnName('');
                setCardInput({[newIndex]: ''});
            } else {
                setErrorsColumns('Can\'t be empty');
            }

    };

    const handleChangeCards = (e) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setCardInput({[name]: newValue});
    };

    const handleSubmitCards = (e, group, groupIndex) => {
        e.preventDefault();
        setErrorsCards({[groupIndex]: ''});
        if(cardInput[groupIndex]){
            const newData = [...dataState];
            newData[groupIndex].cards.push(cardInput[groupIndex]);
            setDataState(newData);
            setCardInput({[groupIndex]: ''});
        } else {
            setErrorsCards({[groupIndex]: 'Can\'t be empty'});
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
                           onDragEnd={e => handleDragEndBoard(e, {groupIndex})}
                           changeStylesBoard={isDraggingBoard ? stylesBoard({groupIndex}) : "Board"}
                    >
                        {group.cards.map((item, itemIndex) => (
                            <Card key={item}
                                  changeStyles={isDragging ? stylesCard({groupIndex, itemIndex}) : "Card"}
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
                            handleSubmit={e => handleSubmitCards(e, {group}, groupIndex)}
                            handleInput={e => handleChangeCards(e)}
                        />
                    </Board>
                ))}
                    <Input
                        errors={errorsColumns}
                        handleSubmit={handleSubmitColumns}
                        handleInput={handleChangeColumns}
                        Name={columnName}
                    />
            </div>
        </div>
    );
}

export default App;
