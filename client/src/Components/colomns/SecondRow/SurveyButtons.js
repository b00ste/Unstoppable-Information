import React from 'react'
import styled from 'styled-components';

const Component = styled.div `
    flex: 0 0 400px;
    margin: 15px;
    border: 1px solid black;
    text-align: center;
    button {
        display: inline-block;
        margin 5px;
    }
`;

function SurveyButtons(props) {
    return(
        <Component>
            <button type="button" className="btn btn-primary" onClick={props.setNewSurvey}>Submit Survey</button>
        </Component> 
    );
}

export default SurveyButtons;