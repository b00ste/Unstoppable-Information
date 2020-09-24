import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Input =styled.input`
  display: inline-block;
  margin 5px;
  width: 300px;
`;

function SurveyQuestions(props) {

  let newQuestionValue;
  const saveNewQuestionValue = (event) => {
    event.preventDefault();
    newQuestionValue = event.target.value;
  }
  const addNewQuestion = (event) => {
    event.preventDefault();
    let newQuestions = [...props.questions];
    newQuestions.push(newQuestionValue);
    props.setQuestions(newQuestions);
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-body">
          {props.questions.length ? <></> : <h4 className="card-title">Choose questions.</h4>}
          {props.questions.map((val) => <p key={uuidv4()} className="card-text">"{val}"</p>)}
          <Input type="text" className="form-control" placeholder="Questions" onChange={saveNewQuestionValue} />
          <button type="button" className="btn btn-primary" onClick={addNewQuestion}>Save new question</button>
        </div>
      </div>
    </>
  );
}

export default SurveyQuestions;