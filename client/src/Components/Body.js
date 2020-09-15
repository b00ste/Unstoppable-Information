import React from 'react';
import styled from 'styled-components';
import 'bootswatch/dist/lux/bootstrap.min.css';
import SurveyTitle from './SurveyTitle.js';
import SurveyOptions from './SurveyOptions.js';
import SurveyButtons from './SurveyButtons.js';

const Container = styled.div `
    background-color: blue;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    div {
        min-height: 300px;
        flex: 1 0 0px;
        margin: 15px;
        border: 1px solid black;
        text-align: center;
        input {
            display: inline-block;
            margin 5px;
            width: 300px;
        }
        button {
            display: inline-block;
            margin 5px;
        }
    }
`

function Body(props) {

    return(
        <Container>
            <SurveyTitle />
            <SurveyOptions addNewOptionValue={props.addNewOptionValue} options={props.options} />
            <SurveyButtons addNewOption={props.addNewOption} />
        </Container>
    );
}

export default Body;