import {OperationsEnum, WidgetEnum} from "./enums";

export const operations = Object.values(OperationsEnum);
export const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','] as const;
export const widgets = Object.values(WidgetEnum);