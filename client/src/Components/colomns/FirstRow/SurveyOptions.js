import React from 'react'

function SurveyOptions(props) {
    return(
        <>
            { props.options.map( (val) => <h6>{val}</h6>) }
            <input type="text" className="form-control options" placeholder="Options" id="inputDefault" onChange={props.saveNewOptionValue} />
            <button type="button" className="btn btn-primary" onClick={props.addNewOption}>Add new option</button>
        </>
    );
}

export default SurveyOptions;