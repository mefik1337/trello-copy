import React from 'react';
import './_Input.scss';

const Input = ({handleSubmit, handleInput, Name, id, errors}) => {
    return (
        <>
            <form onSubmit={handleSubmit}
                  className="Form"
            >
                <input className={errors ? "Errors__input Input" : "Input"} type="text" onChange={handleInput}
                       value={Name} name={id}/>
                <input className={errors ? "Errors__submit Submit" : "Submit"} type="submit" value="+"/>
                {errors ? <span className="Errors__text"> {errors} </span> : null}
            </form>

        </>
    )
};

export default Input
