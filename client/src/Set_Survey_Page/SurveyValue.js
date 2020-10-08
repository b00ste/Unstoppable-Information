import React from 'react'

function SurveyValue({ storage, setStorage }) {

  const saveNewValue = (event) => {
    event.preventDefault();
    setStorage({ ...storage, value: event.target.value });
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {
            storage.value
              ? <p className="card-text">Your survey has {storage.value} SVT for distribution</p>
              : <h4 className="card-title">Set survey value.</h4>
          }
          <input type="number" className="form-control" placeholder="Value" onChange={saveNewValue} />
        </div>
      </div>
    </>
  );
}

export default SurveyValue;