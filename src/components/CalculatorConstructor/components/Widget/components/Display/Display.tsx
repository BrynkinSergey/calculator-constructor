import './Display.scss'

interface DisplayProps {
    value?: string;
}

export const Display = ({value = '0'}: DisplayProps) => {
    return <div className='display'>
        <div
            className={`display__text${value === 'Не определено' ? ' result-undefined' : ''}`}>{value === '' ? 0 : value}</div>
    </div>
}