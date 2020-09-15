import React from 'react'

function SurveyTitle(props) {
    return(
        <>
            { props.title ? <h6>Title of your survey is {props.title}</h6> : <></> }
            <input type="text" className="form-control" placeholder="Title" id="inputDefault" onChange={props.saveNewTitleValue} />
            <button type="button" className="btn btn-primary" onClick={props.addNewTitle}>Add title</button>
        </>
    );
}

export default SurveyTitle;