import React from 'react'

function ExportData(props) {

	const exportData = () => {
		let data = [];
		props.surveyAnswers.map( aVal => {
			let newData = {};
			props.surveyQuestions.split(',').map((val, i) => {
				newData[val] = aVal.split(',')[i];
				return 0;
			});
			data.push(newData);
			return 0;
		});
		console.log(data);
		return data;
	}

	return (
		<>
			<button type="button" className="btn btn-success" onClick={exportData}>Export Data</button>
		</>
	);
}

export default ExportData;