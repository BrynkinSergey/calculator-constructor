import {createSlice} from '@reduxjs/toolkit'
import {WidgetType} from "../constants/types";
import {widgets} from "../constants/widgets";

interface CalculatorState {
    mode: 'runtime' | 'constructor';
    availableWidgets: WidgetType[];
}


const initialState: CalculatorState = {
    mode: 'constructor',
    availableWidgets: [...widgets],
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        switchMode: (state) => {
            state.mode = state.mode === 'runtime' ? 'constructor' : 'runtime';
        },
        addAvailableWidget: (state, action) => {
            const index = state.availableWidgets.indexOf(action.payload);
            if (index > -1) return;
            state.availableWidgets.push(action.payload)
        },
        removeAvailableWidget: (state, action) => {
            const index = state.availableWidgets.indexOf(action.payload);
            if (index > -1) state.availableWidgets.splice(index, 1);
        },
    },
})

export const {switchMode, addAvailableWidget, removeAvailableWidget} = calculatorSlice.actions

export default calculatorSlice.reducer