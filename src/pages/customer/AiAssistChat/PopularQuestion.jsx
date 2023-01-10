import React from "react";

function PopularQuestion({ chatHandler }) {
  return (
    <>
      <section className=" Section-popular flex justify-center items-center">
        <div className="h-fit legalAssitHeading  ">
          <h1 className="text-center text-3xl  font-bold ">Legal -Assist .AI</h1>
        
        <div className="pquestion-wrapper mt-8  flex flex-wrap  justify-evenly ">
          {/* Legal Question  */}

          <div className="legalitems w-3/12 ">
            <div className="legalQuestionIcons">
              <div className=" flex justify-center  ">
                <i class="fas fa-balance-scale font-bold text-4xl"></i>
              </div>
              <h4 className="text-center font-bold text-xl">Legal Questions</h4>
            </div>
            <div className="legal-Question-wrapper ">
            <div className="question-items  bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className=" ">How do I file for divorce?</p>
                </div>
                <div className=" w-1/12 h-12 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>

            <div className="question-items    bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className="  ">
                    What are my rights as <br /> an employee
                  </p>
                </div>
                <div className=" w-1/12 h-12 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>
            <div className="question-items    bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className=" ">
                    how do I create a will?
                  </p>
                </div>
                <div className=" w-1/12 h-14 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>
            </div>
          </div>
          {/* Legal Research  */}
          <div className="legalitems w-3/12 ">
            <div className="legalQuestionIcons">
              <div className=" flex justify-center  ">
                <i class="fas fa-balance-scale font-bold text-4xl"></i>
              </div>
              <h4 className="text-center font-bold text-xl">Legal research</h4>
            </div>
            <div className="legal-Research-wrapper">
            <div className=" question-items bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className=" ">How does Technology affect privacy law?</p>
                </div>
                <div className=" w-1/12 h-12 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>

            <div className="question-items    bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className="  ">
                    Is there racial bias in the Criminal justice system?
                  </p>
                </div>
                <div className=" w-1/12 h-12 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>
            <div className="question-items    bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className=" ">
                    what is relationship between corporate social 
                  </p>
                </div>
                <div className=" w-1/12 h-14 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>
            </div>
          </div>
          {/* Search Case Law */}

          <div className= "w-3/12 legalitems">
            <div className="legalQuestionIcons">
              <div className=" flex justify-center  ">
                <i class="fas fa-balance-scale-right text-4xl"></i>
              </div>
              <h4 className="text-center font-bold text-xl">Search Case Law</h4>
            </div>
            <div className="searchCaseLaw-wrapper ">
            <div className="question-items bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className="  ">United States v. Nixon</p>
                </div>
                <div className=" w-1/12 h-12 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>

            <div className="question-items    bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className="  ">Miranda v. Arizona</p>
                </div>
                <div className=" w-1/12 h-12 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>
            <div className="question-items    bg-gray-200 h-fit rounded">
              <div className=" flex w-full h-full">
                <div className="QuestionText border-2  w-10/12">
                  <p className="  ">Brown v. Board of Education</p>
                </div>
                <div className=" w-1/12 h-12 flex items-end  ">
                  <i class="fa-solid fa-arrow-right relative "></i>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        
        </div>
      </section>
    </>
  );
}

export default PopularQuestion;
