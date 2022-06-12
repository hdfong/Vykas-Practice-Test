import { useState, useEffect } from "react"
import useSound from 'use-sound'
import KeySound from '../assets/keysound.mp3'
import FailSound from '../assets/failsound.mp3'
import WinSound from '../assets/winsound.mp3'

const KEY_POOL = ['q', 'w', 'e', 'a', 's', 'd']
const TEST_LENGTH = 7

const generateTest = () => {
    let test = [...Array(TEST_LENGTH)]
    test.forEach((_, i) => {
        const rng = Math.floor(Math.random()*KEY_POOL.length)
        test[i] = {letter:KEY_POOL[rng], state:'wait'}
    })
    test[0].state = 'current'
    return test
}

const useVykas = () => {
    const [keyTest, setKeyTest] = useState(generateTest()) //[{letter: 'd', state: 'correct'}, {letter: 'a', state: 'current'}, {letter: 'w', state: 'wait'}]
    const [keyIndex, setKeyIndex] = useState(0);
    const [hideTest, setHideTest] = useState('visable');
    const [hideTimer, setHideTimer] = useState(false)
    const [result, setResult] = useState('fail')
    const [disableKeydown, setDisableKeydown] = useState(false)
    const [timerEnd, setTimerEnd] = useState(Date.now()+4000)
    const [timer, setTimer] = useState(4)
    const [timeoutID, setTimeoutIDE] = useState()
    
    const [keySound] = useSound(KeySound)
    const [failSound] = useSound(FailSound)
    const [winSound] = useSound(WinSound)

    const resetKeyTest = () => {
        setKeyTest(generateTest())
        setKeyIndex(0)
    }

    const resetTimer = () =>{
        setTimerEnd(Date.now()+4000)
        setTimer(4)
    }

    const win = () =>{
        clearTimeout(timeoutID)
        setHideTimer(true)
        winSound()
        setResult('success')
        setHideTest('hidden')
        setDisableKeydown(true)
        resetKeyTest()
        setTimeout(() => {
            setHideTest('visable')
            setResult('fail')
            setDisableKeydown(false)
            resetTimer()
            setHideTimer(false)
        }, 1000)
    }

    const mistake = () => {
        setHideTest('hidden')
        failSound()
        setDisableKeydown(true)
        setTimeout(() => {
            setHideTest('visable')
            setDisableKeydown(false)
            resetKeyTest()
        }, 500)
    }

    const lose = () =>{
        setHideTimer(true)
        clearTimeout(timeoutID)
        setHideTest('hidden')
        failSound()
        setDisableKeydown(true)
        setTimeout(() => {
            setHideTest('visable')
            setDisableKeydown(false)
            resetKeyTest()
            resetTimer()
            setHideTimer(false)
        }, 500)
    }

    const handleKeydown = ({key,repeat}) => {
        if (!disableKeydown && !repeat && keyIndex<keyTest.length && /^[qweasd]$/.test(key)){
            if (key===keyTest[keyIndex].letter){
                setKeyTest((prev) => {
                    keySound()
                    let temp = prev
                    temp[keyIndex].state = 'correct'
                    return temp
                })
                setKeyIndex((prev) => {
                    if (prev === TEST_LENGTH-1){
                        win()
                        return 0
                    } else {
                        return prev+1
                    }
                })
            }
            else{
                mistake()
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(((timerEnd-Date.now())/1000).toFixed(1))
        }, 100)
        setTimeoutIDE(setTimeout(() => {
            lose()
        }, 4000))
        return () => clearInterval(interval)
        // eslint-disable-next-line
    }, [timerEnd])

    return {handleKeydown, generateTest, keyTest, keyIndex, hideTest, result, timer, hideTimer}
}

export default useVykas