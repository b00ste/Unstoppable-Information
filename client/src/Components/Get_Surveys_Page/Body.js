import React, { useState, useEffect } from 'react'

function Body(props) {
    const [surveyTitles, setSurveyTitles] = useState([])

    let get = async () => {
        let surveyNames = [];
        let defined = true;
        for(var i = 0; defined; i ++)
        {
            let name = await props.surveysContract.methods.getSurveyName(i).call();
            console.log(name);
            if(name)
                surveyNames.push(name);
            else
                defined = false;
        }
        console.log(surveyNames);
        setSurveyTitles(surveyNames);
    }

    useEffect(() => {
        get();
    });

    return (
        <>
            {
                surveyTitles.map( (val) => <h6>{val}</h6>)
            }
        </>
    );
}

export default Body;