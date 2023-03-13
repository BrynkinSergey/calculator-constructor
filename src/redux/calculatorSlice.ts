import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DisplayStatesType, OperationsType, WidgetType} from "../constants/types";
import {widgets} from "../constants/constants";

interface CalculatorState {
    mode: 'runtime' | 'constructor';
    availableWidgets: WidgetType[];
    firstDigit: number;
    secondDigit: number;
    result: number;
    displayState: DisplayStatesType;
    currentOperation: OperationsType;
}


const initialState: CalculatorState = {
    mode: 'constructor',
    availableWidgets: [...widgets],
    firstDigit: 0,
    secondDigit: 0,
    result: 0,
    displayState: 'showFirstDigit',
    currentOperation: null,
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
        addDigit: (state, action: PayloadAction<{ digit: number }>) => {
            const {digit} = action.payload;
            console.log(digit)
            const {displayState, firstDigit, secondDigit} = state
            if (displayState === 'showSecondDigit') {
                state.secondDigit = secondDigit * 10 + digit;
            } else {
                state.firstDigit = firstDigit * 10 + digit;
            }
        },
        setOperation: (state, action: PayloadAction<{ operation: OperationsType }>) => {
            state.currentOperation = action.payload.operation;
            state.displayState = 'showSecondDigit';
        },
        calculate: (state) => {
            const {currentOperation, firstDigit, secondDigit} = state
            switch (currentOperation) {
                case '+':
                    state.result = firstDigit + secondDigit;
                    break;
                case '-':
                    state.result = firstDigit - secondDigit;
                    break;
                case 'x':
                    state.result = firstDigit * secondDigit;
                    break;
                case '/':
                    state.result = firstDigit / secondDigit;
                    break;
            }
            state.firstDigit = 0;
            state.secondDigit = 0;
            state.currentOperation = null;
            state.displayState = 'showResult'
        }

    },
})

export const {
    switchMode,
    addAvailableWidget,
    removeAvailableWidget,
    addDigit,
    setOperation,
    calculate
} = calculatorSlice.actions

export default calculatorSlice.reducer