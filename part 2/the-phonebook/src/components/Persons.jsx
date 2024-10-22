import personService from "../services/persons";

const Persons = ({ persons, setPersons }) => {
  const deletePerson = (id, name) => {
    if (window.confirm("Delete " + name)) {
      personService.deletePerson(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
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

export default Persons;
