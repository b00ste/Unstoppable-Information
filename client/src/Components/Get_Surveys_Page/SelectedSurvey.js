import React from 'react'
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
        margin: 10px;
        border: 1px solid black;
        text-align: center;
        input {
            width: 25em;
            display: inline-block;
            margin-top: 5px;
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
                                    <input type="text" className="form-control" placeholder={val} />
                                </div>
                            </>
                        )
                }
                <div><button type="button" className="btn btn-primary">Submit</button></div>
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