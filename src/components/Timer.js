import React from 'react'

export default function Timer({timer, hideTimer}) {
  if (!hideTimer)
    return (
        <div className="timer">
            <div className="bg"/>
            <div className="bar"/>
            <div className="time">{timer}</div>
        </div>
    )
  return (<div></div>)
}
