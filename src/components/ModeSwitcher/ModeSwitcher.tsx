import React from "react";
import './ModeSwitcher.scss'
import {ModeSwitcherButton} from "./components/ModeSwitcherButton";
import {ReactComponent as EyeIcon} from './images/eye.svg';
import {ReactComponent as SelectorIcon} from './images/selector.svg';

export const ModeSwitcher = () => {
    return <div className='mode-switcher'>
        <ModeSwitcherButton Icon={EyeIcon} buttonMode='runtime'/>
        <ModeSwitcherButton Icon={SelectorIcon} buttonMode='constructor'/>
    </div>
}