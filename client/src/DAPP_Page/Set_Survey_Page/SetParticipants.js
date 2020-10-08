import React from 'react'

function SurveyParticipants({ storage, setStorage }) {

  const saveNewMaxParticipants = (event) => {
    event.preventDefault();
    setStorage({ ...storage, maxParticipants: event.target.value })
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {
            storage.maxParticipants
              ? <p className="card-text">Your survey allows {storage.maxParticipants} people to participate.</p>
              : <h4 className="card-title">Set survey total paricipants.</h4>
          }
          <input type="number" className="form-control" placeholder="Participants" onChange={saveNewMaxParticipants} />
        </div>
      </div>
    </>
  );
}

export default SurveyParticipants;