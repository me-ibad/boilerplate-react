import React from "react";

function ChatGpt() {
  return (
    <>
    <div className="border-2 border-yellow-500 h-screen">
      <div className="flex flex-wrap justify-evenly items-center border-2 border-red-400 h-28">
        <div className="border-2 border-black px-4 py-4 rounded suggQuest-items">
          Criminal Law
        </div>
        <div className="border-2 border-black px-4 py-4 rounded suggQuest-items">
          Family Law
        </div>
        <div className="border-2 border-black px-4 py-4 rounded suggQuest-items">
          Employment Law
        </div>
        <div className="border-2 border-black px-4 py-4 rounded suggQuest-items">
          Person Injury{" "}
        </div>
        <div className="border-2 border-black px-4 py-4 rounded suggQuest-items">
          Real Estate{" "}
        </div>
      </div>

      <div className="askQuestion-wrapper mt-4 border-2 border-black rounded w-7/12  m-auto py-4 flex  items-center ">
        <div className=" w-10/12 ">
          <p className="text-center">
            Ask a question question about Criminal Law{" "}
          </p>
        </div>
        <div className=" w-2/12 flex justify-end pr-2">
          <i class="fas fa-comment-dots text-2xl "></i>
        </div>
      </div>
      {/* chat area */}
      <div className="my-4 chatArea-wrapper border-2 border-gray-400 w-6/12 m-auto  h-56 overflow-y-auto text-left p-2">
     <div className="mt-1  flex justify-evenly items-center">
  <i class="fas fa-robot"></i>
      <p className="bg-gray-500 text-white w-10/12  rounded p-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vero!</p>
      <i class="far fa-copy"></i>
      </div>
      <div className="mt-1  flex justify-evenly items-center">
      <i class="far fa-user"></i>
      <p className="bg-blue-500 text-white   rounded  p-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vero!</p>
      <i class="far fa-copy"></i>
      </div>
      <div className="mt-1 flex justify-evenly items-center">
  <i class="fas fa-robot"></i>
      <p className="bg-gray-500 text-white   rounded  p-1 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vero!</p>
      <i class="far fa-copy"></i>
      </div>
      <div className="mt-1  flex justify-evenly items-center">
      <i class="far fa-user"></i>
      <p className="bg-blue-500 text-white   rounded  p-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vero!</p>
      <i class="far fa-copy"></i>
      </div>
      <div className="mt-1 flex justify-evenly items-center">
  <i class="fas fa-robot"></i>
      <p className="bg-gray-500 text-white   rounded  p-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vero!</p>
      <i class="far fa-copy"></i>
      </div>
      <div className="mt-1  flex justify-evenly items-center">
      <i class="far fa-user"></i>
      <p className="bg-blue-500 text-white   rounded  p-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vero!
      </p>
      <i class="far fa-copy"></i>
      </div>
      </div>


      {/* chat input */}
      <div className="chatInput-wrapper   w-8/12 m-auto flex items-center mt-2 ">
        <input
          type="text"
          className="border-2 border-black rounded w-full py-4 text-center"
          placeholder="Continue Conversation "
        />
        <span className="">
          <i class="fas fa-comment-dots text-2xl relative right-12"></i>
        </span>
        <i class="fas fa-bookmark  text-2xl"></i>
        <i class="fas fa-file-export ml-2 text-2xl"></i>
      </div>
      </div>
    </>
  );
}

export default ChatGpt;
