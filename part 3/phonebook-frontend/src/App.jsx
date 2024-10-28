import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import NotificationInfo from "./components/NotificationInfo";
import NotificationError from "./components/NotificationError";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    console.log("effect");
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch(() => {
        console.log("fail");
      });
  }, []);

  console.log("render", persons.length, "persons");
  console.log(persons);

  const [searchText, setSearchText] = useState("");
  const [notificationInfoMessage, setNotificationInfoMessage] = useState(null);
  const [notificationErrorMessage, setNotificationErrorMessage] =
    useState(null);
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationInfo message={notificationInfoMessage} />
      <NotificationError message={notificationErrorMessage} />
      <Filter searchText={searchText} setSearchText={setSearchText} />
      <h2>add new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotificationInfoMessage={setNotificationInfoMessage}
        setNotificationErrorMessage={setNotificationErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        setNotificationErrorMessage={setNotificationErrorMessage}
      />
    </div>
  );
};

export default App;
