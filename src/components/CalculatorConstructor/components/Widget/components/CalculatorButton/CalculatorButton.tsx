import './CalculatorButton.scss'
import {CalculatorButtonType} from "../../../../../../constants/types";

interface CalculatorButtonProps {
    buttonType: CalculatorButtonType;
    value: string;
    height: number;
    width: number;
}

export const CalculatorButton = ({buttonType, value, height, width}: CalculatorButtonProps) => {
    return <button className={`calculator-button calculator-button_${buttonType} height-${height}px width-${width}px`}>
        <div>{value}</div>
    </button>
}