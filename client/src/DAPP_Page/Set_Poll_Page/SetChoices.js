import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Div = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .body {
    margin-bottom: 3em;
    input {
      margin-bottom: 0;
    }
  }
  .button {
    display: inline-block;
    position: absolute;
    bottom: 0;
    margin-bottom: 1em;
  }
`;

function Choices({ storage, setStorage }) {

  let newChoiceValue;
  const saveNewChoiceValue = (event) => {
    event.preventDefault();
    newChoiceValue = event.target.value;
  }
  const addNewChoice = (event) => {
    event.preventDefault();
    let newChoices = [];
    if (storage.choices !== undefined)
      newChoices = [...storage.choices];
    newChoices.push(newChoiceValue);
    setStorage({ ...storage, choices: newChoices });
  }

  return (
    <>
      <Div className="card-default">
        <div className="body">
          {
            storage.choices === undefined
              ? <h4>
                Choose poll choices.
                </h4>
              : <h4 key={uuidv4()}>{storage.choices.map((val) => (val + ', '))}</h4>
          }
          <input type="text" className="form-control" placeholder="Choices" onChange={saveNewChoiceValue} />
        </div>
        <div className="button">
          <button onClick={addNewChoice}>
            Save new choices
          </button>
        </div>
      </Div>
    </>
  );
}

export default Choices;