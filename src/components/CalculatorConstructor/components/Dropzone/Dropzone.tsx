import './Dropzone.scss'
import React, {useState} from "react";
import {ReactComponent as ImageIcon} from "./images/image-icon.svg";
import {Widget} from "../Widget";
import {useDispatch, useSelector} from "react-redux";
import {addAvailableWidget, removeAvailableWidget} from "../../../../redux/calculatorSlice";
import {useWidgets} from "../../../../hooks/useWidgets";
import {WIDGET_CLASS} from "./Dropzone.consts";
import {RootState} from "../../../../redux/store";
import {DropHoverWidgetEnum, ModeEnum, WidgetDropPlaceEnum, WidgetEnum} from "../../../../constants/enums";

export const Dropzone = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [dropHoveredWidget, setDropHoveredWidget] = useState<DropHoverWidgetEnum>(DropHoverWidgetEnum.Null)
    const {widgets, addWidget, removeWidget, replaceWidget} = useWidgets()
    const mode = useSelector((state: RootState) => state.calculator.mode)
    const dispatch = useDispatch();

    const handleDoubleClick = (widget: WidgetEnum) => {
        if (mode === ModeEnum.Constructor) {
            removeWidget(widget)
            dispatch(addAvailableWidget(widget))
        }
    }

    const handleOnDrop = (event: React.DragEvent) => {
        const target = event.target as HTMLDivElement;
        const widget = event.dataTransfer.getData('widgetType') as WidgetEnum;

        if (target.closest(`.${WIDGET_CLASS}`)?.className.includes(WIDGET_CLASS)) {
            const nextWidget = target.closest(`.${WIDGET_CLASS}`)?.className.split(' ')[1].split('-')[0] as WidgetEnum;
            if (widgets.includes(widget)) {
                replaceWidget(widget, nextWidget)
            } else {
                addWidget(widget, nextWidget);
            }
        } else {
            if (widgets.includes(widget)) {
                replaceWidget(widget)
            } else addWidget(widget);
        }

        setDropHoveredWidget(DropHoverWidgetEnum.Null)
        dispatch(removeAvailableWidget(widget))
        setIsDragging(false)
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        const widgetType = event.dataTransfer.getData('widgetType') as WidgetEnum;

        if (target.closest(`.${WIDGET_CLASS}`)?.className.includes(WIDGET_CLASS)) {
            const nextWidgetType = target.closest(`.${WIDGET_CLASS}`)?.className.split(' ')[1].split('-')[0] as DropHoverWidgetEnum;
            if (!widgets.includes(widgetType)) {
                setDropHoveredWidget(nextWidgetType)
            }
        } else {

            if (!widgets.includes(widgetType)) {
                setDropHoveredWidget(DropHoverWidgetEnum.Dropzone)
            }
        }

    }
    const handleDragEnter = (event: React.DragEvent) => setIsDragging(true);
    const handleDragLeave = (event: React.DragEvent) => {
        setIsDragging(false);
        setDropHoveredWidget(DropHoverWidgetEnum.Null)
    }

    const getDropHoverForWidget = (widget: WidgetEnum): WidgetDropPlaceEnum => {
        if (dropHoveredWidget === DropHoverWidgetEnum.Display && widget === WidgetEnum.Display && widgets.length === 1) return WidgetDropPlaceEnum.Bottom;
        if (dropHoveredWidget === DropHoverWidgetEnum.Display && widget === WidgetEnum.Display && widgets.length !== 1) return WidgetDropPlaceEnum.Nowhere;
        if (dropHoveredWidget === DropHoverWidgetEnum.Display && widget === widgets[1]) return WidgetDropPlaceEnum.Top;
        if (dropHoveredWidget === DropHoverWidgetEnum.Dropzone && widget === widgets[widgets.length - 1]) return WidgetDropPlaceEnum.Bottom;
        if (widget as string === dropHoveredWidget as string) return WidgetDropPlaceEnum.Top;
        return WidgetDropPlaceEnum.Nowhere;
    }

    return <div className='dropzone' onDrop={(event) => handleOnDrop(event)}
                onDragOver={(event) => handleDragOver(event)}
                onDragEnter={(event) => handleDragEnter(event)}
                onDragLeave={(event) => handleDragLeave(event)}>
        {!widgets.length && <div className={`placeholder${isDragging ? ' dragging' : ''}`}>
            <div className='content'>
                <ImageIcon/>
                <div className='dropzone__title'>Перетащите сюда</div>
                <div className='dropzone__text'>любой элемент из левой панели</div>
            </div>
        </div>}
        {!!widgets.length && widgets.map((widget, index) => {
            return <Widget dropHover={getDropHoverForWidget(widget)} onDoubleClick={handleDoubleClick} key={index}
                           widgetType={widget}/>
        })}
    </div>
}