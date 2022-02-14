import React from 'react'
import { useParams } from 'react-router-dom'

const Main = () => {
    let {success} = useParams();
    return (
        <div className="mainPage">
            {success? <h3>Butas rezervuotas sekmingai!</h3>: <div></div>}
            <h1>Butu rezervavimo sistema</h1>
        </div>
    )
}

export default Main
