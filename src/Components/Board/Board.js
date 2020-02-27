import React from "react";

export const Board = ({ children, onDragEnter, onDragStart ,title }) => {
    return (
        <div className="Board" draggable>
            <div className="Board__title" onDragEnter={onDragEnter}>
                <p>{title}</p>
            </div>
            {children}
        </div>
    );
};