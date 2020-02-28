import React from "react";
import './_Card.scss'

export const Card = ({changeStyles, onDragStart, onDragEnter, item}) => {
    return (
        <div
            className={changeStyles}
            draggable
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
        >
            <p className="Card__text">{item}</p>
        </div>
    );
};
