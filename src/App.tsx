import React from 'react';
import './App.scss';
import {ModeSwitcher} from "./components/ModeSwitcher";
import {CalculatorConstructor} from "./components/CalculatorConstructor";

function App() {
    return <main className='app'>
        <div className='app__header'>
            <ModeSwitcher/>
        </div>
        <div className='app__content'>
            <CalculatorConstructor/>
        </div>
    </main>
}

export default App;
