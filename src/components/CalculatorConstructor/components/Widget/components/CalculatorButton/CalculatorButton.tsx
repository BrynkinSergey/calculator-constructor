import './CalculatorButton.scss'
import {CalculatorButtonType} from "../../../../../../constants/types";

interface CalculatorButtonProps {
    style: CalculatorButtonType;
    value: string;
    height: number;
    width: number;
}

export const CalculatorButton = ({style, value, height, width}: CalculatorButtonProps) => {
    return <button className={`calculator-button calculator-button_${style} height-${height}px width-${width}px`}>
        <div>{value}</div>
    </button>
}