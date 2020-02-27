import React from "react";

export const Board = ({ children }) => {
    return (
        <div className="Board">
            <b>List Title</b>
            {children}
        </div>
    );
};