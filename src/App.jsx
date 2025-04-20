import { useEffect, useState } from 'react'
import * as webllm from "@mlc-ai/web-llm";
import "./App.css"


function App() {
  const [count, setCount] = useState(0)
  const [messages, setMessages] = useState([{
    role:'model',
    content: "Hello, how can I help you?"
  },{
    role:'user',
    content:"How are you"
  },{
    role:'model',
    content:"Iam fine, thank you"
  },{
    role:'user',
    content:"Your Name?"
  },{
    role:'model',
    content:"Rajesh Lal!"
  }])

  const [engine,setEngine] = useState(null)

  useEffect(()=>{
    const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

    webllm.CreateMLCEngine(
      selectedModel,{
      initProgressCallback : (initProgress)=>{
        console.log("initProgress",initProgress)
      }
    }).then(engine=>{
      setEngine(engine)
    })
  },[]);  

  return (
    <main>
      <section>
        <div className='conversation-area'>

        <div className="messages">
          {
          messages.map((messages,index) =>{
            return(
              <div className={`message ${messages.role}`} key={index}>
                {messages.content}
              </div>
            )
          })
      }</div>

          <div className='input-area'>
            <input className='inner-input' type="text" placeholder='Message LLm' />
            <button className='send-btn'>Send</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App

