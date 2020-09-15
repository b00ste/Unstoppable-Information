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
                title={props.title}
                addNewTitle={props.addNewTitle}
                saveNewTitleValue={props.saveNewTitleValue}
            />
        </Component>
        <Component>
            <SurveyOptions
                options={props.options}
                addNewOption={props.addNewOption}
                saveNewOptionValue={props.saveNewOptionValue}
            />
        </Component>
        <Component>
            <SurveyValue 
                value={props.value}
                maxParticipants={props.maxParticipants}
                saveNewValue={props.saveNewValue}
                saveNewMaxParticipants={props.saveNewMaxParticipants}
                addNewValueAndMaxParticipants={props.addNewValueAndMaxParticipants}
            />
        </Component>
        </>
    );
}

export default FirstRow;