import React from "react";
import { useState } from "react";

function ChatBox({suggestChat,messages}) {
 

  return (
    <>
      {/* Suggested Question */}

      {/* Chat Area */}

      <div className=" chatArea-wrapper flex items-center">
        <div className="chatBox-item border-2 border-gray-400 w-11/12 overflow-y-auto   m-auto text-left p-2">
          <div className="robotMessage-wrapper my-4 w-7/12  flex  items-center">
            <ul className="">
              <li className="userMessage m-2 flex items-center">
                <i class="fas fa-robot mr-1"></i>
                <p className="bg-gray-200  rounded p-1">
                  {suggestChat ? `${suggestChat}` : "I am Robot"}
                </p>
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

      {/* Input  */}
     
    </>
  );
}

export default ChatBox;
