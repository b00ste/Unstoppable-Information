import React from 'react'

function SurveyTitle({ storage, setStorage }) {

  const saveNewTitleValue = (event) => {
    event.preventDefault();
    setStorage({ ...storage, SurveyTitle: event.target.value });
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {storage.SurveyTitle ? <p className="card-text">Title of your survey is "{storage.SurveyTitle}".</p> : <h4 className="card-title">Set a title.</h4>}
          <input type="text" className="form-control" placeholder="Title" onChange={saveNewTitleValue} />
        </div>
      </div>
    </>
  );
}

export default SurveyTitle;