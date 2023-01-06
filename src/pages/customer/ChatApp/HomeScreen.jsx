import React from 'react'

function HomeScreen() {
  return (
    <>
     <div className="homeScreenChatWrapper  h-screen flex items-center ">
        <div className="allContentWrapper w-full">
    {/* Robot Message */}

    <div className="robotMessageWrapper flex justify-evenly w-4/12  m-auto">
        <div className="robotIcon">
        <i class="fab fa-reddit-alien bg-yellow-500 p-4 text-4xl rounded-xl "></i>
        </div>
        <div className="robotMessage bg-gray-100 px-3 py-2 rounded-xl">
            <p>
            Hi Dima,<br />
            Hope your day is going great.<br />
            I am paul,Attic Bot.<br />
            Ask me anything or share your feedback
            </p>
        </div>
    </div>
    {/* Suggested Question */}
    <div className="chatSuggQuestWrapper  w-4/12 m-auto flex justify-center items-center" >

    <select name="cars" id="cars" className='dropdown-items border-2 border-black rounded p-3 w-full text-center'>
  <option value="" disabled selected>Suggested Questions</option>
  <option value="Criminal Lawab">Criminal Law</option>
  <option value="Family Law">  Family Law</option>
  <option value="Employment Law"> Employment Law</option>
  <option value="Person Injury"> Person Injury</option>
  <option value="Real Estate">   Real Estate</option>

</select>
    </div>
    {/* Start Conversation */}
    <div className='ConvoWrapper  w-4/12 m-auto 0 mt-2  flex justify-center items-end'>
            
        <div className='convo-item w-full flex justify-center py-3 rounded '>
<button className='text-white'><i class="fas fa-comment-dots mr-2 "></i>Start a conversation</button>
        </div>
    </div>
    {/* All conversation */}
    <div className="allConvobtn-wrapper w-4/12 m-auto flex justify-center ">
<button className=''><span className='allConvoText'>See all your conversation</span> <i class="fas fa-angle-right"></i></button>
    </div>
    </div>
        
        </div> 
    </>
  )
}

export default HomeScreen
