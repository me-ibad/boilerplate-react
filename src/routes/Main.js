import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Landingpage from 'pages/customer/Landingpage';
import ChatGpt from 'pages/customer/ChatApp/ChatGpt';
import HomeScreen from 'pages/customer/ChatApp/HomeScreen';
import ChatSideBar from 'pages/customer/AiAssistChat/ChatSideBar';
import PopularQuestion from 'pages/customer/AiAssistChat/PopularQuestion';
import BriefChat from 'pages/customer/AiAssistChat/BriefChat';
import SummarizaDoc from 'pages/customer/AiAssistChat/SummarizaDoc';


function Main() {
  return (
    <>
      <main>
        <section className=' '>
          <Routes>
            <Route path='/landingPage' element={<Landingpage />} />
            <Route path='/ChatGpt' element={<ChatGpt />} />
            <Route path='/HomeScreen' element={<HomeScreen />} />
            <Route path='/' element={<ChatSideBar />} />
            <Route path='/PopularQuestion' element={<PopularQuestion />} />
            <Route path='/BriefChat' element={<BriefChat />} />
            <Route path='/SummarizaDoc' element={<SummarizaDoc/>} />
     
        
        
            
          </Routes>
        </section>
      </main>
    </>
  );
}

export default Main;
