import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PopularQuestion from "./PopularQuestion";
import ChatBox from "./ChatBox";
import axios from "axios";

function ChatSideBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  let totalChatArray = [];

  // DropDown Topics

  // Chat
  const [isChat, setNewChat] = useState(false);

  const chatHandler = () => {
    setNewChat(true);
    setChatScreen(true);
  };
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isQuestion, isSetQuestion] = useState('');
  const [chatScreen, setChatScreen] = useState(false);

  const onType = (e) => {
    setNewMessage(e.target.value);
    // setAllMessages((prevState) => ({ ...prevState, body: e.target.value}));
  };
 
  function onQuestionChange(event) {
   
  
    console.log(isQuestion,'IsQuestion-------')
    setMessages([
      ...messages,
      {
        body: event.target.value,
        time: '2:14 AM',
        isUser: true,
      },
    ]);
    
     CallAPI(event.target.value);
     setChatScreen(true);
  };


  const onClickEnter = async (event) => {
    setChatScreen(true);
    setMessages([
      ...messages,
      {
        body: newMessage,
        time: '2:10 AM',
        isUser: true,
      },
    ]);
    setNewMessage('');

     CallAPI(newMessage);
  };

  //   setChatScreen(true);
  //   setNewMessage("");

  // };

  const CallAPI = async (newMessage1,isQuestion1) => {
    const url = 'https://gpt.encodersoft.co/ask';
    const body = {
      query: newMessage1?newMessage1:isQuestion1,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(url, body, options);
      // setResponseData(data);

     //// setNewMessage('');
      setMessages([
        ...messages,

        {
          body: newMessage1,
          time: '2:10 AM',
          isUser: true,
        },
        {
          body: data.data,
          time: '2:13 AM',
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <>
      <div className='HomeScreenParentWrapper  h-screen'>
        {/* hamburger */}
        <div className='hamBurger w-2/12 flex justify-end items-center '>
          <button
            className='cursor-pointer ml-2  md:hidden text-2xl'
            type='button'
            onClick={toggleMenu}
          >
            <i className='fas fa-bars '></i>
          </button>
        </div>

        <div className='sideBar-Content-Container flex border-green-500'>
          <div
            className={`sideBarWrapper w-2/12 bg-gray-400 md:block ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            {/* side bar social navItems */}

            <div className='navItems-wrapper  h-fit flex justify-center items-center'>
              <div>
                <h4 className='text-white text-center'>Legal -Assist .AI</h4>
                <ul className='navItems '>
                  <li className='homeItem'>Home</li>
                  <li>Briefcase</li>
                  <li>Summarize</li>
                  <li>Disclaimer</li>
                  <li>Disclaimer</li>
                </ul>
              </div>
            </div>
            {/* Sidebar Social icons */}
            <div className='iconsWrapper  flex items-end h-56   '>
              <div className='social-icons w-full  text-white flex justify-evenly'>
                <i class='fab fa-linkedin'></i>
                <i class='fab fa-twitter-square'></i>
                <i class='fab fa-instagram'></i>
                <i class='fab fa-telegram'></i>
                <i class='fab fa-android'></i>
              </div>
            </div>
          </div>
          {/* Chat Screen */}
          <div className='chatQuestion w-full'>
            <div className='PopquestionContainer  w-100'>
              {chatScreen || isQuestion ? (
                <ChatBox
                  isQuestion={isQuestion}
                  messages={messages}
                 
                />
              ) : (
                <PopularQuestion chatHandler={chatHandler} />
              )}
            </div>

            <div className='input-suggest-wrapper  flex items-center'>
              <div className='chatSuggQuestWrapper  w-3/12  flex justify-center items-center'>
                <select
                  name='cars'
                  id='cars'
                  className='dropdown-items  rounded p-3 w-full text-center'
                  onChange={onQuestionChange}
                >
                  <option value='' className='text-gray-300' disabled selected>
                    Practice Area
                  </option>
                  <option
                    className='dropdownColor'
                    value='Ask a question question about Family Law'
                  >
                    Family Law
                  </option>
                  <option
                    className='dropdownColor'
                    value='Ask a question question about Business Law'
                  >
                    Business Law
                  </option>
                  <option
                    className='dropdownColor'
                    value='Ask a question question about Criminal Law'
                  >
                    Criminal Law
                  </option>
                  <option
                    className='dropdownColor'
                    value='Ask a question question about Civil Law'
                  >
                    Civil Law
                  </option>
                </select>
              </div>
              <div className='chatInput-wrapper ml-2 w-9/12  h-fit w-full flex  items-end  '>
                <div className='chatInputfield-item   w-11/12 h-fit flex items-center'>
                  <div className='input-field-item flex items-center border-2 border-black rounded w-full '>
                    <input
                      type='text'
                      className=' w-full py-2.5 px-2 focus:outline-none text-center'
                      placeholder='Continue Conversation '
                      onChange={onType}
                      value={newMessage}
                    />
                    <span className=''>
                      <i
                        class='fas fa-comment-dots text-2xl mr-4'
                        onClick={onClickEnter}
                      ></i>
                    </span>
                  </div>
                  <i class='fas fa-bookmark  text-2xl ml-2'></i>
                  <i class='fas fa-file-export ml-2 text-2xl'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatSideBar;
