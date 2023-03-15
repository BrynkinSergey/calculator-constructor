export enum ModeEnum {
    Runtime = 'runtime',
    Constructor = 'constructor',
}

export enum CalculatorButtonEnum {
    Standard = 'standard',
    Purple = 'purple',
}

export enum WidgetEnum {
    Display = 'display',
    Operations = 'operations',
    Digits = 'digits',
    Equal = 'equal'
}

export enum DropHoverWidgetEnum {
    Display = 'display',
    Operations = 'operations',
    Digits = 'digits',
    Equal = 'equal',
    Dropzone = 'dropzone',
    Null = 'null',
}

export enum OperationsEnum {
    Adding = '+',
    Subtraction = '-',
    Multiplication = 'x',
    Division = '/',
    Empty = 'empty',
}

export enum WidgetDropPlaceEnum {
    Top = 'top',
    Bottom = 'bottom',
    Nowhere = 'nowhere',
}

export enum DisplayStateEnum {
    ShowFirstDigit = 'showFirstDigit',
    ShowSecondDigit = 'showSecondDigit',
    ShowResult = 'showResult',
}