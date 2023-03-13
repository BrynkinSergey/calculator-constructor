import './BlocksField.scss'
import React from "react";
import {Widget} from "../Widget";
import {widgets} from "../../../../constants/constants";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export const BlocksField = () => {
    const availableWidgets = useSelector((state: RootState) => state.calculator.availableWidgets)

    return <div className='building-blocks'>
        {widgets.map((widget, index) => <Widget key={`building-widget-${index}`}
                                                isActive={availableWidgets.includes(widget)}
                                                widgetType={widget}
                                                isWithShadow={true}/>)}
    </div>
}