import React from "react";
import './_Card.scss'
export const Card = ({ children }) => {
    return (
        <div className="Card">
            {children}
        </div>
    );
};
