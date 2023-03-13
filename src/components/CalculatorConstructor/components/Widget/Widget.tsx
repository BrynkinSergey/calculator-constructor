import './Widget.scss'
import {WidgetDropHoverType, WidgetType} from "../../../../constants/types";
import React from "react";
import {Display} from "./components/Display";
import {CalculatorButton} from "./components/CalculatorButton";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

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
    const operations = ['/', 'x', '-', '+'];
    const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

    const mode = useSelector((state: RootState) => state.calculator.mode)

    const handleOnDrag = (event: React.DragEvent, widgetType: WidgetType) => {
        event.dataTransfer.setData('widgetType', widgetType);
    }

    const handleDoubleClick = () => {
        onDoubleClick(widgetType)
    }

    let WidgetContent: JSX.Element

    switch (widgetType) {
        case "display":
            WidgetContent = <Display/>
            break;

        case "operations":
            WidgetContent = <>{operations.map((operation, index) => {
                return <CalculatorButton key={`operation-button-${index}`} buttonType={'standard'} value={operation}
                                         height={48} width={52}/>
            })}</>
            break;

        case "digits":
            WidgetContent = <>
                {digits.map((digit, index) => {
                    let width = 72;
                    if (digit === '0') width = 152
                    return <CalculatorButton key={`digit-button-${index}`} buttonType={'standard'} value={digit}
                                             height={48} width={width}/>
                })}
            </>
            break;

        case "equal":
            WidgetContent = <CalculatorButton buttonType={'purple'} value={'='} height={64} width={232}/>
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