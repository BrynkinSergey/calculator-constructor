import React from 'react';
import './App.scss';
import {ModeSwitcher} from "./components/ModeSwitcher";

function App() {
    return <main className='app'>
        <div className='app__header'>
            <ModeSwitcher/>
        </div>
        <div className='app__content'>
            <div className='calculator-constructor'>
                <div className='calculator-constructor__building-blocks'></div>
                <div className='calculator-constructor__constructor-field'></div>
            </div>
        </div>
    </main>
}

export default App;
