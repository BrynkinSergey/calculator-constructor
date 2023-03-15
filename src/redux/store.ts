import calculatorReducer from "./calculatorSlice";
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        calculator: calculatorReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch