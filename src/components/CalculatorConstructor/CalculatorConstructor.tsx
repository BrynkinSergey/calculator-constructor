import './CalculatorConstructor.scss'
import React from "react";
import {Dropzone} from "./components/Dropzone";
import {BlocksField} from "./components/BlocksField";

export const CalculatorConstructor = () => {
    return <div className='calculator-constructor'>
        <BlocksField/>
        <Dropzone/>
    </div>
}