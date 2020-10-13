import React from 'react'

function Title({ storage, setStorage }) {

  const saveNewTitleValue = (event) => {
    event.preventDefault();
    setStorage({ ...storage, pollTitle: event.target.value });
  }

  return (
    <>
      <div className="card-default">
        {
          storage.pollTitle
            ? <h4>
              Title of your poll is "{storage.pollTitle}".
                </h4>
            : <h4>
              Set poll title.
                </h4>
        }
        <input type="text" placeholder="Title" onChange={saveNewTitleValue} />
      </div>
    </>
  );
}

export default Title;