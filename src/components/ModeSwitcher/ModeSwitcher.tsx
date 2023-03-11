import React from "react";
import './ModeSwitcher.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {switchMode} from "../../redux/calculatorSlice";
import {ModeSwitcherButton} from "./components/ModeSwitcherButton";
import {ReactComponent as EyeIcon} from './images/eye.svg';
import {ReactComponent as SelectorIcon} from './images/selector.svg';

export const ModeSwitcher = () => {
    const mode = useSelector((state: RootState) => state.calculator.mode)
    const dispatch = useDispatch();

    const handleSwitchMode = () => dispatch(switchMode());

    return <div className='mode-switcher'>
        <ModeSwitcherButton Icon={EyeIcon} buttonMode='runtime'/>
        <ModeSwitcherButton Icon={SelectorIcon} buttonMode='constructor'/>
    </div>
}