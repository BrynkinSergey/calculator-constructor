import React from "react";
import {WIDGET_CLASS} from "../components/CalculatorConstructor/components/Dropzone/Dropzone.consts";

export const getWidgetClassName = (event: React.DragEvent): string => {
    const target = event.target as HTMLDivElement;
    const className = target.closest(`.${WIDGET_CLASS}`)?.className
    return className ? className : '';
}