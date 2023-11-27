import React from 'react'
import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onCompletedTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onCompletedTodo }) => {
  const handleInputCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onCompletedTodo({
      id,
      completed: event.target.checked
    })
  }
  return (
    <div className="view">
        <input
        className="toggle"
        checked={completed}
        type="checkbox"
        onChange={handleInputCheckboxChange}
        />
        <label> {title} </label>
        <button
        className='destroy'
        onClick={() => {
          onRemoveTodo({ id })
        }}
        />
    </div>
  )
}

export default Todo
