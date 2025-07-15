"use client"

import { useState } from "react"

export default function ToDoApp({ initialList }) {
  const [list, setList] = useState(initialList)
  const [input, setInput] = useState("")
  const [show, setShow] = useState("all")

  function addTask() {
    if (input === "") 
      return
        const newItem = {
          id: Date.now(),
          name: input,
          completed: false,
        }

    setList([newItem, ...list])
    setInput("")
  }

  function changeCompleted(itemId) {
    const newList = list.map(function (item) {
      if (item.id === itemId) {
        return {
          id: item.id,
          name: item.name,
          completed: !item.completed,
        }
      } else return item
    })
    setList(newList)
  }

  function deleteTask(itemId) {
    const newList = list.filter(function (item) {
      return item.id !== itemId
    })
    setList(newList)
  }

  let showTasks = list
  if (show === "active") {
    showTasks = list.filter(function (item) {
      return item.completed === false
    })
  }
  if (show === "completed") {
    showTasks = list.filter(function (item) {
      return item.completed === true
    })
  }

  return (
    <div>
      <h1>To-Do List</h1>

      <input
        value={input}
        onChange={function (e) {
          setInput(e.target.value)
        }}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <div>
        <button onClick={function () { setShow("all") }}>All</button>
        <button onClick={function () { setShow("active") }}>Active</button>
        <button onClick={function () { setShow("completed") }}>Completed</button>
      </div>

      <ul>
        {showTasks.map(function (item) {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={function () {
                  changeCompleted(item.id)
                }}
              />
              {item.name}
              <button onClick={function () {
                deleteTask(item.id)
              }}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}