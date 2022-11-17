import React, { useState, useEffect, useRef } from 'react';
import gsap from "gsap";
import '../style/portfolio.scss';
import reiralogo from "../img/reira3.jpeg"

// import rehome from "../img/rehome.jpeg"
// import maskfinder from "../img/maskfinder.png"
// import mysystem from "../img/mysystem.jpg"
// import covid19 from "../img/covid-19.jpg"
// import ubike from "../img/ubike.jpg"
// import Slidejson from './Slidejson'
import resumedata from "../data/resumedata.json";

function Resume() {
  // 預設false，前一頁就是true
  const slidelen = document.querySelectorAll(".slide").length;
  const page_num = document.querySelector('.number-count')
  const [slide, setSlide] = useState(1);
  const [active, setActive] = useState(false);
  const tl = useRef();
  const el = useRef();
  //------------create an array of refs
  const addArrayRef = useRef([]);
  addArrayRef.current = [];
  const addNewRef = (el) => {
    if (el && !addArrayRef.current.includes(el)) {
      addArrayRef.current.push(el);
    }
  };

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  //------------
  // 前一頁
  const navup = () => {
    setActive(true);
    setSlide(slide - 1);
  }
  // 下一頁
  const navdown = () => {
    setActive(false);
    setSlide(slide + 1);
  }

  function creatPrePanel() {
    console.log(slide)
    addArrayRef.current.forEach(box => {
      box.classList.remove('active');
    });
    addArrayRef.current[slide - 1].classList.add('active');

    if (active && slide < slidelen) {
      //本頁
      const y = gsap.utils.selector(addArrayRef.current[slide]);
      //前一頁
      const z = gsap.utils.selector(addArrayRef.current[slide - 1])

      if (slide % 2 == 0) {
        addArrayRef.current[slide] = gsap
          .timeline()
          .to(page_num, { x: '-100%', duration: 0.3 })
          .to(y(".txt"), { y: '-100%', duration: 0.4, delay: 0.15 })
          .to(y(".img"), { y: '100%', duration: 0.4, delay: 0.15 })

      } else {
        addArrayRef.current[slide] = gsap
          .timeline()
          .to(page_num, { x: '0%', duration: 0.3 })
          .to(y(".txt"), { y: '100%', duration: 0.4, delay: 0.15 })
          .to(y(".img"), { y: '-100%', duration: 0.4, delay: 0.15 })
      }

      addArrayRef.current[slide] = gsap
        .timeline()
        .to(z(".copy"), { autoAlpha: 1, duration: 0.3, delay: 0.5 })
        .to(z(".txt"), { y: '0%', duration: 0.4, delay: 0.15 })
        .to(z(".img"), { y: '0%', duration: 0.4, delay: 0.15 })
    }
  }

  function createNextPanel() {
    console.log(slide)
    addArrayRef.current.forEach(box => {
      box.classList.remove('active');
    });
    addArrayRef.current[slide - 1].classList.add('active');
    // const tl = gsap.timeline();
    //return tl.play(); //very important that the timeline gets returned
    //下一頁

    if (!active && slide > 1) {
      //slide =2  defalt:1 第一頁，所以click之後，slide=2 第二頁
      const y = gsap.utils.selector(addArrayRef.current[slide - 2]);
      const z = gsap.utils.selector(addArrayRef.current[slide - 1])
      console.log("next-slide" + slide)

      // 偶數頁
      if (slide % 2 == 0) {
        addArrayRef.current[slide - 1] = gsap
          .timeline()
          .to(page_num, { x: '-100%', duration: 0.3 })
          .to(y(".txt"), { y: '-100%', duration: 0.4, delay: 0.15 })
          .to(y(".img"), { y: '100%', duration: 0.4, delay: 0.15 })
      } else {
        // 單數頁
        addArrayRef.current[slide - 1] = gsap
          .timeline()
          .to(page_num, { x: '0%', duration: 0.3 })
          .to(y(".txt"), { y: '100%', duration: 0.4, delay: 0.15 })
          .to(y(".img"), { y: '-100%', duration: 0.4, delay: 0.15 })
      }

      addArrayRef.current[slide] = gsap
        .timeline()
        .to(z(".copy"), { autoAlpha: 1, duration: 0.5, delay: 0.5 })
        .to(z(".txt"), { y: '0%', duration: 0.4, delay: 0.15 })
        .to(z(".img"), { y: '0%', duration: 0.4, delay: 0.15 })

    }
  }


  const btn_nav = useRef();
  const ex = gsap.utils.selector(btn_nav);

  function showNav() {
    if (slide == slidelen) {
      ex.current = gsap
        .timeline()
        .to(ex(".nav-down"),
          { autoAlpha: 0, delay: 0.5, duration: 0.2 })
    } else {
      ex.current = gsap
        .timeline()
        .to(ex(".nav-down"),
          { autoAlpha: 1, delay: 0.5, duration: 0.2 })
    }

    if (slide == 1) {
      el.current = gsap
        .timeline()
        .to(ex(".nav-up"),
          { autoAlpha: 0, delay: 0.5, duration: 0.2 })
    } else {
      el.current = gsap
        .timeline()
        .to(ex(".nav-up"),
          { autoAlpha: 1, delay: 0.5, duration: 0.2 })
    }
  }



  //清楚useEffect return 執行時機
  useEffect(() => {
    showNav();
    console.log("這頁數" + slide + "----前一頁:" + active) //new
    addArrayRef.current.forEach((tl, i) => {
      console.log(tl)
      console.log(i)
    })
    console.log(addArrayRef.current)

    //slide 1to 5
    //[slide-1] []
    tl.current = gsap
      .to(addArrayRef.current,
        { paused: true });

    //下一頁
    if (!active && slide > 1) {
      createNextPanel()
    }

    //前一頁
    if (active && slide < slidelen) {
      creatPrePanel()
    }

  });

   
  const [resumeData, setResumeData] = useState(resumedata)
  // useEffect(() => {
  //   fetch("./resume.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setResumeData(data);
  //     },
  //       (error) => {
  //         // setIsLoaded(true);
  //         // setError(error);
  //       })
  // }, []);

  function Slidejson() {
    return (
      <>
        {resumeData.map((item,index) => {
          return <div className="slide" data-order={index + 1} key={ index+ 1} ref={addNewRef} >
              <div className="slide-content txt">
                <div className="txt-wrapper">
                  <span className="copy">Show with me</span>
                <h2>{item.project_name+item.title}</h2>
                  <div className="excerpt">
                    <h5>功能</h5>
                    <ul>
                    {item.desc.map((item, i) => (
                      <li key={i}>{item}  </li>
                    ))}
                  
                    </ul>

                    <h5>使用技術</h5>
                    <ul>
                    {item.tech.map((item, i) => (
                      <li key={i}>{item}  </li>
                    ))}

                    </ul>
                  </div>
                <button onClick={() => openInNewTab(`${item.url}`)}>
                    Link
                  </button>
                </div>
              </div>
              <div className="slide-content img">
              {/* <img src={item.cover} alt="" /> */}
              {/* <img src={process.env.PUBLIC_URL + "/maskfinder.png"} alt="" />  */}
              <img src={process.env.PUBLIC_URL + '/img/'+ item.cover} alt="" /> 

              
              {/* {"cover": "maskfinder.png",} */}
              {/* <img src={`./assets/imag/${item.cover}`} alt="" /> */}
              {/* <img src={require('../assets/img/'+item.cover)} alt="" /> */}
              </div>
            </div>
          
        })}
      </>
    )

  }



  return (
  <div>
      < svg id = "icons" xmlns = "http://www.w3.org/2000/svg" >
    <symbol id="icon-arrow" viewBox="0 0 476.213 476.213">
      <polygon fill="inherit" points="347.5,324.393 253.353,418.541 253.353,0 223.353,0 223.353,419.033 128.713,324.393 107.5,345.607 
    238.107,476.213 368.713,345.606 " />
    </symbol>
      </svg >


    <div className="slider-content">

      <div className="header-wrapper">
        <div className="logo">
          <a href="https://reiracode.github.io/portfolio-reira/">Reira</a>
        </div>

      </div>

      <div className="number-wrapper">
        <div className="number-count">
          0{slide}
        </div>
      </div>

      <div className="nav-wrapper" ref={btn_nav}>
        <div className="nav-arrows">

          <div className="nav-up" onClick={navup}>
            <svg id="arrow-up">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </div>
          <div className="nav-line"></div>
          <div className="nav-down" onClick={navdown}>
            <svg id="arrow-down">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </div>
        </div>
      </div>

      <div className="slider-wrapper">
        <div className="slider-container">
          <div className="slide active" data-order="1" ref={addNewRef}   >
            <div className="slide-content txt">
              <div className="txt-wrapper">
                <span className="copy intro">Intro about me</span>
                <h2><span>Hello!</span> I'm Reira</h2>

                <span className="subtitle">Front-End Developer</span>
                <span className="subtitle">Web developer</span>

                <p className="excerpt">
                  My interests are in Front End Engineering,
                  and I love to create beautiful and performant products with delightful user experiences.
                </p>

                <p className="excerpt">
                  I built the web design project over the period of two years on HTML5, CSS, SCSS, Javascript, jQuery and React JS
                  and to implement user interface design principles on website design.
                </p>
              </div>
            </div>
            <div className="slide-content img">
              <img src={reiralogo} alt="" />
            </div>
          </div>
          <Slidejson />

          <div className="slide" data-order="7" ref={addNewRef}>
            <div className="slide-content txt">
              <div className="txt-wrapper">
                <span className="copy">Contact me</span>
                <p><strong>Email : </strong><a href="mailto:reira.lin@gmail.com">reira.lin@gmail.com</a></p>
                <p><strong>Github : </strong><a onClick={() => openInNewTab('https://github.com/Reiracode')}>reiracode</a></p>

              </div>

            </div>
            <div className="slide-content img">
              <img src="https://images.unsplash.com/photo-1534415378365-701353a65fed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI4fHxidWlsZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>



    </div > 
  )
}

export default Resume;