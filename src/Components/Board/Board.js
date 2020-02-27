import React from "react";

export const Board = ({ children, onDragEnter, title, onDragStart, onDragEnd, changeStylesBoard, onDragEnterBoard}) => {
    return (
        <div className={changeStylesBoard}
             draggable
             onDragStart={onDragStart}
             onDragEnd={onDragEnd}
             onDragEnter={onDragEnterBoard}
        >
            <div className="Board__title" onDragEnter={onDragEnter}>
                <p>{title}</p>
            </div>
            {children}
        </div>
    );
};