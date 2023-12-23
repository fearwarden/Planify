import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

const initialState: UserState = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.id = "";
            state.email = "";
            state.firstName = "";
            state.lastName = "";
            state.role = "";
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

