import { useState } from "react";
import personService from "../services/persons";

import "../index.css";

const PersonForm = ({
  persons,
  setPersons,
  setNotificationInfoMessage,
  setNotificationErrorMessage,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    setNewName("");
    setNewNumber("");
    const newPerson = { name: newName, number: newNumber };

    if (persons.some((person) => person.name === newName)) {
      updatePerson(newPerson);
      return;
    }
    console.log("create: " + newPerson);
    personService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        console.log(
          "add to list: " + newPerson.name + "   " + newPerson.number
        );
        setPersons(persons.concat(newPerson));
        console.log("persons: " + persons);
        setNotificationInfoMessage("Added " + newPerson.name);
      })
      .catch((e) => {
        console.log("fail");
        setNotificationErrorMessage(e.response.data.error);
      });

    setTimeout(() => {
      setNotificationInfoMessage(null);
      setNotificationErrorMessage(null);
    }, 5000);
  };

  const updatePerson = (newPerson) => {
    const oldPerson = persons.find((person) => person.name === newName);
    if (
      window.confirm(
        newName.name +
          "is already added to phonebook, replace the old number with a new one?"
      )
    ) {
      personService
        .update(oldPerson.id, newPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === oldPerson.id ? response.data : person
            )
          );
        })
        .catch((e) => {
          console.log("fail");
          setNotificationErrorMessage(e.response.data.error);
        });
    }

    setNotificationInfoMessage("Updated " + newPerson.name);
    setTimeout(() => {
      setNotificationInfoMessage(null);
      setNotificationErrorMessage(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
