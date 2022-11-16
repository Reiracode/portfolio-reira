import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Resume from './views/resume';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter basename="portfolio-reira">
    {/* <BrowserRouter>     */}
    <Routes>
      <Route index element={<Resume />} />
      {/* <Route path='/Resume' element={<Resume />} /> */}
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
