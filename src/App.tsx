import { useState, useEffect } from 'react'
import Todos from './components/Todos'
import {
  type TodoTitle,
  type FilterValues,
  type TodoId,
  type Todo as TodoType
} from './types'
import { TODO_FILTERS } from './consts'
import Footer from './components/Footer'
import Header from './components/Header'

const mockTodos = [
  {
    id: '1',
    title: 'Watch the movie',
    completed: false
  },
  {
    id: '2',
    title: 'Complete the university homework',
    completed: false
  },
  {
    id: '3',
    title: 'Learn TypeScript',
    completed: true
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValues>(
    TODO_FILTERS.ALL
  )

  useEffect(() => {
    if (todos !== mockTodos) {
      localStorage.setItem('Todos', JSON.stringify(todos))
    }
  }, [todos])

  useEffect(() => {
    if (localStorage.getItem('Todos') !== null) {
      setTodos(JSON.parse(localStorage.getItem('Todos') as string))
    } else {
      setTodos(mockTodos)
    }
  }, [])

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({
    id,
    completed
  }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValues): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemoveCompletedTodos = (): void => {
    const removeCompletedTodos = todos.filter((todo) => !todo.completed)
    setTodos(removeCompletedTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onRemoveTodo={handleRemove}
        onCompletedTodo={handleCompleted}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveCompletedTodos}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
