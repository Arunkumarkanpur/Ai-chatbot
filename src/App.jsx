import React, { useState } from 'react';
import "./App.css"
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from "react-icons/fa";
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from"@google/generative-ai";
const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]); 
  let allMessages = [];

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    }
    else {
      alert("You must write somthing... !")
    }
  };

  
  const generateResponse = async (msg) => {
    if (!msg) return;
    
    const genAI = new GoogleGenerativeAI("AIzaSyBjbZWo32aIh9aTqonMa6K_vo3Cw7FNSvM");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(msg);
console.log(result.response.text());

    
    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    
    setMessages(newMessages); // Append new messages to the existing ones
    setisResponseScreen(true);
    setMessage(""); // Clear the input field after sending the message
    console.log(result.response.text());
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]); // Clear the messages array
  }

  return (
    <>
      <div className="bg-blue-950 w-screen min-h-screen text-white">
        {
          isResponseScreen ?
            <div className='p-5'>
              <div className="max-w-screen-2xl container mx-auto px-2 md:px-20px md:pl-64 md:pr-64 h-16 shadow-md fixed justify-between top-0 left-0 right-0 z-50 flex items-center p-6 bg-gray-500">

                <div className='px-2 md:px-20px'>
              <button className='text-2xl bg-pink-500 rounded-full px-4 '>AssistMe</button>
              </div>
              <div className='px-2 md:px-20px'>
                <button id='newChatBtn' className='bg-pink-500  rounded-full cursor-pointer text-2xl px-4' onClick={newChat}>NewChat</button>
              </div>
              </div>

              <div className="messages mt-20 ">
              {
                messages?.map((msg, index) => {
                  return (
                    <div key={index} className={msg.type}>{msg.text}</div>
                  )
                })
              }
                {/* <div className="userMsg">You : What is the HTML stand for</div>
                <div className="responseMsg">HTML stand for Hyper Text Markup Language</div> */}
              </div>
            </div> :
            <div className=" h-[80vh] flex items-center flex-col justify-center">
              <h1 className='text-4xl px-1
              '>Welcome to my chatbot</h1>
              <div className="boxes mt-[30px] flex items-center gap-1 px-2">
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>What is coding ? <br />
                    How we can learn it.</p>

                  <i className=' absolute right-3 bottom-3 text-[18px]'><IoCodeSlash /></i>
                </div>
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>Which is the red <br />
                    planet of solar <br />
                    system </p>

                  <i className=' absolute right-3 bottom-3 text-[18px]'><BiPlanet /></i>
                </div>

                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>In which year python <br />
                    was invented ?</p>

                  <i className=' absolute right-3 bottom-3 text-[18px]'><FaPython /></i>
                </div>

                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>How we can use <br />
                    the AI for adopt ?</p>

                  <i className=' absolute right-3 bottom-3 text-[18px]'><TbMessageChatbot /></i>
                </div>
              </div>
            </div>
        }


        <div className="bottom w-[100%] flex flex-col items-center">
          <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className='p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' placeholder='Write your message here...' id='messageBox' />
            {
              message == "" ? "" : <i className='text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>
            }
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
