import React from "react";
import './_Card.scss'

export const Card = ({changeStyles, onDragEnd,onDragStart, onDragEnter, item}) => {
    return (
        <div
            className={changeStyles}
            draggable
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
        >
            <p className="Card__text">{item}</p>
        </div>
    );
};
