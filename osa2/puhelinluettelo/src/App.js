import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ( {filterText, handleFiltering} ) => {
  return (
    <form>
      <>
        filter names with: 
        <input
          value={filterText}
          onChange={handleFiltering}
        />
      </>
    </form>
  )
}


const PersonForm = ( { addName, newName, handleNameChange, newNumber, handleNumberChange} ) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: 
        <input
          value={newName}
          onChange={handleNameChange}
        />
        number: 
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ( {personsToShow, deletePerson} ) => {
  return (
    personsToShow.map(person =>
      <p key={person.id}> {person.name} {person.number} <button onClick={() => deletePerson(person.id)}> delete </button> </p>
    )
  )
}

const App = () => {

  const [persons, setPersons] = useState([ ])

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newNumber, setNewNumber] = useState('')
  const isInPhonebook = (person) => {
    return person.name === newName
  }
  const [newName, setNewName] = useState('')
  const [filterText, setFilterText] = useState('')
  const showAll = false


  const handleFiltering = (event) => {
    if (event.target.value.lenght > 0)
    {
      showAll = true
    }
    setFilterText(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const nameObject =
    {
      name: newName,
      number: newNumber
    }
    if (persons.find(isInPhonebook))
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      personService
        .create(nameObject)
          .then(returnedName => {
          setPersons(persons.concat(returnedName))
    })
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow =  showAll ? persons : persons.filter(person => person.name.includes(filterText))

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm('Delete ' + person.name +'?'))
    {
      personService
        .remove(id)
        .then(setPersons(persons.filter(n => n.id !== id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filterText={filterText}
        handleFiltering={handleFiltering}
      />
      <h2>Add a name</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Phone Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
