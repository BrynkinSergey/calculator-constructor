import {widgets} from "./widgets";

export type ModeType = 'runtime' | 'constructor';
export type CalculatorButtonType = 'standard' | 'purple';
export type WidgetType = typeof widgets[number];
export type DropzoneWidgetType = WidgetType | 'line';
export type WidgetDropHoverType = 'top' | 'bottom' | null;