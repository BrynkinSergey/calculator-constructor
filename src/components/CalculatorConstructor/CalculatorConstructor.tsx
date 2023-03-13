import './CalculatorConstructor.scss'
import React from "react";
import {Dropzone} from "./components/Dropzone";
import {BlocksField} from "./components/BlocksField";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export const CalculatorConstructor = () => {
    const mode = useSelector((state: RootState) => state.calculator.mode)

    return <div className='calculator-constructor'>
        {mode === 'constructor' && <BlocksField/>}
        <Dropzone/>
    </div>
}