import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, selectedTodoToEdit, selectedTodoToEditId } from '../features/todo/todoSlice'

function Todos() {

    const todos = useSelector(state => state.todos) //"📁"
    const dispatch = useDispatch()

    const handleEdit = ( text, id ) => {
        dispatch(selectedTodoToEdit(text))
        dispatch(selectedTodoToEditId(id))
    }

  return (
    <>
        {todos.map((todo) => (
            <div key={todo.id} className="flex border bg-[#ccbed7] border-black/10 rounded-lg px-3 py-1.5 w-full shadow-sm shadow-white/50 duration-300  text-black">
                <li className="list-none flex items-center justify-between w-full border outline-none bg-transparent rounded-lg border-transparent">
                    <h1>{todo.text}</h1>
                    <div className='flex gap-4'>
                        <button className="w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0" onClick={() => {handleEdit (todo.text, todo.id)}}>
                            ✏️
                        </button>
                        <button className="w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0" onClick={() => dispatch(removeTodo(todo.id)) }>
                            ❌
                        </button>
                    </div>
                </li>
            </div>
        ))}
    </>
  )
}

export default Todos