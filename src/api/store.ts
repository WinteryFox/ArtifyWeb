import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Api} from "./index";
import User = Api.User;

const userSlice = createSlice({
    name: "user",
    initialState: {
        self: null as User | null
    },
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.self = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

const store = configureStore({
    reducer: userSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
