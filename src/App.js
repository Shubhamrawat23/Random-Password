import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  let [length,setLength] = useState(8);
  let [password,setPassword] = useState("")
  let [number,setNumber] = useState(false);
  let [character,setCharcter] = useState(false)

  /* ---------------- Method 1 ---------------------
  useEffect(()=>{
    let string = "ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz"
    let passvalue = ""
    if(number===true) string+="0123456789"
    if(character===true) string+="!@#$%^&*().{}~"
    for(let i =0;i<length;i++){
      let char = Math.floor(Math.random()*string.length)
      passvalue +=string.charAt(char);
    }
    setPassword(passvalue)
  },[length,number,character,setPassword])
*/

  // ---------------   Method 2   --------------------

  let createPass = useCallback(() => {          //usecCallback Hook is used memoized or optimized the function and kept it in cached memory.It helps to use less meomry, decreased the CPU run time.
    let string = "ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz"
    let passvalue = ""
    if (number === true) string += "0123456789"
    if (character === true) string += "!@#$%^&*().{}~"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length)
      passvalue += string.charAt(char);
    }
    setPassword(passvalue)
  }, [length, number, character,setPassword])// So useCallback's dependensies are stored in cache, used to optimsize the function if any changes occur in the dependensy.

  useEffect(()=>createPass(),[length,number,character,createPass])// On other hand useEffect hook is used to re-run the codes if any changes occur in their dependencies.



  

  const passRef = useRef();
  const CopyPass = useCallback(()=>{
    passRef.current.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <>
      <h1>Password Generator</h1>
      <div id="passField">
        <div>
          <input type="text" placeholder="Password" className="textfield" value={password}  readOnly ref={passRef}/>
          <button id="copybtn"  onClick={CopyPass}>Copy</button>
        </div>
        <div>
          <input type='range' min={6} max={25} value={length} id='rangeset' onChange={(e)=>setLength(e.target.value)}/>
          <label id='length'>Length: {length}</label>

          <input type='checkbox'id='box1' onClick={()=>setNumber(!number)}/>
          <label id='number' htmlFor='box1'>Number</label>
          
          <input type='checkbox' id='box2' onClick={()=>setCharcter(!character)}/>
          <label id='character' htmlFor='box2'>Character</label>
        </div>
      </div>
    </>
  )
}

export default App;
