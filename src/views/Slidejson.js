import React from 'react'
const Slidejson = (props) => {
  console.log(props)
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
        {
        props.data.map(( item, index ) => (
          
            <div className="slide" data-order={index+2} key={index+2}   >
              <div className="slide-content txt">
                <div className="txt-wrapper">
                  <span className="copy">Show with me</span>
                  <h2>{item.title}</h2>
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
                  <button onClick={() => openInNewTab(`${item.url}`)}>
                    Link
                  </button>
                </div>
              </div>
              <div className="slide-content img">
                <img src={item.cover} alt="" />
              </div>
            </div>


            
            
          ))
        }
      {/* </ul> */}
    </>
  );
}

export default Slidejson;