import logo from './logo.svg';
import './App.css';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useRef, useEffect} from 'react';

gsap.registerPlugin(ScrollTrigger); //very important to not forget!!

function App() {
  const imgRef = useRef(null);
  useEffect(() => {
    const elem = imgRef.current;
    gsap.fromTo(elem, {rotation: 0, x: -400}, {rotation: 180, duration: 3, x: 400,
      scrollTrigger: {
        trigger: elem,
        // start: '20px 80%',
        toggleActions: "restart pause resume pause"
        // what happens when it appears on screen, what happens when offscreen, what happens
        // when back onscreen, scroll all the way back from the start
      }
   })
  }, [])

  return (
    <div className="App">
      <div className="helper"></div>

      <img src={logo} className="App-logo" alt="logo" ref={imgRef} />

      <div className="helper"></div>
    </div>
  );
}

export default App;
