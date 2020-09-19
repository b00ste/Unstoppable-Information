import React, { useState } from 'react'
import styled from 'styled-components';
import SelectedSurvey from './SelectedSurvey';
import Surveys from './Surveys';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

function Body(props) {
    const [surveyTitles, setSurveyTitles] = useState([]);
    const [surveyQuestions, setSurveyQuestions] = useState({});
    const [showSurvey, setShowSurvey] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState('')

    return (
        <Container>
            <Surveys
                surveyTitles={surveyTitles}
                setSurveyTitles={setSurveyTitles}

                surveyQuestions={surveyQuestions}
                setSurveyQuestions={setSurveyQuestions}

                setShowSurvey={setShowSurvey}
                setSelectedSurvey={setSelectedSurvey}

                surveysContract={props.surveysContract}
            />
            <SelectedSurvey
                showSurvey={showSurvey}
                setShowSurvey={setShowSurvey}

                selectedSurvey={selectedSurvey}
                setSelectedSurvey={setSelectedSurvey}

                surveyQuestions={surveyQuestions}
            />
        </Container>
    );
}

export default Body;