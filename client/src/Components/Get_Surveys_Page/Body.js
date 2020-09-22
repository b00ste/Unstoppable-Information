import React, { useEffect } from 'react'
import styled from 'styled-components';
import SelectedSurvey from './SelectedSurvey';
import Surveys from './Surveys';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
`;

function Body(props) {
    const getSurveys = async () => {
        let newSurveyTitles = [];
        let newSurveyQuestions = {};
        let totalSurveys = await props.surveysContract.methods.getUintStorage('totalSurveys').call();
        for (var i = 0; i < totalSurveys; i++) {
            let name = await props.surveysContract.methods.getSurveyName(i).call();
            let questions = await props.surveysContract.methods.getChoices(name).call();
            newSurveyTitles.push(name);
            newSurveyQuestions[name] = questions.split(",");
        }
        props.setSurveyTitles(newSurveyTitles);
        props.setSurveyQuestions(newSurveyQuestions);
    }

    useEffect(() => {
        if (props.surveyTitles.length === 0)
            getSurveys();
    });

    return (
        <Container>
            {
                props.surveyTitles.map((val) =>
                    <Surveys
                        key={uuidv4()}

                        title={val}
                        question={props.surveyQuestions[val]}
                        surveysContract={props.surveysContract}
                        setSurveyTitles={props.setSurveyTitles}
                        setSurveyQuestions={props.setSurveyQuestions}
                        setShowSurvey={props.setShowSurvey}
                        setSelectedSurvey={props.setSelectedSurvey}
                    />
                )
            }
            <SelectedSurvey
                showSurvey={props.showSurvey}
                setShowSurvey={props.setShowSurvey}

                selectedSurvey={props.selectedSurvey}
                setSelectedSurvey={props.setSelectedSurvey}

                surveyQuestions={props.surveyQuestions}

                surveysContract={props.surveysContract}
                account={props.account}
            />
        </Container>
    );
}

export default Body;