import React from "react";
import { useState } from "react";
function HomeScreen() {
  // DropDown Topics
  const [selectedValue, setSelectedValue] = useState("");
  function onQuestionChange(event) {
    setSelectedValue(event.target.value);
  }

  // Chat
  const [text, setText] = useState("Ask a question question about...");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const onType = (e) => {
    setNewMessage(e.target.value);
    // setAllMessages((prevState) => ({ ...prevState, body: e.target.value}));
  };
  const onClickEnter = (event) => {
    event.preventDefault();
    setMessages([
      ...messages,
      {
        body: newMessage,
        time: "2:10 AM",
        isUser: true,
      },
    ]);
    setNewMessage("");
  };
  // start conversation click
  const [newChat, setNewChat] = useState("");
  const onStartConvo = () => {
    setNewChat("con");
  };
  const [suggestChat, setSuggChat] = useState("");

 const onClickChatBtn =() => {
    setSuggChat("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum");
  console.log("Button clicked")
  };
  return (
    <>
      <div className="homeScreenChatWrapper">
        {/* Robot Message */}

        <div className="robotMessageWrapper  flex h-fit w-6/12  m-auto">
          <div className="robotIcon   w-4/12 flex justify-end h-fit">
            <i class="fab fa-reddit-alien bg-yellow-500 p-4 text-3xl rounded-xl "></i>
          </div>
          <div className="robotMessage bg-gray-100 px-2 py-2 rounded-xl  w-6/12 ml-3">
            <p>
              Hi Dima,
              <br />
              Hope your day is going great.
              <br />
              I am paul,Attic Bot.
              <br />
              Ask me anything or share your feedback
            </p>
          </div>
        </div>
        {/* Suggested Question */}
        <div className="chatSuggQuestWrapper w-6/12 m-auto flex justify-center items-center">
          <select
            name="cars"
            id="cars"
            className="dropdown-items border-2 border-black rounded p-3 w-full text-center"
            onChange={onQuestionChange}
          >
            <option value="" disabled selected>
              Suggested Questions
            </option>
            <option value=" Ask a question question about Criminal Law">
              Criminal Law
            </option>
            <option value=" Ask a question question about Family Law">
            
              Family Law
            </option>
            <option value=" Ask a question question about Employment Law">
              
              Employment Law
            </option>
            <option value="  Ask a question question about Person Injury">
              
              Person Injury
            </option>
            <option value=" Ask a question question about  Real Estate">
              
              Real Estate
            </option>
          </select>
        </div>
        {/* Chat Area */}

        <div className=" chatArea-wrapper  h-fit ">
          <div className="chatBox-item border-2 border-gray-400 w-6/12 overflow-y-auto h-64   m-auto text-left p-2">
            <div className="robotMessage-wrapper my-4 w-7/12  flex  items-center">
              <ul className="">
                <li className="userMessage m-2 flex items-center">
                  <i class="fas fa-robot mr-1"></i>
                  <p className="bg-gray-200  rounded p-1">
                    {suggestChat?`${selectedValue}`:"I am Robot"}</p>
                  <i class="far fa-copy ml-1"></i>
                </li>
              </ul>
            </div>
            <div className=" flex justify-end my-3">
              <div className="userMessage-wrapper w-7/12 ">
                {messages.map((message, index) =>
                  message.isUser ? (
                    <ul className="w-full">
                      <li className=" userMessage  m-2  flex justify-end items-center">
                        <i class="far fa-user mr-2"></i>
                        <p className=" break-all bg-blue-500 text-white rounded  p-1">
                        {message.body}
                        </p>
                        <i class="far fa-copy ml-2"></i>
                      </li>
                    </ul>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Start Conversation */}
        {!newChat ? (
          <div className="ConvoWrapper  w-4/12 m-auto flex justify-center items-end">
            <div className="convo-item w-full flex justify-center py-3 rounded ">
              <button className="text-white" onClick={onStartConvo}>
                <i class="fas fa-comment-dots mr-2 "></i>Start a conversation
              </button>
            </div>
          </div>
        ) : (
          <div className="chatInput-wrapper w-6/12 m-auto h-fit w-full flex justify-center items-end  ">
            <div className="chatInputfield-item   w-8/12 h-fit flex items-center">
              <div className="flex items-center border-2 border-black rounded w-full ">
                <input
                  type="text"
                  className=" w-full py-3 px-2 focus:outline-none text-center"
                  placeholder="Continue Conversation "
                  onChange={onType}
                  value={newMessage}
                />
                <span className="">
                  <i
                    class="fas fa-comment-dots text-2xl mr-4"
                    onClick={onClickEnter}
                  ></i>
                </span>
              </div>
              <i class="fas fa-bookmark  text-2xl ml-2"></i>
              <i class="fas fa-file-export ml-2 text-2xl"></i>
            </div>
          </div>
        )}

        {/* Questions */}
        {selectedValue ? (
          <div className="askQuestionWrapper rounded w-4/12 m-auto 0  border-2 border-black py-2 px-1">
            {/* <div className=' w-full flex justify-center py-3 border-2 border-black rounded '>
          </div> */}
            <p className="text-center cursor-pointer"
             onClick={onClickChatBtn}
            >{selectedValue}</p>
          </div>
        ) : null}
        {/* All conversation */}
        <div className="allConvobtn-wrapper w-4/12 m-auto flex justify-center ">
          <button className=""
         
          >
            <span className="allConvoText">See all your conversation</span>{" "}
            <i class="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
