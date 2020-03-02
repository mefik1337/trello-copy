import React from 'react';

const Input = ({handleSubmit, handleInput, Name}) => {
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleInput} value={Name} name={Name}/>
            <input type="submit" />
        </form>
    )
};

export default Input
