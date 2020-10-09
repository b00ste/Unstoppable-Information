import React from 'react'

function Title({ storage, setStorage, is }) {

  const saveNewTitleValue = (event) => {
    event.preventDefault();
    if (is === "survey") {
      setStorage({ ...storage, surveyTitle: event.target.value });
    }
    else if (is === "poll") {
      setStorage({ ...storage, pollTitle: event.target.value });
    }
  }

  return (
    <>
      <div className="card-default">
        {
          storage.surveyTitle
            ? <h4>
              Title of your {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} is "{storage.surveyTitle}".
                </h4>
            : <h4>
              Set {is === "survey" ? "survey" : is === "poll" ? "poll" : ""} title.
                </h4>
        }
        <input type="text" className="form-control" placeholder="Title" onChange={saveNewTitleValue} />
      </div>
    </>
  );
}

export default Title;