// import { takeEvery } from "redux-saga/effects";
import { all, takeLatest, call, put, delay } from "redux-saga/effects";
import { fetchUsersSuccess, fetchUsersFailure, fetchUserByIdSuccess, fetchUserByIdFailure } from "./slice";
import axios from "axios";

// API Users: https://jsonplaceholder.typicode.com/users

function* fetchUsers() {
	console.log("Chamou fetchUsers dentro do Saga");

	yield delay(1000);

	try {
		const response = yield call(axios.get, "https://jsonplaceholder.typicode.com/users");
		console.log("response.data", response.data);
		yield put(fetchUsersSuccess(response.data));
	} catch (error) {
		console.log(error);
		yield put(fetchUsersFailure(error.message));
	}
}

function* fetchUserById(action) { 
	try {
		const id = action.payload;
		const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${id}`);
		console.log(`response.data [fetchUserById] [id: ${id}]`, response.data);
		yield put(fetchUserByIdSuccess(response.data));
	} catch (error) {
		console.log(error);
		yield put(fetchUserByIdFailure(error.message));
	}
}

export default all([
	// takeEvery("user/fetchUsers", fetchUsers)
	takeLatest("user/fetchUsers", fetchUsers),
	takeLatest("user/fetchUserById", fetchUserById)
]);
