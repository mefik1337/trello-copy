import React from "react";

export const Board = ({ children, }) => {
    return (
        <div className="Board" draggable>
            {children}
        </div>
    );
};