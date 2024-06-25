import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	users: [],
	loading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		createUser: (state, action) => {
			if (action.payload.name.length < 3) {
				alert("Nome precisa ter pelo menos 3 caracteres");
				return { ...state };
			}
			//console.log(action.payload);
			return {
				...state,
				user: {
					name: action.payload.name,
					email: action.payload.email,
					address: null,
				},
			};
		},
		logoutUser: (state) => {
			return {
				...state,
				user: null,
			};
		},
		addAddress: (state, action) => {
			if (!state.user) {
				alert("Necessário fazer o login antes de adicionar um endereço");
				return { ...state };
			}

			if (action.payload.location.length < 3 || action.payload.number.length < 1) {
				alert("Endereço precisa ser preenchido corretamente");
				return { ...state };
			}

			console.log({
				location: action.payload.location,
				number: action.payload.number,
			});

			alert("Endereço adicionado com sucesso!");

			return {
				...state,
				user: {
					...state.user,
					address: {
						location: action.payload.location,
						number: action.payload.number,
					},
				},
			};
		},
		deleteAddress: (state) => {
			return {
				...state,
				user: {
					...state.user,
					address: null,
				},
			};
		},
		fetchUsers: (state) => {
			console.log("Chamou o fetchUsers");
			state.loading = true;
		},
		fetchUsersSuccess: (state, action) => {
			console.log("Caiu na success")
			console.log("action.payload", action.payload)
			state.users = action.payload;
			state.loading = false;
		},
		fetchUsersFailure: (state, action) => {
			console.log("Caiu na failure")
			console.log("action.payload", action.payload)
			state.loading = false;
		},
		fetchUserById: (state) => {
			console.log("Caiu na fetchUserById")
		},
		fetchUserByIdSuccess: (state, action) => {
			console.log("Caiu na fetchUserByIdSuccess")
			console.log("action.payload", action.payload)
		},
		fetchUserByIdFailure: (state, action) => {
			console.log("Caiu na fetchUserByIdFailure")
			console.log("action.payload", action.payload)
		}
	},
});

export const { createUser, logoutUser, addAddress, deleteAddress, fetchUsers, fetchUsersSuccess, fetchUsersFailure, fetchUserById, fetchUserByIdSuccess, fetchUserByIdFailure } = userSlice.actions;
export default userSlice.reducer;
