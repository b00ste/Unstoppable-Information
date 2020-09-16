import React from 'react';
import styled from 'styled-components';
import 'bootswatch/dist/lux/bootstrap.min.css';
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

                options={props.options}
                setOptions={props.setOptions}
                
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
                options={props.options}
                value={props.value}
                maxParticipants={props.maxParticipants}
            />
        </Container>
        </>
    );
}

export default Body;