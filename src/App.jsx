import React, { useState,useEffect } from 'react'
import Beep from './beep.wav'

const App = () => {
  const audio = document.getElementById('beep')
  const [session,setSession]=useState(25)
  const [brk,setBrk]=useState(5)
  const [current,setCurrent]=useState(25*60)
  const [on,setOn]=useState(false)
  const [first,setFirst]=useState(true)
  const [playing,setPlaying]=useState('Session')
  useEffect(() => {
      if(first){
        setCurrent(a => session*60)
      }
      let interval = null;
  
      if (on) {
        setFirst(a=>false)
        interval = setInterval(() => {
          if(playing==='Session'){{  
            setCurrent(a => {
              if (a === 0) {
                if (audio){
                  audio.currentTime = 0
                  audio.play()
                }
                setPlaying('Break');
                return brk*60;
              }
              return a - 1;
            })
          }}
          if(playing==='Break'){{  
            setCurrent(a => {
              if (a === 0) {
                if (audio){
                  audio.currentTime = 0
                  audio.play()
                }
                setPlaying('Session');
                return session*60;
              }
              return a - 1;
            })
          }}
        }, 1000)
      } else {
        clearInterval(interval)
      }
  
      return () => {
        clearInterval(interval)
      }
  }, [on])
  useEffect(()=>{},[session,])
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  const reset =()=>{
    setSession(a=>25)
    setBrk(a=>5)
    setCurrent(a=>25*60)
    setOn(a=>false)
    setFirst(a=>true)
    setPlaying(a=>'Session')
    if (audio){
      audio.pause();
      audio.currentTime = 0;
    }
  }
  return (
    <div className="clock">
      <audio src={Beep} id="beep"></audio>
      <div className="clockTitle"><h1>25 + 5 Clock</h1></div>
      <div className="controls">
        <div className="clockB">
        <div className="title"><h2 id="break-label">Break Length : </h2></div>
        <div className="more btn" onClick={()=>(brk!==60)?setBrk(a=>a+1):{}} id="break-increment">Add</div> 
        <div className="lenght" ><div id="break-length">{brk}</div> min </div>
        <div className="less btn" onClick={()=>(brk!==1)?setBrk(a=>a-1):{}} id="break-decrement">Shorten</div>
      </div>
      <div className="clockS">
        <div className="title"><h2 id="session-label">Session Length : </h2></div>
        <div className="more btn" onClick={()=>(session!==60)?setSession(a=>a+1):{}} id="session-increment">Add</div> 
        <div className="lenght"><div id="session-length">{session}</div> min </div>
        <div className="less btn" onClick={()=>(session!==1)?setSession(a=>a-1):{}} id="session-decrement">Shorten</div> 
      </div>
      </div>
      <div className="doing">
        <div className="now">
          <h2  id="timer-label">{playing}</h2>
        </div>
        <div className="time">
          <h1 id="time-left">{!first&&formatTime(current)} {first&&<>--:--</>}</h1>
        </div>
        <div className="SS btn" onClick={()=>setOn(a=>!a)} id="start_stop">
          start/stop
        </div>
        <div className="reset btn" onClick={reset} id="reset">
          reset
        </div>
      </div>

    </div>
  )
}

export default App