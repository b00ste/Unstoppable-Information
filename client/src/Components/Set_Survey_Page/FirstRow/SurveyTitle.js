import React from 'react'

function SurveyTitle(props) {

    let newTitleValue;
    const saveNewTitleValue = (event) => {
      event.preventDefault();
      newTitleValue = event.target.value;
    }
    const addNewTitle = (event) => {
      event.preventDefault();
      props.setTitle(newTitleValue);
    }

    return(
        <>
            { props.title ? <h6>Title of your survey is {props.title}</h6> : <></> }
            <input type="text" className="form-control" placeholder="Title" onChange={saveNewTitleValue} />
            <button type="button" className="btn btn-primary" onClick={addNewTitle}>Add title</button>
        </>
    );
}

export default SurveyTitle;