import "./styles.css";
import React from "react";
import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [cash, setCash] = useState(0);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    2000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0
  });

  let changeToBeReturned = "";

  const notesDict = {
    2000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0
  };

  const clickHandler = () => {
    if (bill === 0 && cash === 0) {
      changeToBeReturned = "Nothing to pay!";
      setMessage(changeToBeReturned);
    } else if (bill === cash) {
      changeToBeReturned = "Cash given is equal to bill amount";
      setMessage(changeToBeReturned);
    } else if (parseInt(bill) < 0 || parseInt(cash) < 0) {
      changeToBeReturned = "Amount cannot be negative!";
      setMessage(changeToBeReturned);
      setValues({
        2000: 0,
        500: 0,
        200: 0,
        100: 0,
        50: 0,
        20: 0,
        10: 0,
        5: 0,
        2: 0,
        1: 0
      });
    } else if (parseInt(bill) > parseInt(cash)) {
      changeToBeReturned = "Amount tendered is less than the bill amount!";
      setMessage(changeToBeReturned);
      setValues({
        2000: 0,
        500: 0,
        200: 0,
        100: 0,
        50: 0,
        20: 0,
        10: 0,
        5: 0,
        2: 0,
        1: 0
      });
    } else {
      changeToBeReturned = `Remaining amount to be returned ${cash - bill}`;

      let denominationsToBeReturned = returnAmountHandler(bill, cash);
      console.log(denominationsToBeReturned);
      setMessage(() => changeToBeReturned);

      setValues({
        2000: denominationsToBeReturned[2000],
        500: denominationsToBeReturned[500],
        200: denominationsToBeReturned[200],
        100: denominationsToBeReturned[100],
        50: denominationsToBeReturned[50],
        20: denominationsToBeReturned[20],
        10: denominationsToBeReturned[10],
        5: denominationsToBeReturned[5],
        2: denominationsToBeReturned[2],
        1: denominationsToBeReturned[1]
      });
    }
  };

  const returnAmountHandler = (bill, cash) => {
    let returnAmount = cash - bill;
    let notes = Object.keys(notesDict).reverse();
    notes.forEach((note) => {
      let numberOfNotes = Math.floor(returnAmount / parseInt(note));
      returnAmount = returnAmount - numberOfNotes * parseInt(note);
      notesDict[parseInt(note)] = numberOfNotes;
      if (returnAmount == 0) {
        return;
      }
    });
    return notesDict;
  };

  return (
    <div className="App">
      <header>Cash Register</header>
      <div className="container">
        <label>Bill Amount</label>
        <input
          type="number"
          label="Bill Amount:"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
        <label>Cash Given</label>
        <input
          type="number"
          label="Cash Given:"
          value={cash}
          onChange={(e) => setCash(e.target.value)}
        />
        <button label="Check" onClick={() => clickHandler()}>
          Check
        </button>

        <h3>{message}</h3>
        <table>
          <tr>
            <th>Notes</th>
            <th>1</th>
            <th>2</th>
            <th>5</th>
            <th>10</th>
            <th>20</th>
            <th>50</th>
            <th>100</th>
            <th>200</th>
            <th>500</th>
            <th>2000</th>
          </tr>
          <tr>
            <td>Number of Notes</td>
            <td>{bill !== cash ? values[1] : 0}</td>
            <td>{bill !== cash ? values[2] : 0}</td>
            <td>{bill !== cash ? values[5] : 0}</td>
            <td>{bill !== cash ? values[10] : 0}</td>
            <td>{bill !== cash ? values[20] : 0}</td>
            <td>{bill !== cash ? values[50] : 0}</td>
            <td>{bill !== cash ? values[100] : 0}</td>
            <td>{bill !== cash ? values[200] : 0}</td>
            <td>{bill !== cash ? values[500] : 0}</td>
            <td>{bill !== cash ? values[2000] : 0}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
