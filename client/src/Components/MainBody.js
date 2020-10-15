import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import DAPP from '../DAPP_Page/App_Page/Body.js';
import SET_SURVEY_BODY from '../DAPP_Page/Set_Survey_Page/Body.js';
import GET_SURVEYS_BODY from '../DAPP_Page/Get_Surveys_Page/Body.js';
import SET_POLL_BODY from '../DAPP_Page/Set_Poll_Page/Body.js';
import GET_POLLS_BODY from '../DAPP_Page/Get_Poll_Page/Body.js';
import ACCOUNT_SURVEYS_BODY from '../Account_Page/Account_Surveys/Body.js';
import ACCOUNT_POLLS_BODY from '../Account_Page/Account_Polls/Body.js';
import HOME_BODY from '../Home_Page/Body.js';

const Body = styled.div`
  height: 100%;
  margin: ${props => props.showResizedNav ? '16em' : '5em'} 0 5em 0;
`;

function MainBody({
	storage,
	setStorage,
	tokenContract,
	surveysAddress,
	surveysContract,
	pollAddress,
	pollContract
}) {
	const [newWindowWidth, setNewWindowWidth] = useState(window.inheritWidth);

  let resizeWindow = () => {
    setNewWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
	}, []);
	
	useEffect(() => {
		setStorage({ ...storage, windowWidth: newWindowWidth, showResizedNav: false })
	}, [newWindowWidth])

	return (
		<Switch>
			<Body showResizedNav={storage.showResizedNav}>

				<Route exact path="/">
					<HOME_BODY />
				</Route>

				<Route exact path="/App">
					<DAPP
						storage={storage}
						setStorage={setStorage}
						surveysAddress={surveysAddress}
						surveysContract={surveysContract}
						pollAddress={pollAddress}
						pollContract={pollContract}
						tokenContract={tokenContract}
					/>
				</Route>

				<Route exact path="/App/Set_Survey">
					<SET_SURVEY_BODY
						storage={storage}
						setStorage={setStorage}
						tokenContract={tokenContract}
						surveysAddress={surveysAddress}
						surveysContract={surveysContract}
					/>
				</Route>

				<Route exact path="/App/Get_Surveys">
					<GET_SURVEYS_BODY
						storage={storage}
						setStorage={setStorage}
						surveysContract={surveysContract}
					/>
				</Route>

				<Route exact path="/App/Set_Poll">
					<SET_POLL_BODY
						storage={storage}
						setStorage={setStorage}
						tokenContract={tokenContract}
						pollAddress={pollAddress}
						pollContract={pollContract}
					/>
				</Route>

				<Route exact path="/App/Get_Polls">
					<GET_POLLS_BODY
						storage={storage}
						setStorage={setStorage}
						pollContract={pollContract}
					/>
				</Route>

				<Route exact path="/accountSurveys">
					<ACCOUNT_SURVEYS_BODY
						storage={storage}
						setStorage={setStorage}
						surveysContract={surveysContract}
					/>
				</Route>

				<Route exact path="/accountPolls">
					<ACCOUNT_POLLS_BODY
						storage={storage}
						setStorage={setStorage}
						pollContract={pollContract}
					/>
				</Route>
			</Body>
		</Switch>
	)
}

export default MainBody;