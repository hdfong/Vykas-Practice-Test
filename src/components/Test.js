import React from 'react'
import Keys from './Keys'

export default function Test({keyTest, keyIndex, hideTest, result}) {
  if (hideTest === 'hidden'){
    if (result === 'success'){
      return (
        <div className="result">
          <div className={result}>SUCCESS!</div>
          <div className="successGlow"></div>
        </div>
      )
    }
    else {
      return (
        <div className="result">
          <div className="failBG"></div>
          <div className={result}>FAIL</div>
          <div className="failGlow"></div>
        </div>
      )
    }
  }
  return (
    <div className={"test " + hideTest}>
        {keyTest.map((letter,i) => {
            if (i===keyIndex){
                return <Keys key={i} status={"current"} letter={letter}/>
            }
            else if (i <= keyIndex){
                return <Keys key={i} status={"passed"} letter = {letter}/>
            }
            else{
                return <Keys key={i} statusurrent={"waiting"} letter={letter}/>
            }
        })}
    </div>
  )
}
