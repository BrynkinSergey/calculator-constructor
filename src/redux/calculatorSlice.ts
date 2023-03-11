import {createSlice} from '@reduxjs/toolkit'

interface CalculatorState {
    mode: 'runtime' | 'constructor';
}


const initialState: CalculatorState = {
    mode: 'constructor'
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        switchMode: (state) => {
            state.mode = state.mode === 'runtime' ? 'constructor' : 'runtime';
        }
    },
})

export const {switchMode} = calculatorSlice.actions

export default calculatorSlice.reducer