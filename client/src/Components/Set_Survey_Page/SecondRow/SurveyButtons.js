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

    const setNewSurvey = async (event) => {
      event.preventDefault();
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      let questions = props.questions[0];
      for(var i = 1; i < props.questions.length; i ++)
        questions += '-' + props.questions[i];
      const result = await props.surveysContract.methods.setSurvey(props.title, questions, props.maxParticipants, props.value).send({ from: account });
      console.log(result);
    }
    
    return(
        <Component>
            <button type="button" className="btn btn-primary" onClick={setNewSurvey}>Submit Survey</button>
        </Component> 
    );
}

export default SurveyButtons;