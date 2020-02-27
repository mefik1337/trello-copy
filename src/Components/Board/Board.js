import React from "react";

export const Board = ({ title,children }) => {
    return (
        <div className="Board">
            <b>{title}</b>
            {children}
        </div>
    );
};