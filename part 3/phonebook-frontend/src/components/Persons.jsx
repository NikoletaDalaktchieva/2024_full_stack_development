import personService from "../services/persons";
import PropTypes from 'prop-types';

const Persons = ({ persons, setPersons, setNotificationErrorMessage }) => {
  const deletePerson = (id, name) => {
    if (window.confirm("Delete " + name)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          console.log("fail");
          setNotificationErrorMessage(
            "Information of " + name + " has already been remved from server"
          );

          setTimeout(() => {
            setNotificationErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <ul>
      {persons.map((person) => (
        <li key={String(person.id)}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

Persons.propTypes = {
  persons: PropTypes.array.isRequired, 
  setPersons: PropTypes.func.isRequired,
  setNotificationErrorMessage: PropTypes.func.isRequired,
};

export default Persons;
