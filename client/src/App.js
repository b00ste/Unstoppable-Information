import React from 'react';
import useAsyncReference from './Components/useAsyncReference.js'
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Connect from './Components/Connect.js';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import SET_SURVEY_BODY from './DAPP_Page/Set_Survey_Page/Body.js';
import GET_SURVEYS_BODY from './DAPP_Page/Get_Surveys_Page/Body.js';
import ACCOUNT_SURVEYS_BODY from './Account_Page/Account_Surveys/Body.js';
import ABOUT_US_BODY from './About_Us_Page/Body.js';

const Body = styled.div`
  margin-bottom: 10em;
`;

function App() {

  const [storage, setStorage] = useAsyncReference({
    token: undefined,
    tokenAddress: undefined,
    surveys: undefined,
    surveysAddress: undefined,
    surveyContractApproved: undefined,
    pollContractApproved: undefined,
    userAddress: undefined,
    balance: undefined,
    connected: false,
    loading: false,
    searchVal: '',
    SurveyTitle: undefined,
    allSurevyTitles: undefined,
    userSurveyTitles: undefined,
    questions: undefined,
    answers: undefined,
    value: undefined,
    maxParticipants: undefined,
    showSurvey: false,
    selectedSurvey: undefined,
    nrOfUserSurveys: undefined
  });

  return (
    <Router>
      <Header
        storage={storage}
        setStorage={setStorage}
      />
      {
        storage.connected
        ? <></>
        : <Footer />
      }
      <Switch>
        <Body>
          <Route
            exact path="/"
            render={() =>
              <>
              <h1>this is home page</h1>
              <Connect
                storage={storage}
                setStorage={setStorage}
              />
              </>
            }
          />

          <Route
            exact path="/startSurveys"
            render={(res) =>
              <>
              <SET_SURVEY_BODY
                storage={storage}
                setStorage={setStorage}
              />
              <Connect
                storage={storage}
                setStorage={setStorage}
              />
              </>
            }
          />

          <Route
            exact path="/participateSurveys"
            render={() =>
              <>
              <GET_SURVEYS_BODY
                storage={storage}
                setStorage={setStorage}
              />
              <Connect
                storage={storage}
                setStorage={setStorage}
              />
              </>
            }
          />

          <Route
            exact path="/aboutUs"
            render={() =>
              <>
              <ABOUT_US_BODY />
              <Connect
                storage={storage}
                setStorage={setStorage}
              />
              </>
            }
          />

          <Route
            exact path="/accountSurveys"
            render={() =>
              <>
              <ACCOUNT_SURVEYS_BODY
                storage={storage}
                setStorage={setStorage}
              />
              <Connect
                storage={storage}
                setStorage={setStorage}
              />
              </>
            }
          />
        </Body>
      </Switch>
      {
        storage.connected
        ? <Footer />
        : <></>
      }
    </Router>
  );
}

export default App;
