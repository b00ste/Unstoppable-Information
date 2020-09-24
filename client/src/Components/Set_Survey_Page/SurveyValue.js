import React from 'react'
import styled from 'styled-components';

const Input = styled.input`
  display: inline-block;
  margin 5px;
  width: 145px;
`;

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
      <div className="card border-light mb-3">
        <div className="card-body">
          {props.value && props.maxParticipants ? <p className="card-text">Your survey has {props.value} ETH for {props.maxParticipants} participants.</p> : <h4 className="card-title">Set a value and paricipants.</h4>}
          <Input type="number" className="form-control" placeholder="Value" onChange={saveNewValue} />
          <Input type="number" className="form-control" placeholder="Participants" onChange={saveNewMaxParticipants} />
          <button type="button" className="btn btn-primary" onClick={addNewValueAndMaxParticipants}>Save value and participants</button>
        </div>
      </div>
    </>
  );
}

export default SurveyValue;