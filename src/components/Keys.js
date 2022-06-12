import React from 'react'
import Star from '../assets/star.png'

export default function Keys({letter, status}) {
    if (status === "current"){
        return (
            <div>
                <div className="highlight"></div>
                <div className='letter current'>{letter.letter}</div>
            </div>
            
        )
    } else if (status === "passed") {
        return (
            <div className='letter'>
                <div className="lowlight"></div>
                {letter.letter}
                <img className='star' src={Star} alt="" />
            </div>
        )
    } else {
        return (
            <div className='letter'>{letter.letter}</div>
        )
    }
}
