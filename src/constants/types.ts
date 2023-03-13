import {digits, operations, widgets} from "./constants";

export type ModeType = 'runtime' | 'constructor';
export type CalculatorButtonType = 'standard' | 'purple';
export type WidgetType = typeof widgets[number];
export type OperationsType = typeof operations[number] | null;
export type DigitsType = typeof digits[number] | null;
export type WidgetDropHoverType = 'top' | 'bottom' | null;
export type DisplayStatesType = 'showFirstDigit' | 'showSecondDigit' | 'showResult'