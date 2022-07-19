import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ( {personsToShow} ) => {
  return (
    personsToShow.map(person =>
      <p key={person.id}> {person.name} {person.number} </p>
    )
  )
}

const App = () => {

  const [persons, setPersons] = useState([ ])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [nextId, setNextId] = useState(persons.length)
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
    setNextId(nextId + 1)

    const nameObject =
    {
      id: nextId,
      name: newName,
      number: newNumber
    }
    if (persons.find(isInPhonebook))
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow =  showAll ? persons : persons.filter(person => person.name.includes(filterText))


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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
