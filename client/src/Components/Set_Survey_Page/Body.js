import React from 'react';
import styled from 'styled-components';
import FirstRow from './FirstRow/FirstRow.js';
import SurveyButtons from './SecondRow/SurveyButtons.js';

const Container = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

function Body(props) {

    return(
        <>
        <Container>
            <FirstRow
                key='firstrow'
                
                title={props.title}
                setTitle={props.setTitle}

                questions={props.questions}
                setQuestions={props.setQuestions}
                
                value={props.value}
                maxParticipants={props.maxParticipants}
                setValue={props.setValue}
                setMaxParticipants={props.setMaxParticipants}
            />
        </Container>
        <Container>
            <SurveyButtons
                surveysContract={props.surveysContract}
                setNewSurvey={props.setNewSurvey}
                title={props.title}
                questions={props.questions}
                value={props.value}
                maxParticipants={props.maxParticipants}
            />
        </Container>
        </>
    );
}

export default Body;