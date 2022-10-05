import "./styles.css";
import { useState } from "react";

function App() {
  const [bill, setBill] = useState(null);
  const [cash, setCash] = useState(null);
  const [denominations, setDenominations] = useState(null);
  const [message, setMessage] = useState("");
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [five, setFive] = useState(0);
  const [ten, setTen] = useState(0);
  const [twenty, setTwenty] = useState(0);
  const [fifty, setFifty] = useState(0);
  const [hundred, setHundred] = useState(0);
  const [twoHundred, setTwoHundred] = useState(0);
  const [fiveHundred, setFiveHundred] = useState(0);
  const [twoThousand, setTwoThousand] = useState(0);

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
    if (bill === cash) {
      changeToBeReturned = "Cash given is equal to bill amount";
      setMessage(changeToBeReturned);
    } else if (bill > cash) {
      changeToBeReturned = "Amount tendered is less than the bill amount!";
      setMessage(changeToBeReturned);
    } else {
      changeToBeReturned = `Remaining amount to be paid ${cash - bill}`;
      setMessage(changeToBeReturned);
      let denominationsToBeReturned = returnAmountHandler(bill, cash);
      setDenominations(denominationsToBeReturned);
      setOne(denominations[1]);
      setTwo(denominations[2]);
      setFive(denominations[5]);
      setTen(denominations[10]);
      setTwenty(denominations[20]);
      setFifty(denominations[50]);
      setHundred(denominations[100]);
      setTwoHundred(denominations[200]);
      setFiveHundred(denominations[500]);
      setTwoThousand(denominations[2000]);
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
      <input
        type="textbox"
        label="Bill Amount:"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
      <input
        type="textbox"
        label="Cash Given:"
        value={cash}
        onChange={(e) => setCash(e.target.value)}
      />
      <button label="Check" onClick={() => clickHandler()}>
        Check
      </button>
      <p>{message}</p>
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
          <td>{one}</td>
          <td>{two}</td>
          <td>{five}</td>
          <td>{ten}</td>
          <td>{twenty}</td>
          <td>{fifty}</td>
          <td>{hundred}</td>
          <td>{twoHundred}</td>
          <td>{fiveHundred}</td>
          <td>{twoThousand}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
