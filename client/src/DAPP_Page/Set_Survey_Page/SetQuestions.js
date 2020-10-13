import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Div = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .body {
    margin-bottom: 3em;
    input {
      margin-bottom: 0;
    }
  }
  .button {
    display: inline-block;
    position: absolute;
    bottom: 0;
    margin-bottom: 1em;
  }
`;

function Questions({ storage, setStorage }) {

  let newQuestionValue;
  const saveNewQuestionValue = (event) => {
    event.preventDefault();
    newQuestionValue = event.target.value;
  }
  const addNewQuestion = (event) => {
    event.preventDefault();
    let newQuestions = [];
    if (storage.questions !== undefined)
      newQuestions = [...storage.questions];
    newQuestions.push(newQuestionValue);
    setStorage({ ...storage, questions: newQuestions });
  }

  return (
    <>
      <Div className="card-default">
        <div className="body">
          {
            storage.questions === undefined
              ? <h4>
                Choose questions.
                </h4>
              : <h4 key={uuidv4()}>{storage.questions.map((val) => (val + ', '))}</h4>
          }
          <input type="text" placeholder="Questions" onChange={saveNewQuestionValue} />
        </div>
        <div className="button">
          <button onClick={addNewQuestion}>
            Save new questions
          </button>
        </div>
      </Div>
    </>
  );
}

export default Questions;