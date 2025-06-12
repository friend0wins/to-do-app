"use client"

import { useState } from "react"

export default function toDoApp() {
  const [list, setList] = useState([])
  const [input, setInput] = useState("")
  const [show, setShow] = useState("all")

  function addTask() {
    if (input === "") 
      return
        const newItem = {
          id: Date.now(),
          name: input,
          done: false,
        }

    setList([...list, newItem])
    setInput("")
  }

  function changeDone(itemId) {
    const newList = list.map(function (item) {
      if (item.id === itemId) {
        return {
          id: item.id,
          name: item.name,
          done: !item.done,
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
      return item.done === false
    })
  }
  if (show === "done") {
    showTasks = list.filter(function (item) {
      return item.done === true
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
        placeholder="Введите задачу"
      />
      <button onClick={addTask}>Добавить</button>

      <div>
        <button onClick={function () { setShow("all") }}>Все</button>
        <button onClick={function () { setShow("active") }}>Активные</button>
        <button onClick={function () { setShow("done") }}>Выполненные</button>
      </div>

      <ul>
        {showTasks.map(function (item) {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={function () {
                  changeDone(item.id)
                }}
              />
              {item.name}
              <button onClick={function () {
                deleteTask(item.id)
              }}>Удалить</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}