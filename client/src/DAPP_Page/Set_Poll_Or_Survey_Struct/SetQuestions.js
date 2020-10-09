import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Questions({ storage, setStorage, is }) {

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
    setStorage({ ...storage, questions: newQuestions })
  }

  return (
    <>
      <div className="card-default">
        {
          storage.questions === undefined
            ? <h4>
              Choose {is === "survey" ? "questions" : is === "poll" ? "choices" : ""}.
                </h4>
            : <h4 key={uuidv4()}>{storage.questions.map((val) => (val+', '))}</h4>
        }
        <input type="text" className="form-control" placeholder="Questions" onChange={saveNewQuestionValue} />
        <button type="button" className="btn btn-secondary" onClick={addNewQuestion}>
          Save new {is === "survey" ? "questions" : is === "poll" ? "choices" : ""}
        </button>
      </div>
    </>
  );
}

export default Questions;