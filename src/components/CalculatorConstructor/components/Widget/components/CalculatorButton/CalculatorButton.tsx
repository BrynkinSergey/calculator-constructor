import './CalculatorButton.scss'
import {CalculatorButtonType} from "../../../../../../constants/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

interface CalculatorButtonProps {
    buttonType: CalculatorButtonType;
    value: string;
    height: number;
    width: number;
    //todo remove any
    handleOnClick: (value: any) => void;
}

export const CalculatorButton = ({handleOnClick, buttonType, value, height, width}: CalculatorButtonProps) => {
    const mode = useSelector((state: RootState) => state.calculator.mode)

    return <button onClick={() => {
        handleOnClick(value)
    }}
                   className={`calculator-button calculator-button_${buttonType}${mode === 'runtime' ? ' hover' : ''} height-${height}px width-${width}px`}>
        <div>{value}</div>
    </button>
}