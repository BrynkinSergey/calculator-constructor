import React from 'react';

import {CalculatorConstructor} from "./components/CalculatorConstructor";
import {ModeSwitcher} from "./components/ModeSwitcher";
import './App.scss';

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
