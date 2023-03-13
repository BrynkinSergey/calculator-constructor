import './Widget.scss'
import {OperationsType, WidgetDropHoverType, WidgetType} from "../../../../constants/types";
import React from "react";
import {Display} from "./components/Display";
import {CalculatorButton} from "./components/CalculatorButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {addDigit, calculate, setOperation} from "../../../../redux/calculatorSlice";
import {digits, operations} from "../../../../constants/constants";

interface WidgetProps {
    dropHover?: WidgetDropHoverType;
    widgetType: WidgetType;
    isActive?: boolean;
    isWithShadow?: boolean;
    onDoubleClick?: (widget: WidgetType) => void
}

export const Widget = ({
                           dropHover = null,
                           widgetType,
                           isActive = true,
                           isWithShadow = false,
                           onDoubleClick = () => {
                           }
                       }: WidgetProps) => {
    const mode = useSelector((state: RootState) => state.calculator.mode)
    const fistDigit = useSelector((state: RootState) => state.calculator.firstDigit)
    const secondDigit = useSelector((state: RootState) => state.calculator.secondDigit)
    const result = useSelector((state: RootState) => state.calculator.result)
    const displayState = useSelector((state: RootState) => state.calculator.displayState)

    const dispatch = useDispatch();

    const handleOnDrag = (event: React.DragEvent, widgetType: WidgetType) => {
        event.dataTransfer.setData('widgetType', widgetType);
    }

    const handleDoubleClick = () => {
        onDoubleClick(widgetType)
    }

    const handleClick = (value: string) => {
        console.log(value)
    }

    const handleClickDigit = (value: string) => {
        if (mode === 'constructor') return
        const digit = +value;
        dispatch(addDigit({digit}));
    }

    const handleClickOperation = (operation: OperationsType) => {
        if (mode === 'constructor') return
        dispatch(setOperation({operation}))
    }

    const handleClickEqual = () => {
        if (mode === 'constructor') return
        dispatch(calculate())
    }

    const getDisplayValue = () => {
        switch (displayState) {
            case 'showFirstDigit':
                return fistDigit;
            case 'showSecondDigit':
                return secondDigit;
            case 'showResult':
                return result;
        }
    }

    let WidgetContent: JSX.Element

    switch (widgetType) {
        case "display":
            WidgetContent = <Display value={getDisplayValue()}/>
            break;

        case "operations":
            WidgetContent = <>{operations.map((operation, index) => {
                return <CalculatorButton handleOnClick={handleClickOperation} key={`operation-button-${index}`}
                                         buttonType={'standard'} value={operation}
                                         height={48} width={52}/>
            })}</>
            break;

        case "digits":
            WidgetContent = <>
                {digits.map((digit, index) => {
                    let width = 72;
                    if (digit === '0') width = 152
                    return <CalculatorButton handleOnClick={handleClickDigit} key={`digit-button-${index}`}
                                             buttonType={'standard'} value={digit}
                                             height={48} width={width}/>
                })}
            </>
            break;

        case "equal":
            WidgetContent =
                <CalculatorButton handleOnClick={handleClickEqual} buttonType={'purple'} value={'='} height={64}
                                  width={232}/>
            break;

    }

    const getDropHoverClass = () => {
        switch (dropHover) {
            case 'top':
                return ' widget--drop-hover-before';
            case 'bottom':
                return ' widget--drop-hover-after';
            default:
                return '';
        }
    }

    return <div draggable={isActive && mode === 'constructor'} onDragStart={(event) => handleOnDrag(event, widgetType)}
                onDoubleClick={handleDoubleClick}
                className={`widget ${widgetType}-widget${!isActive ? ' disabled' : ''}${isWithShadow && isActive ? ' shadowed' : ''}${getDropHoverClass()}`}>
        {WidgetContent}
    </div>
}