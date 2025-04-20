import { useEffect, useState } from "react";
import * as webllm from "@mlc-ai/web-llm";
import "./app.css";

function App() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello, how can I help you?",
    },
  ]);

  const [engine, setEngine] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
    webllm.CreateMLCEngine(
      selectedModel,{
      initProgressCallback : (initProgress)=>{
        console.log("initProgress",initProgress)
      }
    }).then(engine=>{
      setEngine(engine)
    })
  }, []);

  // async function sendMessageToLlm(){
  //   const tempMessages = [...messages]
  //   tempMessages.push({
  //     role:'user',
  //     content: input
  //   })
  //   setMessages(tempMessages)
  //   setInput("")

  //   const reply = await engine.chat.completions.create({
  //     messages: tempMessages,
  //   });
  // }

  async function sendMessageToLlm() {
    const tempMessages = [...messages];

    tempMessages.push({
      role: "user",
      content: input,
    });

    setMessages(tempMessages);
    setInput("");

    await engine.chat.completions
      .create({
        messages: tempMessages,
      })
      .then((reply) => {
      const modelReply = reply.choices[0].message;
      tempMessages.push({
        role: modelReply.role, // Usually 'assistant'
        content: modelReply.content,
      });
      setMessages([...tempMessages]);
    });
  }

  return (
    <main>
      <section>
        <div className="conversation-area">
          <div className="messages">
            {messages
              .filter((message) => message.role !== "system")
              .map((messages, index) => {
                return (
                  <div className={`message ${messages.role}`} key={index}>
                    {messages.content}
                  </div>
                );
              })}
          </div>

          <div className="input-area">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessageToLlm();
                }
              }}
              className="inner-input"
              type="text"
              placeholder="Message LLm"
            />
            <button
              onClick={() => {
                sendMessageToLlm();
              }}
              className="send-btn"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
