import React, { useEffect } from 'react'
import useVykas from '../hooks/useVykas'
import Test from './Test'
import Timer from './Timer'

export default function Vykas() {
    const {handleKeydown, keyTest, keyIndex, hideTest, result, timer, hideTimer} = useVykas()
    //const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown)
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [handleKeydown])

  return (
    <div>
        <Test keyTest={keyTest} keyIndex={keyIndex} hideTest={hideTest} result={result}/>
        <Timer timer={timer} hideTimer={hideTimer}/>
    </div>
  )
}
