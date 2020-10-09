import React from 'react'

function Value({ storage, setStorage, is }) {

  const saveNewValue = (event) => {
    event.preventDefault();
    setStorage({ ...storage, value: event.target.value });
  }

  return (
    <>
      <div className="card-default">
        {
          storage.value
            ? <h4>Your {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} has {storage.value} SVT for distribution</h4>
            : <h4>Set {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} value.</h4>
        }
        <input type="number" className="form-control" placeholder="Value" onChange={saveNewValue} />
      </div>
    </>
  );
}

export default Value;