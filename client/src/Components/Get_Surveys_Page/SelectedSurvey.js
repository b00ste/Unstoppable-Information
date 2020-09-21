import React, { useState } from 'react';
import styled from 'styled-components';

const Survey = styled.div`
    position: fixed;
    top: 10%;
    bottom: 10%;
    left: 10%;
    right: 10%;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
        position: absolute;
        top: 0;
        right: 0;
    }
    div {
        width: 30em;
        text-align: center;
        input {
            width: 25em;
            display: inline-block;
            margin-top: 2px;
            margin-bottom: 15px;
        }
        button {
            width: 29em;
            display: inline-block;
        }
    }
`;

const SurveyMask = styled.div`
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

function SelectedSurvey(props) {
    const [answers, setAnswers] = useState({})

    const updateAnswers = (event) => {
        event.preventDefault();
        setAnswers({ ...answers, [event.target.name]: event.target.value });
    }

    const sendAnswer = async (event) => {
        event.preventDefault();
        let answer = props.surveyQuestions[props.selectedSurvey][0];
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log(answers);
        console.log(props.surveyQuestions[props.selectedSurvey].length);
        for (var i = 1; i < props.surveyQuestions[props.selectedSurvey].length; i++) 
            answer += '-' + props.surveyQuestions[props.selectedSurvey][i];
        await props.surveysContract.methods.answerSurvey(props.selectedSurvey, answer).send({ from: account })
        .then(res => console.log(res))
    }

    let survey;
    let surveyMask;
    if (props.showSurvey) {
        survey =
            <Survey>
                <svg
                    width="4em"
                    height="4em"
                    viewBox="0 0 16 16"
                    className="bi bi-x"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                        props.setShowSurvey(false);
                        props.setSelectedSurvey('');
                    }}
                >
                    <path
                        fillRule="evenodd"
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                </svg>
                {
                    props.surveyQuestions[props.selectedSurvey]
                        .map((val) =>
                            <>
                                <div>
                                    <h6>{val}</h6>
                                    <input type="text" className="form-control" name={val} placeholder="Your Answer" onChange={updateAnswers} />
                                </div>
                            </>
                        )
                }
                <div><button type="button" className="btn btn-primary" onClick={sendAnswer}>Submit</button></div>
            </Survey>
        surveyMask = <SurveyMask></SurveyMask>
    }

    return (
        <>
            {surveyMask}
            {survey}
        </>
    );
}

export default SelectedSurvey;