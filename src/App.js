/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';

const logToServer = async (url, logEntry) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry),
    });
    if (!response.ok) {
      console.error('Failed to log entry:', response.statusText);
    }
  } catch (error) {
    console.error('Error logging entry:', error);
  }
};

// -----------------------------------------------------------------------

const App = () => {
  const [result, setResult] = useState('');

  const handleclick = (e) => {
    setResult(result.concat(e.target.name));

    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'button_click',
      target: e.target.name,
    };

    logToServer('http://localhost:5000/log', logEntry);
  };
  
  const clear = () => {
    setResult('');
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'clear'
    };

    logToServer('http://localhost:5000/log/clear', logEntry);
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'backspace'
    };

    logToServer('http://localhost:5000/log/backspace', logEntry);
  };

  const calculate = () => {
    setResult(eval(result).toString());
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'calculate',
      expression: result,
      result: eval(result).toString()
    };

    logToServer('http://localhost:5000/log/calculate', logEntry);
  };

  const handleChange = (e) => {
    setResult(e.target.value);
  };

  return (
    <>
      <div className="container">
        <form>
          <input type="text" value={result} onChange={handleChange} />
        </form>

        <div className="keypad">
          <button className="highlight" onClick={clear} id="clear">
            Clear
          </button>
          <button className="highlight" onClick={backspace} id="backspace">
            C
          </button>
          <button className="highlight" name="/" onClick={handleclick}>
            /
          </button>
          <button name="7" onClick={handleclick}>
            7
          </button>
          <button name="8" onClick={handleclick}>
            8
          </button>
          <button name="9" onClick={handleclick}>
            9
          </button>
          <button className="highlight" name="*" onClick={handleclick}>
            *
          </button>
          <button name="4" onClick={handleclick}>
            4
          </button>
          <button name="5" onClick={handleclick}>
            5
          </button>
          <button name="6" onClick={handleclick}>
            6
          </button>
          <button className="highlight" name="-" onClick={handleclick}>
            -
          </button>
          <button name="1" onClick={handleclick}>
            1
          </button>
          <button name="2" onClick={handleclick}>
            2
          </button>
          <button name="3" onClick={handleclick}>
            3
          </button>
          <button className="highlight" name="+" onClick={handleclick}>
            +
          </button>
          <button name="0" onClick={handleclick}>
            0
          </button>
          <button name="." onClick={handleclick}>
            .
          </button>
          <button className="highlight" onClick={calculate} id="result">
            =
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
