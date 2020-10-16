import useAsyncReference from './useAsyncReference.js';

export default function useStorage() {
	const [storage, setStorage] = useAsyncReference({
    userAddress: undefined,
		network: undefined,

    balance: undefined,
		connected: true,
		
    surveyContractApproved: undefined,
		pollContractApproved: undefined,
		
    windowWidth: window.innerWidth,
		showResizedNav: false,
		
    loading: false,
    searchVal: '',

    surveyTitle: undefined,
    allSurevyTitles: undefined,
    userSurveyTitles: undefined,

    pollTitle: undefined,
    allPollTitles: undefined,
    userPollTitles: undefined,

    questions: undefined,
    choices: undefined,
    votes: undefined,

    answers: undefined,
    choice: undefined,

    value: undefined,
    maxParticipants: undefined,

    showSurvey: false,
    showPoll: false,

    selectedSurvey: undefined,
    selectedPoll: undefined,

    nrOfUserSurveys: undefined,
    nrOfUserPolls: undefined
	});
	return [storage, setStorage];
}