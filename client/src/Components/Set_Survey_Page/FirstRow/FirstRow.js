import React from 'react'
import SurveyQuestions from './SurveyQuestions.js'
import SurveyTitle from './SurveyTitle.js'
import SurveyValue from './SurveyValue.js'
import styled from 'styled-components';

const Component = styled.div `
    width: 400px;
    word-wrap: break-word;
    margin: 15px;
    border: 1px solid black;
    text-align: center;
    input {
        display: inline-block;
        margin 5px;
        width: 300px;
    }
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

function FirstRow(props) {
    return (
        <>
        <Component>
            <SurveyTitle
                key='surveytitle'

                title={props.title}
                setTitle={props.setTitle}
            />
        </Component>
        <Component>
            <SurveyQuestions
                key='surveyoptions'

                questions={props.questions}
                setQuestions={props.setQuestions}
            />
        </Component>
        <Component>
            <SurveyValue 
                key='surveyvalue'

                value={props.value}
                maxParticipants={props.maxParticipants}
                setValue={props.setValue}
                setMaxParticipants={props.setMaxParticipants}
            />
        </Component>
        </>
    );
}

export default FirstRow;