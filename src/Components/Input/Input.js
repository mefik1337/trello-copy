import React from 'react';

const Input = ({handleSubmit, handleInput, Name, id, errors}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleInput} value={Name} name={id}/>
                <input type="submit"/>
                {errors}
            </form>

        </>
    )
};

export default Input
