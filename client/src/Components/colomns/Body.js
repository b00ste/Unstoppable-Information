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
                title={props.title}
                addNewTitle={props.addNewTitle}
                saveNewTitleValue={props.saveNewTitleValue}
                options={props.options}
                addNewOption={props.addNewOption}
                saveNewOptionValue={props.saveNewOptionValue}
                value={props.value}
                maxParticipants={props.maxParticipants}
                saveNewValue={props.saveNewValue}
                saveNewMaxParticipants={props.saveNewMaxParticipants}
                addNewValueAndMaxParticipants={props.addNewValueAndMaxParticipants}
            />
        </Container>
        <Container>
            <SurveyButtons setNewSurvey={props.setNewSurvey} />
        </Container>
        </>
    );
}

export default Body;