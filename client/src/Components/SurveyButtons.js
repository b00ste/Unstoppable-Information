import React from 'react'

function SurveyButtons(props) {
    return(
        <div>
            <button type="button" className="btn btn-primary">Submit Survey</button>
            <button type="button" className="btn btn-primary" onClick={props.addNewOption}>Add new option</button>
        </div> 
    );
}

export default SurveyButtons;