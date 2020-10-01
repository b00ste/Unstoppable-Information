import React from 'react'

function SurveyTitle(props) {

  const saveNewTitleValue = (event) => {
    event.preventDefault();
    let newTitleValue;
    newTitleValue = event.target.value;
    props.setTitle(newTitleValue);
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {props.title ? <p className="card-text">Title of your survey is "{props.title}".</p> : <h4 className="card-title">Set a title.</h4>}
          <input type="text" className="form-control" placeholder="Title" onChange={saveNewTitleValue} />
        </div>
      </div>
    </>
  );
}

export default SurveyTitle;