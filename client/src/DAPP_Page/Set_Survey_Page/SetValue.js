import React from 'react'

function Value({ storage, setStorage }) {

  const saveNewValue = (event) => {
    event.preventDefault();
    setStorage({ ...storage, value: event.target.value });
  }

  return (
    <>
      <div className="card-default">
        {
          storage.value
            ? <h4>Your survey has {storage.value} UFO up for distribution</h4>
            : <h4>Set survey value.</h4>
        }
        <input type="number" placeholder="Value" onChange={saveNewValue} />
      </div>
    </>
  );
}

export default Value;