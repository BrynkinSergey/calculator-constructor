import './Display.scss'

interface DisplayProps {
    value?: number
}

export const Display = ({value = 0}: DisplayProps) => {
    return <div className='display'>
        <div className='display__text'>{value}</div>
    </div>
}