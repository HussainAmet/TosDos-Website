import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, removeTodo, clearSelectedTodoToEditId, clearSelectedTodoToEdit } from '../features/todo/todoSlice'

function AddTodo() {
    const prevText = useSelector(state => state.textForEdit)
    const id = useSelector(state => state.idForEdit)

    const [input, setInput] = useState('')
    const [editEnable, setEditEnable] = useState(false)

    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput('')
        if (prevText) dispatch(removeTodo(id))
        dispatch(clearSelectedTodoToEdit())
        dispatch(clearSelectedTodoToEditId())
        setEditEnable(false)
    }

    useEffect (() => {
        setInput(prevText || '')
        if (prevText) setEditEnable(true)
    }, [prevText, id])

    return (
        <form onSubmit={addTodoHandler} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                {editEnable ? "Update" : "Add"}
            </button>
        </form>
    );
}

export default AddTodo;