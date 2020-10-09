import React from 'react'

function Participants({ storage, setStorage, is }) {

  const saveNewMaxParticipants = (event) => {
    event.preventDefault();
    setStorage({ ...storage, maxParticipants: event.target.value })
  }

  return (
    <>
      <div className="card-default">
        {
          storage.maxParticipants
            ? <h4>
              Your {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} allows {storage.maxParticipants} people to participate.
                </h4>
            : <h4>
              Set {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} total paricipants.
                </h4>
        }
        <input type="number" className="form-control" placeholder="Participants" onChange={saveNewMaxParticipants} />
      </div>
    </>
  );
}

export default Participants;