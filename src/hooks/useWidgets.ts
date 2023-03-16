import {useState} from "react";
import {WidgetEnum} from "../constants/enums";

export const useWidgets = (initState: WidgetEnum[] = []) => {
    const [widgets, setWidgets] = useState<WidgetEnum[]>(initState);

    const addWidget = (widget: WidgetEnum, nextWidget?: WidgetEnum) => {
        if (widget === WidgetEnum.Display) {
            setWidgets([widget, ...widgets])
        } else {
            if (nextWidget) {
                const nextWidgetIndex = nextWidget === WidgetEnum.Display ? 1 : widgets.indexOf(nextWidget);
                const updatedWidgets = [...widgets];
                updatedWidgets.splice(nextWidgetIndex, 0, widget);
                setWidgets(updatedWidgets)
            } else {
                setWidgets([...widgets, widget])
            }
        }
    }

    const removeWidget = (widget: WidgetEnum) => {
        setWidgets(widgets.filter((current) => current !== widget))
    }

    const replaceWidget = (widget: WidgetEnum, nextWidget?: WidgetEnum) => {
        const updatedWidgets = widgets.filter((current) => current !== widget);
        if (widget === WidgetEnum.Display) {
            setWidgets([widget, ...updatedWidgets])
        } else {
            if (nextWidget) {
                const nextWidgetIndex = nextWidget === WidgetEnum.Display ? 1 :
                    widget === nextWidget ? widgets.indexOf(widget) :
                        updatedWidgets.indexOf(nextWidget);

                updatedWidgets.splice(nextWidgetIndex, 0, widget);
                setWidgets(updatedWidgets)
            } else {
                setWidgets([...updatedWidgets, widget])
            }
        }
    }

    return {
        widgets,
        addWidget,
        removeWidget,
        replaceWidget
    }
}