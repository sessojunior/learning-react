import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
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
	},
});

export const { createUser, logoutUser, addAddress, deleteAddress } = userSlice.actions;
export default userSlice.reducer;
