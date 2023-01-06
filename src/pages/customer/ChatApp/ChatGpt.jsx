import React, { useState, useEffect } from "react";

function ChatGpt() {
  const [text, setText] = useState("Ask a question question about...");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  //   const [allMessages,setAllMessages]=useState([
  // {
  //   body:"",
  //   time:"2:10 AM",
  //   isUser:true,
  // }
  // ,
  // {
  //   body:"I am fine ",
  //   time:"2:10 AM",
  //   isUser:false,
  // }

  //   ]);
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
  useEffect(() => {
    const handleKeyDown = event => {
      console.log('User pressed: ', event.key);

      if (event.key === 'Enter') {
        event.preventDefault();

        // 👇️ call submit function here
        onClickEnter();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // function handleKeyDown(event) {
  //   if (event.key === 'Enter') {
  //     onClickEnter();
  //   }
  // }
  // console.log(messages.isUser, "my messages are");
  // messages.map((message, index) => console.log(message.isUser, "user is"));
  // setState((prevState) => ({ ...prevState, privateData: "private"}));
  // useEffect(() => {
  //   const intervalId =
  // }, []);
  // setInterval(() => {
  //   setMessages([...messages, {
  //     body:"I am a boot",
  //     time:"2:10 AM",
  //     isUser:false,
  //    }]);
  // }, 10000);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMessages([...messages, {
  //        body:"I am a boot",
  //        time:"2:10 AM",
  //           isUser:false,
  //         }]);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <div className="h-screen mainScreen-wrapper">
        <div className="suggQuestBox-wrapper flex flex-wrap justify-evenly items-center h-24">
          <button
            className="border-2 border-black px-4 py-4 rounded suggQuest-items"
            onClick={() =>
              setText("Ask a question question about Criminal Law")
            }
          >
            Criminal Law
          </button>
          <button
            className="border-2 border-black px-4 py-4 rounded suggQuest-items cursor-pointer"
            onClick={() => setText("Ask a question question about  Family Law")}
          >
            Family Law
          </button>
          <button
            className="border-2 border-black px-4 py-4 rounded suggQuest-items"
            onClick={() =>
              setText("   Ask a question question about Employment Law")
            }
          >
            Employment Law
          </button>
          <button
            className="border-2 border-black px-4 py-4 rounded suggQuest-items"
            onClick={() =>
              setText("Ask a question question about Person Injury")
            }
          >
            Person Injury
          </button>
          <button
            className="border-2 border-black px-4 py-4 rounded suggQuest-items"
            onClick={() => setText("Ask a question question about Real Estate")}
          >
            Real Estate
          </button>
        </div>
        {/* question bars */}
        <div className="autoQuestBar-wrapper w-full h-20 flex justify-center">
          <div className="askQuestion-item border-2 border-black rounded w-7/12  m-auto py-4 flex  items-center ">
            <div className=" w-10/12 askQuestionText-wrapper ">
              <p className="text-center">{text}</p>
            </div>
            <div className=" w-2/12 flex justify-end pr-2 askQuestionIcon-wrapper">
              <i class="fas fa-comment-dots text-2xl "></i>
            </div>
          </div>
        </div>
        {/* chat area */}
        <div className=" chatArea-wrapper">
          <div className="chatBox-item border-2 border-gray-400 w-6/12 h-full m-auto overflow-y-auto text-left p-2">
          
          <div className="robotMessage-wrapper my-4  w-7/12  flex  items-center">
                  <ul className="">
                    <li className="userMessage  m-2 flex  items-center">
                      <i class="fas fa-robot mr-1"></i>
                      <p className="bg-gray-200  rounded p-1">
                       I am Robot
                      
                      </p>
                      <i class="far fa-copy ml-1"></i>
                    </li>
                  </ul>
                </div>
                <div className=" flex justify-end my-3 ">
                  <div className="userMessage-wrapper w-7/12 ">
                    
            {messages.map((message, index) =>
              message.isUser ? (
                <ul className=" ">
                      <li className=" userMessage  m-2  flex justify-end items-center">
                        <i class="far fa-user mr-2"></i>
                        <p className="truncate max-w-xl whitespace-pre-wrap bg-blue-500 text-white rounded  p-1">
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

        {/* chat input */}
        <div className=" chatInput-wrapper h-20 w-full flex justify-center items-end  ">
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
      </div>
    </>
  );
}

export default ChatGpt;
