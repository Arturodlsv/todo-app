import { type Todo as TodoTypes, type TodoId, type ListOfTodos } from '../types'
import Todo from './Todo'

export interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onCompletedTodo: ({ id, completed }: Pick<TodoTypes, 'id' | 'completed'>) => void
}

const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onCompletedTodo }) => {
  return (
    <ul className='todo-list'>
        {todos.map(todo => (
            <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
                <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                onRemoveTodo={onRemoveTodo}
                onCompletedTodo={onCompletedTodo} />
            </li>
        ))}
    </ul>
  )
}

export default Todos
