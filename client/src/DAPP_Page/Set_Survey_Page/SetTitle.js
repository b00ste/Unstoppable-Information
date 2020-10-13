import React from 'react'

function Title({ storage, setStorage }) {

  const saveNewTitleValue = (event) => {
    event.preventDefault();
    setStorage({ ...storage, surveyTitle: event.target.value });
  }

  return (
    <>
      <div className="card-default">
        {
          storage.surveyTitle
            ? <h4>
              Title of your survey is "{storage.surveyTitle}".
                </h4>
            : <h4>
              Set survey title.
                </h4>
        }
        <input type="text" placeholder="Title" onChange={saveNewTitleValue} />
      </div>
    </>
  );
}

export default Title;