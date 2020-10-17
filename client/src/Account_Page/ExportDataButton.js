import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
	margin: 0 1em;
`;

function ExportData({ answers, questions, selectedSurvey }) {

	const exportJSON = () => {
		const data = [];
		answers.map(aVal => {
			let newData = {};
			questions.split(',').map((val, i) => {
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
		a.setAttribute('download', `${selectedSurvey}.json`)
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	const exportCSV = () => {
		const csvRows = [];
		csvRows.push(questions);

		for (let i = 0; i < answers.length; i++) {
			csvRows.push(answers[i]);
		}

		const data = csvRows.join('\n');

		const blob = new Blob([data], { type: 'data/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('hidden', '');
		a.setAttribute('href', url);
		a.setAttribute('download', `${selectedSurvey}.csv`)
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	return (
		<>
			<Button type="button" onClick={exportJSON}>Export JSON</Button>
			<Button type="button" onClick={exportCSV}>Export CSV</Button>
		</>
	);
}

export default ExportData;