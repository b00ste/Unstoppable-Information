import React from 'react'

function Participants({ storage, setStorage }) {

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
              Your poll allows {storage.maxParticipants} people to participate.
                </h4>
            : <h4>
              Set poll total paricipants.
                </h4>
        }
        <input type="number" placeholder="Participants" onChange={saveNewMaxParticipants} />
      </div>
    </>
  );
}

export default Participants;