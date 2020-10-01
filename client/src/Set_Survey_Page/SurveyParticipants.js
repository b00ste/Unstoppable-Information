import React from 'react'

function SurveyParticipants(props) {

  const saveNewMaxParticipants = (event) => {
    event.preventDefault();
    props.setMaxParticipants(event.target.value);
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {
            props.maxParticipants
              ? <p className="card-text">Your survey allows {props.maxParticipants} people to participate.</p>
              : <h4 className="card-title">Set survey total paricipants.</h4>
          }
          <input type="number" className="form-control" placeholder="Participants" onChange={saveNewMaxParticipants} />
        </div>
      </div>
    </>
  );
}

export default SurveyParticipants;