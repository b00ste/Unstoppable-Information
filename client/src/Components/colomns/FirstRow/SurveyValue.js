import React from 'react'

function SurveyValue(props) {
    return (
        <>
            { props.value ? <h6>Each participant will recieve {props.value/props.maxParticipants} ETH.</h6> : <></> }
            { props.maxParticipants ? <h6>You allow {props.maxParticipants} participants to submit a response.</h6> : <></> }
            <input type="text" className="form-control" placeholder="Value" id="inputDefault" onChange={props.saveNewValue} />
            <input type="text" className="form-control" placeholder="Maximum Participants" id="inputDefault" onChange={props.saveNewMaxParticipants} />
            <button type="button" className="btn btn-primary" onClick={props.addNewValueAndMaxParticipants}>Add value and maximum participants</button>
        </>
    );
}

export default SurveyValue;