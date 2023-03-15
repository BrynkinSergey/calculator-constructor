import React from "react";

import './ModeSwitcher.scss'
import {ModeEnum} from '../../constants/enums'
import {ReactComponent as EyeIcon} from './images/eye.svg';
import {ModeSwitcherButton} from "./components/ModeSwitcherButton";
import {ReactComponent as SelectorIcon} from './images/selector.svg';


export const ModeSwitcher = () => {
    return <div className='mode-switcher'>
        <ModeSwitcherButton Icon={EyeIcon} buttonMode={ModeEnum.Runtime}/>
        <ModeSwitcherButton Icon={SelectorIcon} buttonMode={ModeEnum.Constructor}/>
    </div>
}