import React from 'react'

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
      { props.questions.length ? <></> : <h6>Choose questions for your survey.</h6>}
      { props.questions.map((val) => <h6>"{val}"</h6>)}
      <input type="text" className="form-control" placeholder="Questions" onChange={saveNewQuestionValue} />
      <button type="button" className="btn btn-primary" onClick={addNewQuestion}>Add new question</button>
    </>
  );
}

export default SurveyQuestions;