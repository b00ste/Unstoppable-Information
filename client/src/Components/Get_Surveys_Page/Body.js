import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const Container = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    div {
        width: 400px;
        word-wrap: break-word;
        margin: 15px;
        border: 1px solid black;
        text-align: center;
    }
    h6 {
        margin: 15px;
        disply: inline;
    }
`;

function Body(props) {
    const [surveyTitles, setSurveyTitles] = useState([]);
    const [surveyQuestions, setSurveyQuestions] = useState([]);

    const getSurveyNames = async () => {
        let newSurveyTitles = [];
        let newSurveyQuestions = {};
        let totalSurveys = await props.surveysContract.methods.getUintStorage('totalSurveys').call();
        for(var i = 0; i < totalSurveys ; i ++)
        {
            let name = await props.surveysContract.methods.getSurveyName(i).call();
            let questions = await props.surveysContract.methods.getChoices(name).call();
            newSurveyTitles.push(name);
            newSurveyQuestions[name] = questions.split("-");
        }
        setSurveyTitles(newSurveyTitles);
        setSurveyQuestions(newSurveyQuestions);
    }

    const enumQuestions = (title) => {
        if(surveyQuestions[title] !== undefined) {
             return (surveyQuestions[title].map( (q) => <h6>{ q }</h6>));
        }
            
    }

    useEffect(() => {
        if(surveyTitles[0] === undefined)
        {
            getSurveyNames();
        }
    });

    return (
        <>
        <Container>
            {
                surveyTitles.map( (val, i) => 
                    <div>
                        <h6>{ val }</h6>
                        { enumQuestions(val) }
                    </div>
                )
            }
        </Container>
        </>
    );
}

export default Body;