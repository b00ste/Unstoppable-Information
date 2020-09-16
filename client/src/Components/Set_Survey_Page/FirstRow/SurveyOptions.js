import React from 'react'

function SurveyOptions(props) {

    let newOptionValue;
    const saveNewOptionValue = (event) => {
      event.preventDefault();
      newOptionValue = event.target.value;
    }
    const addNewOption = (event) => {
      event.preventDefault();
      let newOptions = [...props.options];
      newOptions.push(newOptionValue);
      props.setOptions(newOptions);
    }
  
    return(
        <>
            { props.options.length ? <></> : <h6>Choose questions for your survey.</h6> }
            { props.options.map( (val) => <h6>"{val}"</h6>) }
            <input type="text" className="form-control options" placeholder="Options" onChange={saveNewOptionValue} />
            <button type="button" className="btn btn-primary" onClick={addNewOption}>Add new option</button>
        </>
    );
}

export default SurveyOptions;