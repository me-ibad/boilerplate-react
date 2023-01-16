import React from "react";
import { useState } from "react";

function SummarizaDoc() {
    const [file, setFile] = useState(null);
  const [label, setLabel] = useState("Upload PDF");
const handleChange = (e) => {
    setFile(e.target.files[0]);
    setLabel(e.target.files[0].name);
  };
  return (
    <>
      <section className=" summarizeWrapper h-96 flex justify-center items-center">
        <div className="w-11/12 m-auto">
          <div className="summarizeChatHeadingBox  py-2 md:w-8/12 m-auto rounded-xl">
            <h4 className="text-center md:text-2xl text-white font-bold">
              Summarize Legal Documents Chats
            </h4>
          </div>
          <div className="pdfTextbtn-wrapper flex justify-between items-center md:w-7/12 m-auto  h-64">
            <div className="uploadPdf-wrapper  w-5/12 h-48">
              <div className="pdfIcon flex justify-center">
                <i class="fa-solid fa-file-pdf text-7xl"></i>
              </div>
              <div className=" h-24 flex items-end">
                <label className="bg-gray-200 w-full py-2 rounded-xl font-bold text-center">
                {label}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>
            <div className="pasteText-wrapper  w-5/12 h-48">
              <div className="pdfIcon flex justify-center">
                <i class="fa-solid fa-paste text-7xl"></i>
              </div>
              <div className="  pasteTextBtn h-24  flex items-end">
                <button className="bg-gray-200 w-full py-2 rounded-xl font-bold">
                  Paste Text
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}

export default SummarizaDoc;
