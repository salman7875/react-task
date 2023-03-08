import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [enteredTask, setEnteredTask] = useState('')
  const [enteredDay, setEnteredDay] = useState('')
  const [enteredReminder, setEnteredReminder] = useState('')

  const [tasks, setTasks] = useState([])
  const [fetched, setFetched] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        'https://prac-9222b-default-rtdb.firebaseio.com/task.json'
      )
      const data = await res.json()

      let dataMod = []
      for (const key in data) {
        dataMod.push(data[key])
      }
      setFetched(dataMod)
    }
    fetchTasks()
  }, [fetched])

  const addTaskHandler = () => {
    setTasks({ task: enteredTask, day: enteredDay, reminder: enteredReminder })

    setEnteredTask('')
    setEnteredDay('')
  }

  const submitHandler = async e => {
    e.preventDefault()
    console.log(tasks)

    const res = await fetch(
      'https://prac-9222b-default-rtdb.firebaseio.com/task.json',
      {
        method: 'POST',
        body: JSON.stringify(tasks),
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (res.ok) {
      console.log('Successfull')
    } else {
      console.log('Error in sending data to DB!z')
    }
  }

  // DELETE
  const deletHandler = async task => {
    await fetch('https://prac-9222b-default-rtdb.firebaseio.com/task.json', {
      method: 'DELETE'
    })
  }

  return (
    <div className='container'>
      <form onSubmit={submitHandler} className='form'>
        <div className='form-input'>
          <label>Task</label>
          <input
            type='text'
            value={enteredTask}
            onChange={e => setEnteredTask(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label>Day</label>
          <input
            type='text'
            value={enteredDay}
            onChange={e => setEnteredDay(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label>Reminder</label>
          <select onChange={e => setEnteredReminder(e.target.value)}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className='form-action'>
          <button onClick={addTaskHandler}>Submit</button>
        </div>
      </form>

      <div className='tasks'>
        <ul className='lists'>
          {fetched.map(task => (
            <li key={task.task} className='list'>
              <div>{task.task}</div>
              <div>{task.day}</div>
              <div>{task.reminder}</div>
              <button onClick={deletHandler}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
