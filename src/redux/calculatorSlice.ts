import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DisplayStatesType, OperationsType, WidgetType} from "../constants/types";
import {widgets} from "../constants/constants";

interface CalculatorState {
    mode: 'runtime' | 'constructor';
    availableWidgets: WidgetType[];
    firstDigit: string;
    secondDigit: string;
    result: string;
    displayState: DisplayStatesType;
    currentOperation: OperationsType;
}


const initialState: CalculatorState = {
    mode: 'constructor',
    availableWidgets: [...widgets],
    firstDigit: '',
    secondDigit: '',
    result: '',
    displayState: 'showFirstDigit',
    currentOperation: null,
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        switchMode: (state) => {
            state.mode = state.mode === 'runtime' ? 'constructor' : 'runtime';
            state.firstDigit = '';
            state.secondDigit = '';
            state.result = '';
            state.displayState = 'showFirstDigit';
            state.currentOperation = null;
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
            if (state.displayState === 'showResult') state.displayState = 'showFirstDigit';
            if (state.currentOperation) state.displayState = 'showSecondDigit';
            const {digit} = action.payload;
            const {displayState, firstDigit, secondDigit} = state
            if (displayState === 'showSecondDigit') {
                state.secondDigit = (secondDigit + digit).toString();
            } else {
                state.firstDigit = (firstDigit + digit).toString();
            }
        },
        setOperation: (state, action: PayloadAction<{ operation: OperationsType }>) => {
            if (state.displayState === 'showResult') state.firstDigit = state.result;
            state.currentOperation = action.payload.operation;
        },
        calculate: (state) => {
            const {currentOperation, firstDigit, secondDigit} = state
            switch (currentOperation) {
                case '+':
                    state.result = (+firstDigit + +secondDigit).toString();
                    break;
                case '-':
                    state.result = (+firstDigit - +secondDigit).toString();
                    break;
                case 'x':
                    state.result = (+firstDigit * +secondDigit).toString();
                    break;
                case '/':
                    state.result = (+firstDigit / +secondDigit).toString();
                    break;
            }
            state.result = state.result.length > 9 ? (+state.result).toFixed(9 - state.result.toString().split('.')[0].length) : state.result
            if (!Number.isFinite(+state.result)) state.result = 'Не определено';
            state.firstDigit = '';
            state.secondDigit = '';
            state.currentOperation = null;
            state.displayState = 'showResult'
        },
        setDecimalPoint: (state) => {
            if (state.displayState === 'showResult') state.displayState = 'showFirstDigit';
            if (state.displayState === 'showFirstDigit') {
                if (!state.firstDigit) {
                    state.firstDigit = '0.'
                } else {
                    state.firstDigit = state.firstDigit + '.'
                }
            }
            if (state.displayState === 'showSecondDigit') {
                if (!state.secondDigit) {
                    state.secondDigit = '0.'
                } else {
                    state.secondDigit = state.secondDigit + '.'
                }
            }
        }

    },
})

export const {
    switchMode,
    addAvailableWidget,
    removeAvailableWidget,
    addDigit,
    setOperation,
    calculate,
    setDecimalPoint
} = calculatorSlice.actions

export default calculatorSlice.reducer