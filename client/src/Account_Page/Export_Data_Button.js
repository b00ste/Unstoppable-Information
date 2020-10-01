import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
	margin: 0 1em;
`;

/*const downloadCSV = (data) => {
	const blob = new Blob([data], { type: 'text/csv' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.setAttribute('hidden', '');
	a.setAttribute('href', url);
	a.setAttribute('downoad', 'download.csv')
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}*/

function ExportData(props) {

	const exportJSON = () => {
		const data = [];
		props.surveyAnswers.map(aVal => {
			let newData = {};
			props.surveyQuestions.split(',').map((val, i) => {
				newData[val] = aVal.split(',')[i];
				return 0;
			});
			data.push(newData);
			return 0;
		});

		const json = JSON.stringify(data);

		const blob = new Blob([json], { type: 'data/json' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('hidden', '');
		a.setAttribute('href', url);
		a.setAttribute('download', `${props.selectedSurvey}.json`)
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	const exportCSV = () => {
		const csvRows = [];
		csvRows.push(props.surveyQuestions);

		for (let i = 0; i < props.surveyAnswers.length; i++) {
			csvRows.push(props.surveyAnswers[i]);
		}

		const data = csvRows.join('\n');

		const blob = new Blob([data], { type: 'data/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('hidden', '');
		a.setAttribute('href', url);
		a.setAttribute('download', `${props.selectedSurvey}.csv`)
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	return (
		<>
			<Button type="button" className="btn btn-success" onClick={exportJSON}>Export JSON</Button>
			<Button type="button" className="btn btn-success" onClick={exportCSV}>Export CSV</Button>
		</>
	);
}

export default ExportData;