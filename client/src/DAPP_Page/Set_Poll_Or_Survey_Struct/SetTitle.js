import React from 'react'

function Title({ storage, setStorage, is }) {

  const saveNewTitleValue = (event) => {
    event.preventDefault();
    if(is === "survey"){
      setStorage({ ...storage, surveyTitle: event.target.value });
    }
    else if(is === "poll"){
      setStorage({ ...storage, pollTitle: event.target.value });
    }
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {
            storage.surveyTitle
              ? <p className="card-text">
                Title of your {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} is "{storage.surveyTitle}".
                </p>
              : <h4 className="card-title">
                Set {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} title.
                </h4>
          }
          <input type="text" className="form-control" placeholder="Title" onChange={saveNewTitleValue} />
        </div>
      </div>
    </>
  );
}

export default Title;