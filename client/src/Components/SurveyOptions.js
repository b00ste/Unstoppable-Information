import React from 'react'

function SurveyOptions(props) {
    return(
        <div>
            <input type="text" className="form-control options" placeholder="Options" id="inputDefault options" onChange={props.addNewOptionValue} />
            {
                props.options.map( (val) => <p>{val}</p>)
            }
        </div>
    );
}

export default SurveyOptions;