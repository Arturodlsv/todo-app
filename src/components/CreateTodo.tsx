import React, { useState } from 'react'
import { type TodoTitle } from '../types'

interface Props {
  onSaveTodo: ({ title }: TodoTitle) => void
}
const CreateTodo: React.FC<Props> = ({ onSaveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onSaveTodo({ title: inputValue })
    setInputValue('')
  }
  return (
    <form onSubmit={handleSubmit}>
        <input className='new-todo'
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
        }}
        placeholder='¿Qué quieres hacer?'
        autoFocus />
    </form>
  )
}

export default CreateTodo
