import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    textForEdit: null,
    idForEdit: null
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state ,action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        selectedTodoToEdit: (state, action) => {
            console.log("TEXT 123");
            state.textForEdit = action.payload
            console.log(state.textForEdit);
        },
        selectedTodoToEditId: (state, action) => {
            console.log("ID 123");
            state.idForEdit = action.payload
            console.log(state.idForEdit);
        },
        clearSelectedTodoToEdit: (state) => {
            state.textForEdit = null
        },
        clearSelectedTodoToEditId: (state) => {
            state.idForEdit = null
        }
    }
})

export const {addTodo, removeTodo, updateTodo, updateBtnClicked, selectedTodoToEdit, clearSelectedTodoToEdit, selectedTodoToEditId, clearSelectedTodoToEditId} = todoSlice.actions

export default todoSlice.reducer