import React from 'react'
import SurveyOptions from './SurveyOptions.js'
import SurveyTitle from './SurveyTitle.js'
import SurveyValue from './SurveyValue.js'
import styled from 'styled-components';

const Component = styled.div `
    flex: 0 0 400px;
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
            <SurveyOptions
                key='surveyoptions'

                options={props.options}
                setOptions={props.setOptions}
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