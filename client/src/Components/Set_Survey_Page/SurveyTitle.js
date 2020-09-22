import React from 'react'
import styled from 'styled-components';

const Input =styled.input`
  display: inline-block;
  margin 5px;
  width: 300px;
`;

function SurveyTitle(props) {

  let newTitleValue;
  const saveNewTitleValue = (event) => {
    event.preventDefault();
    newTitleValue = event.target.value;
    event.target.value = '';
  }
  const addNewTitle = (event) => {
    event.preventDefault();
    props.setTitle(newTitleValue);
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {props.title ? <p className="card-text">Title of your survey is "{props.title}".</p> : <h4 className="card-title">Set a title.</h4>}
          <Input type="text" className="form-control" placeholder="Title" onChange={saveNewTitleValue} />
          <button type="button" className="btn btn-primary" onClick={addNewTitle}>Save title</button>
        </div>
      </div>
    </>
  );
}

export default SurveyTitle;