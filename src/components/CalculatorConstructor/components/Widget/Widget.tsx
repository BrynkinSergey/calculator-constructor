import './Widget.scss'
import React from "react";
import {Display} from "./components/Display";
import {CalculatorButton} from "./components/CalculatorButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {addDigit, calculate, setDecimalPoint, setOperation} from "../../../../redux/calculatorSlice";
import {digits, operations} from "../../../../constants/constants";
import {
    CalculatorButtonEnum,
    DisplayStateEnum,
    ModeEnum,
    OperationsEnum,
    WidgetDropPlaceEnum,
    WidgetEnum
} from "../../../../constants/enums";

interface WidgetProps {
    dropHover?: WidgetDropPlaceEnum;
    widgetType: WidgetEnum;
    isActive?: boolean;
    isWithShadow?: boolean;
    onDoubleClick?: (widget: WidgetEnum) => void
    isDraggable?: boolean;
}

export const Widget = ({
                           dropHover = WidgetDropPlaceEnum.Nowhere,
                           widgetType,
                           isActive = true,
                           isWithShadow = false,
                           isDraggable = true,
                           onDoubleClick = () => {
                           }
                       }: WidgetProps) => {
    const mode = useSelector((state: RootState) => state.calculator.mode)
    const fistDigit = useSelector((state: RootState) => state.calculator.firstDigit)
    const secondDigit = useSelector((state: RootState) => state.calculator.secondDigit)
    const result = useSelector((state: RootState) => state.calculator.result)
    const displayState = useSelector((state: RootState) => state.calculator.displayState)

    const dispatch = useDispatch();

    const getDropHoverClass = () => {
        switch (dropHover) {
            case WidgetDropPlaceEnum.Top:
                return ' widget--drop-hover-before';
            case WidgetDropPlaceEnum.Bottom:
                return ' widget--drop-hover-after';
            default:
                return '';
        }
    }

    const handleOnDrag = (event: React.DragEvent, widgetType: WidgetEnum) => {
        event.dataTransfer.setData('widgetType', widgetType);
    }

    const handleDoubleClick = () => {
        onDoubleClick(widgetType)
    }

    let WidgetContent: JSX.Element

    switch (widgetType) {
        case WidgetEnum.Display:
            const getDisplayValue = () => {
                switch (displayState) {
                    case DisplayStateEnum.ShowFirstDigit:
                        return fistDigit;
                    case DisplayStateEnum.ShowSecondDigit:
                        return secondDigit;
                    case DisplayStateEnum.ShowResult:
                        return result;
                }
            }

            WidgetContent = <Display value={getDisplayValue().toString()}/>
            break;

        case WidgetEnum.Operations:
            const handleClickOperation = (operation: OperationsEnum) => {
                if (mode === ModeEnum.Constructor) return
                dispatch(setOperation({operation}))
            }

            WidgetContent = <>{operations.map((operation, index) => {
                if (operation === OperationsEnum.Empty) return null;
                return <CalculatorButton onClick={handleClickOperation} key={`operation-button-${index}`}
                                         buttonType={CalculatorButtonEnum.Standard} value={operation}
                                         height={48} width={52}/>
            })}</>
            break;

        case WidgetEnum.Digits:
            const handleClickColon = () => {
                if (mode === ModeEnum.Constructor) return
                dispatch(setDecimalPoint())
            }

            const handleClickDigit = (value: string) => {
                if (mode === ModeEnum.Constructor) return
                const digit = +value;
                dispatch(addDigit({digit}));
            }

            WidgetContent = <>
                {digits.map((digit, index) => {
                    let width = 72;
                    if (digit === '0') width = 152
                    return <CalculatorButton onClick={digit === ',' ? handleClickColon : handleClickDigit}
                                             key={`digit-button-${index}`}
                                             buttonType={CalculatorButtonEnum.Standard} value={digit}
                                             height={48} width={width}/>
                })}
            </>
            break;

        case WidgetEnum.Equal:
            const handleClickEqual = () => {
                if (mode === ModeEnum.Constructor) return
                dispatch(calculate())
            }

            WidgetContent =
                <CalculatorButton onClick={handleClickEqual} buttonType={CalculatorButtonEnum.Purple} value={'='}
                                  height={64}
                                  width={232}/>
            break;

    }

    return <div draggable={isDraggable}
                onDragStart={(event) => handleOnDrag(event, widgetType)}
                onDoubleClick={handleDoubleClick}
                className={`widget ${widgetType}-widget${!isActive ? ' disabled' : ''}${isWithShadow && isActive ? ' shadowed' : ''}${getDropHoverClass()}`}>
        {WidgetContent}
    </div>
}