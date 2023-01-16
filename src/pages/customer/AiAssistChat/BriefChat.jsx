import React from "react";

function BriefChat() {
  return (
    <>
    <section className="breifChatContainer    flex justify-center items-center h-96">
           <div className="breifChatbox  w-8/12 ">
        <div className="BreifChatHeadingBox py-2 md:w-7/12 m-auto rounded-xl">
          <h4 className="text-center md:text-2xl text-white font-bold">Briefcase: Organize your Chats</h4>
        </div>
        <div className="FolderWrapper md:flex justify-center justify-evenly   w-full m-auto">
          <div className="folderitems">
            <p>Folder 1</p>
            <i class="fa-regular fa-folder"></i>
          </div>
          <div className="folderitems">
            <p>Folder 2</p>
            <i class="fa-regular fa-folder"></i>
          </div>
          <div className="folderitems">
            <p>Folder 3</p>
            <i class="fa-regular fa-folder"></i>
          </div>
          <div className="briefChatBtnWrapper  flex items-center">
            <button className="breifChatbtn text-white px-5 py-2 rounded-xl md:mt-8">
              Create New <i class="fa-regular fa-square-plus text-black"></i>
            </button>
          </div>
        </div>
      </div>
      </section>
 
    </>
  );
}

export default BriefChat;
