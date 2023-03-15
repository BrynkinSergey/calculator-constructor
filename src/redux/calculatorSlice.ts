import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DisplayStateEnum, ModeEnum, OperationsEnum, WidgetEnum} from "../constants/enums";
import {widgets} from "../constants/constants";

interface CalculatorState {
    mode: ModeEnum;
    availableWidgets: WidgetEnum[];
    firstDigit: string;
    secondDigit: string;
    result: string;
    displayState: DisplayStateEnum;
    currentOperation: OperationsEnum;
}

const initialState: CalculatorState = {
    mode: ModeEnum.Constructor,
    availableWidgets: [...widgets],
    firstDigit: '',
    secondDigit: '',
    result: '',
    displayState: DisplayStateEnum.ShowFirstDigit,
    currentOperation: OperationsEnum.Empty,
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        switchMode: (state) => {
            state.mode = state.mode === ModeEnum.Runtime ? ModeEnum.Constructor : ModeEnum.Runtime;
            state.firstDigit = '';
            state.secondDigit = '';
            state.result = '';
            state.displayState = DisplayStateEnum.ShowFirstDigit;
            state.currentOperation = OperationsEnum.Empty;
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
            if (state.displayState === DisplayStateEnum.ShowResult) state.displayState = DisplayStateEnum.ShowFirstDigit;
            if (state.currentOperation !== OperationsEnum.Empty) state.displayState = DisplayStateEnum.ShowSecondDigit;
            const {digit} = action.payload;
            const {displayState, firstDigit, secondDigit} = state
            if (displayState === DisplayStateEnum.ShowSecondDigit) {
                if (state.secondDigit === '0') return
                state.secondDigit = (secondDigit + digit).toString();
            } else {
                if (state.firstDigit === '0') return
                state.firstDigit = (firstDigit + digit).toString();
            }
        },
        setOperation: (state, action: PayloadAction<{ operation: OperationsEnum }>) => {
            if (state.displayState === DisplayStateEnum.ShowResult) state.firstDigit = state.result;
            state.currentOperation = action.payload.operation;
        },
        calculate: (state) => {
            if (state.secondDigit === '') state.secondDigit = state.firstDigit;
            const {currentOperation, firstDigit, secondDigit} = state
            switch (currentOperation) {
                case OperationsEnum.Adding:
                    state.result = (+firstDigit + +secondDigit).toString();
                    break;
                case OperationsEnum.Subtraction:
                    state.result = (+firstDigit - +secondDigit).toString();
                    break;
                case OperationsEnum.Multiplication:
                    state.result = (+firstDigit * +secondDigit).toString();
                    break;
                case OperationsEnum.Division:
                    state.result = (+firstDigit / +secondDigit).toString();
                    break;
            }
            state.result = state.result.length > 9 ? (+state.result).toFixed(9 - state.result.toString().split('.')[0].length) : state.result
            if (!Number.isFinite(+state.result)) state.result = 'Не определено';
            state.firstDigit = '';
            state.secondDigit = '';
            state.currentOperation = OperationsEnum.Empty;
            state.displayState = DisplayStateEnum.ShowResult
        },
        setDecimalPoint: (state) => {
            if (state.displayState === DisplayStateEnum.ShowResult) state.displayState = DisplayStateEnum.ShowFirstDigit;
            if (state.displayState === DisplayStateEnum.ShowFirstDigit) {
                if (state.firstDigit.includes('.')) return
                if (!state.firstDigit) {
                    state.firstDigit = '0.'
                } else {
                    state.firstDigit = state.firstDigit + '.'
                }
            }
            if (state.displayState === DisplayStateEnum.ShowSecondDigit) {
                if (state.secondDigit.includes('.')) return
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