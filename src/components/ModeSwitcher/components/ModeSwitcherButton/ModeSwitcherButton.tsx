import './ModeSwitcherButton.scss'
import React, {SVGProps} from "react";
import {modeType} from "../../../../constants/mode.type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {switchMode} from "../../../../redux/calculatorSlice";
import {capitalizeFirstLetter} from "../../../../utils/capitalizeFirstLetter";

interface IconProps {
    stroke: 'string'
}

interface ModeSwitcherButtonProps {
    buttonMode: modeType,
    Icon: React.FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>
}

export const ModeSwitcherButton = ({buttonMode, Icon}: ModeSwitcherButtonProps) => {
    const mode = useSelector((state: RootState) => state.calculator.mode)
    const dispatch = useDispatch();

    const isActive = mode !== buttonMode;
    const activeColor = '#5D5FEF'
    const disabledColor = '#4D5562'
    const currentColor = isActive ? activeColor : disabledColor;

    const handleSwitchMode = () => dispatch(switchMode());

    return <button disabled={!isActive} onClick={handleSwitchMode}
                   className={`mode-switcher__${buttonMode}-button`}>
        <div className='image-wrapper'>
            <Icon stroke={currentColor}/>
        </div>
        {capitalizeFirstLetter(buttonMode)}
    </button>
}