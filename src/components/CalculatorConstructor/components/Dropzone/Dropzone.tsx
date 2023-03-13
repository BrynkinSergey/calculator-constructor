import './Dropzone.scss'
import React, {useState} from "react";
import {ReactComponent as ImageIcon} from "./images/image-icon.svg";
import {Widget} from "../Widget";
import {WidgetDropHoverType, WidgetType} from "../../../../constants/types";
import {useDispatch, useSelector} from "react-redux";
import {addAvailableWidget, removeAvailableWidget} from "../../../../redux/calculatorSlice";
import {useWidgets} from "../../../../hooks/useWidgets";
import {WIDGET_CLASS} from "./Dropzone.consts";
import {RootState} from "../../../../redux/store";

export const Dropzone = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [dropHoveredWidget, setDropHoveredWidget] = useState<WidgetType | 'dropzone' | null>(null)
    const {widgets, addWidget, removeWidget, replaceWidget} = useWidgets()
    const mode = useSelector((state: RootState) => state.calculator.mode)
    const dispatch = useDispatch();

    const handleDoubleClick = (widget: WidgetType) => {
        if (mode === 'constructor') {
            removeWidget(widget)
            dispatch(addAvailableWidget(widget))
        }
    }

    const handleOnDrop = (event: React.DragEvent) => {
        const target = event.target as HTMLDivElement;
        const widget = event.dataTransfer.getData('widgetType') as WidgetType;

        if (target.closest(`.${WIDGET_CLASS}`)?.className.includes(WIDGET_CLASS)) {
            const nextWidget = target.closest(`.${WIDGET_CLASS}`)?.className.split(' ')[1].split('-')[0] as WidgetType;
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

        setDropHoveredWidget(null)
        dispatch(removeAvailableWidget(widget))
        setIsDragging(false)
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        const widgetType = event.dataTransfer.getData('widgetType') as WidgetType;

        if (target.closest(`.${WIDGET_CLASS}`)?.className.includes(WIDGET_CLASS)) {
            const nextWidgetType = target.closest(`.${WIDGET_CLASS}`)?.className.split(' ')[1].split('-')[0] as WidgetType;
            if (!widgets.includes(widgetType)) {
                setDropHoveredWidget(nextWidgetType)
            }
        } else {

            if (!widgets.includes(widgetType)) {
                setDropHoveredWidget('dropzone')
            }
        }

    }
    const handleDragEnter = (event: React.DragEvent) => setIsDragging(true);
    const handleDragLeave = (event: React.DragEvent) => {
        setIsDragging(false);
        setDropHoveredWidget(null)
    }

    const getDropHoverForWidget = (widget: WidgetType): WidgetDropHoverType => {
        if (dropHoveredWidget === 'display' && widget === 'display' && widgets.length === 1) return 'bottom';
        if (dropHoveredWidget === 'display' && widget === 'display' && widgets.length !== 1) return null;
        if (dropHoveredWidget === 'display' && widget === widgets[1]) return 'top';
        if (dropHoveredWidget === 'dropzone' && widget === widgets[widgets.length - 1]) return 'bottom';
        if (widget === dropHoveredWidget) return 'top';
        return null;
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