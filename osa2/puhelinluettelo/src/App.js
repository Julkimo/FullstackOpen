import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

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
      <p className='name' key={person.id}> {person.name} {person.number} <button onClick={() => deletePerson(person.id)}> delete </button> </p>
    )
  )
}

const App = () => {

  const [persons, setPersons] = useState([ ])
  const [notification, setNotification] = useState(null)
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
      setNotification(
        `'${nameObject.name}' is already in the phonebook`
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
    else
    {
      personService
        .create(nameObject)
          .then(returnedName => {
            setPersons(persons.concat(returnedName))

        setNotification(
          `'${nameObject.name}' was added`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
        .catch(error => {
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
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

        setNotification(
          `'${person.name}' was deleted`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
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
      <Notification message={notification} />
    </div>
  )
}

export default App
