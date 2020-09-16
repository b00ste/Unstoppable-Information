import React from 'react'

function SurveyValue(props) {

    let newValue;
    let newMaxParticipants;
    const saveNewValue = (event) => {
      event.preventDefault();
      newValue = event.target.value;
    }
    const saveNewMaxParticipants = (event) => {
      event.preventDefault();
      newMaxParticipants = event.target.value;
    }
    const addNewValueAndMaxParticipants = (event) => {
      event.preventDefault();
      props.setValue(newValue);
      props.setMaxParticipants(newMaxParticipants);
    }

    return (
        <>
            { props.value ? <h6>Each participant will recieve {props.value/props.maxParticipants} ETH.</h6> : <></> }
            { props.maxParticipants ? <h6>You allow {props.maxParticipants} participants to submit a response.</h6> : <></> }
            <input type="text" className="form-control" placeholder="Value" onChange={saveNewValue} />
            <input type="text" className="form-control" placeholder="Maximum Participants" onChange={saveNewMaxParticipants} />
            <button type="button" className="btn btn-primary" onClick={addNewValueAndMaxParticipants}>Add value and maximum participants</button>
        </>
    );
}

export default SurveyValue;