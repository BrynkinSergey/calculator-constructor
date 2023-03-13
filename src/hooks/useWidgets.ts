import {useState} from "react";
import {WidgetType} from "../constants/types";

export const useWidgets = (initState: WidgetType[] = []) => {
    const [widgets, setWidgets] = useState<WidgetType[]>(initState);
    
    const addWidget = (widget: WidgetType, nextWidget?: WidgetType) => {
        if (widget === 'display') {
            setWidgets([widget, ...widgets])
        } else {
            if (nextWidget) {
                const nextWidgetIndex = nextWidget === 'display' ? 1 : widgets.indexOf(nextWidget);
                const updatedWidgets = [...widgets];
                updatedWidgets.splice(nextWidgetIndex, 0, widget);
                setWidgets(updatedWidgets)
            } else {
                setWidgets([...widgets, widget])
            }
        }
    }

    const removeWidget = (widget: WidgetType) => {
        setWidgets(widgets.filter((current) => current !== widget))
    }

    return {
        widgets,
        addWidget,
        removeWidget
    }
}