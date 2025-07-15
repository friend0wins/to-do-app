import ToDoApp from "./todoapp"

export default async function Page() {
  const res = await fetch("https://dummyjson.com/todos", { cache: "no-store" })
  const { todos } = await res.json()

  const initialList = todos.slice(0, 10).map(item => ({
    id: item.id,
    name: item.todo,
    completed: item.completed
  }))

  return <ToDoApp initialList={initialList} />
}