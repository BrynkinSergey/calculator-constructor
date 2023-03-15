import './CalculatorButton.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";
import {CalculatorButtonEnum} from "../../../../../../constants/enums";

interface CalculatorButtonProps {
    buttonType: CalculatorButtonEnum;
    value: string;
    height: number;
    width: number;
    //todo remove any
    onClick: (value: any) => void;
}

export const CalculatorButton = ({onClick, buttonType, value, height, width}: CalculatorButtonProps) => {
    const mode = useSelector((state: RootState) => state.calculator.mode)

    const handleClick = () => {
        onClick(value)
    }

    return <button onClick={handleClick}
                   className={`calculator-button calculator-button_${buttonType}${mode === 'runtime' ? ' hover' : ''} height-${height}px width-${width}px`}>
        <div>{value}</div>
    </button>
}