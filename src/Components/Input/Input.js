import React from 'react';

const Input = ({handleSubmit, handleInput, Name, id}) => {
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleInput} value={Name} name={id}/>
            <input type="submit" />
        </form>
    )
};

export default Input
