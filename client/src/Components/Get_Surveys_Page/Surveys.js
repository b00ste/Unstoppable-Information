import React, { useEffect } from 'react';
import styled from 'styled-components';

const Survey = styled.div`
width: 400px;
word-wrap: break-word;
margin: 15px;
border: 1px solid black;
text-align: center;
h6 {
margin: 15px;
disply: inline;
}
button {
display: inline-block;
margin 5px;
width: 300px;
}
`;

function Surveys(props) {

    const getSurveyNames = async () => {
        let newSurveyTitles = [];
        let newSurveyQuestions = {};
        let totalSurveys = await props.surveysContract.methods.getUintStorage('totalSurveys').call();
        for (var i = 0; i < totalSurveys; i++) {
            let name = await props.surveysContract.methods.getSurveyName(i).call();
            let questions = await props.surveysContract.methods.getChoices(name).call();
            newSurveyTitles.push(name);
            newSurveyQuestions[name] = questions.split("-");
        }
        props.setSurveyTitles(newSurveyTitles);
        props.setSurveyQuestions(newSurveyQuestions);
    }

    const enumQuestions = (title) => {
        if (props.surveyQuestions[title] !== undefined) {
            return (props.surveyQuestions[title].map((q) => <h6>{q}</h6>));
        }

    }

    useEffect(() => {
        if (props.surveyTitles[0] === undefined) {
            getSurveyNames();
        }
    });

    return (
        <>
            {
                props.surveyTitles.map((val, i) =>
                    <Survey>
                        <h6>{val}</h6>
                        {enumQuestions(val)}
                        <button 
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                props.setShowSurvey(true);
                                props.setSelectedSurvey(val);
                            }}
                        >
                            Participate
                        </button>
                    </Survey>
                )
            }
        </>
    );
}

export default Surveys;