import React, { useState, useEffect, useRef } from 'react';
import gsap from "gsap";
import '../style/portfolio.scss';
import reiralogo from "../img/Reira_fuji.jpeg"
import rehome from "../img/rehome.jpeg"
import maskfinder from "../img/maskfinder.PNG"
import mysystem from "../img/mysystem.jpg"
import covid19 from "../img/covid-19.jpg"
 

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



  return (
    <div>
      <svg id="icons" xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-arrow" viewBox="0 0 476.213 476.213">
          <polygon fill="inherit" points="347.5,324.393 253.353,418.541 253.353,0 223.353,0 223.353,419.033 128.713,324.393 107.5,345.607 
    238.107,476.213 368.713,345.606 " />
        </symbol>
      </svg>


      <div className="slider-content">

        <div className="header-wrapper">
          {/* <div className="logo">Reira</div> */}
    
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
                    I built the web design project over the period of two years on HTML5, CSS3, Javascript, jQuery and React JS
                    and to implement user interface design principles on website design.
                  </p>
                </div>
              </div>
              <div className="slide-content img">
                <img src={reiralogo} alt="" />
              </div>
            </div>

            <div className="slide" data-order="2" ref={addNewRef} >
              <div className="slide-content txt">
                <div className="txt-wrapper">
                  <span className="copy">Show with me</span>
                  <h2>Mask Finder 口罩地圖</h2>
                  <div className="excerpt">
                    <h5>功能</h5>
                    <ul>
                      <li>取得使用者的位置資訊</li>
                      <li>重新定位功能</li>
                      <li>縣市／鄉鎮市區／篩選功能實作</li>
                      <li>依計算距離並排序</li>
                      <li>收藏藥局功能實作及個人日期記錄</li>
                      <li>RWD 響應式網頁</li>
                    </ul>

                    <h5>使用技術</h5>
                    <ul>
                      <li>Leaflet.js與OpenStreetMap建立地圖資料</li>
                      <li>Leaflet.markerClusterGroup群集化資料</li>
                      <li>Geolocation取得使用者的位置資訊</li>
                      <li>Promise非同步串接 API / JSON integration</li>
                      <li>localstorge收藏藥局資訊 / 個人日期記錄備註</li>
                      <li>vanilla javascript</li>

                    </ul>
                  </div>
                  <button onClick={() => openInNewTab('https://reiracode.github.io/Mask_Finder/')}>
                    Link
                  </button>
                </div>
              </div>
              <div className="slide-content img">
                <img src={maskfinder} alt="" />
              </div>
            </div>

            <div className="slide" data-order="3" ref={addNewRef}>
              <div className="slide-content txt">
                <div className="txt-wrapper">
                  <span className="copy">Show with me</span>
                  <h2>Rehome 傢飾電商系統</h2>
                  <div className="excerpt">
                    <h5>功能</h5>
                    <ul>
                      <li>animation design : SVG landing Page / 商品頁切換 / 購物車 </li>
                      <li>查詢商品 / tags分類</li>
                      <li>隨機商品推薦 / 商品頁面 / 商品細節頁</li>
                      <li>加入購物車 / 登入會員 / 結帳</li>
                    </ul>
      
                  <h5>使用技術</h5>
                    <ul>
                      <li>plugin:
                        jQeury / gsap / locomotive-scroll / splitting /
                        swiper / simplePagination/ TwCitySelector
                      </li>
                      <li>Axios串接API / JSON integration</li>
                      <li>webpack 模組化</li>
                      <li>使用localstorge管理購物車狀態</li>
                      <li>free api模擬實務串接 / JSON integration</li>
                      <li>API設計 後端php / nodejs</li>
                    </ul>
                  </div>
                  <button onClick={() => openInNewTab('https://reiracode.github.io/webpack_rehome/')}>
                    Link
                  </button>
                </div>
              </div>
              <div className="slide-content img">
                <img src={rehome} alt="" />
              </div>
            </div>



            <div className="slide" data-order="4" ref={addNewRef}>
              <div className="slide-content txt">
                <div className="txt-wrapper">
                  <span className="copy">Show with me</span>
                  <h2>e-Signature system</h2> 
                  <div className="excerpt">
                    <h5>功能</h5>
                    <ul>
                      <li>登入 / 登出 / 註冊</li>
                      <li>CRUD功能 : 請購單及採購單勾稽請購資料</li>
                      <li>送出表單</li>
                      <li>解析簽核流程</li>
                      <li>RWD 響應式網頁</li>
                    </ul>

                    <h5>使用技術</h5>
                    <ul>
                      <li>react react-dom / private route</li>
                      <li>react-table</li>
                      <li>props:parent to child | child to parent的傳遞與dom的設計</li>
                      <li>State Management : 員工編號及部門 createContext / useContext / useReducer</li>
                      <li>Axios 串接 free API / API data integration</li>
                    </ul>
                  </div>
                  <button onClick={() => openInNewTab('https://reiracode.github.io/Mysystem/login')}>
                    Link
                  </button>
                </div>
              </div>
              <div className="slide-content img">
                <img src={mysystem} alt="" />
              </div>
            </div>

            <div className="slide" data-order="5" ref={addNewRef}>
              <div className="slide-content txt">
                <div className="txt-wrapper">
                  <span className="copy">Show with me</span>
                  <h2>Covid-19 dashboard</h2>
                  <div className="excerpt">
                    <h5>功能</h5>
                    <ul>
                      <li>台灣本土地理分佈圖</li>
                      <li>本土病例分佈</li>
                      <li>Number of newly confirmed cases(Date)</li>
                      <li>每日各縣市新增病例趨勢圖</li>
                      <li>每日新增本土病例趨勢圖</li>
                    </ul>

                    <h5>使用技術</h5>
                    <ul>
                      <li>vanilla javascript</li>
                      <li>TopoJSON</li>
                      <li>C3.js</li>
                      <li>API json / JSON integration</li>
                    </ul>
                  </div>
                  <button onClick={() => openInNewTab('https://reiracode.github.io/covid19_dashboard/')}>
                    Link
                  </button>

                </div>
              </div>
              <div className="slide-content img">          
                <img src={covid19} alt="" />
              </div>
            </div>

            
            <div className="slide" data-order="6" ref={addNewRef}>
              <div className="slide-content txt">
                <div className="txt-wrapper">
                  <span className="copy">Contact me</span>
                  <p><strong>Email : </strong><a href="mailto:reira.lin@gmail.com">reira.lin@gmail.com</a></p>

                  <p><strong>Github : </strong><a onClick={() => openInNewTab('https://github.com/Reiracode')}>
                    https://github.com/Reiracode
                  </a></p>
                  
                </div>
            
              </div>
              <div className="slide-content img">
                <img src="https://images.unsplash.com/photo-1534415378365-701353a65fed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI4fHxidWlsZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>

  );
}

export default Resume;