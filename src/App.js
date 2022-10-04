import "./styles.css";
import { useState } from "react";

function App() {
  const [bill, setBill] = useState(null);
  const [cash, setCash] = useState(null);
  const [message, setMessage] = useState("");

  let changeToBeReturned = "";

  const notesDict = {
    2000: 0,
    500: 0,
    100: 0,
    20: 0,
    10: 0,
    5: 0,
    1: 0
  };

  const clickHandler = () => {
    if (bill === cash) {
      changeToBeReturned = "Cash given is equal to bill amount";
      setMessage(changeToBeReturned);
    } else if (bill > cash) {
      changeToBeReturned = `Remaining amount to be paid = ${bill - cash}`;
      setMessage(changeToBeReturned);
    } else {
      returnAmountHandler(bill, cash);
    }
    console.log(changeToBeReturned, bill, cash, message);
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
    </div>
  );
}

export default App;
