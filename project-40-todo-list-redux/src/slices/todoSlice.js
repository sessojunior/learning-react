import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		tasks: [],
		filter: "all",
	},
	reducers: {
		addTask: (state, action) => {
			state.tasks.push({
				id: Math.random().toString(),
				title: action.payload,
				completed: false,
			});
		},
		toggleTask: (state, action) => {
			const todo = state.tasks.find((task) => task.id === action.payload);
			todo.completed = !todo.completed;
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
		filterTasks: (state, action) => {
			state.filter = action.payload;
		},
	},
});

export const { addTask, toggleTask, removeTask, filterTasks } = todoSlice.actions;

export default todoSlice.reducer;
