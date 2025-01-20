import React, { useState } from "react";
import "./Chat.css";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("en-EN");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setText(result);
    },
  });

  const getLanguageLabel = (languageCode) => {
    let languageLabel;
    switch (languageCode) {
      case "en-EN":
        languageLabel = "English";
        break;
      case "de-DE":
        languageLabel = "German";
        break;
      case "pl-PL":
        languageLabel = "Polish";
        break;
      default:
        break;
    }
    return languageLabel;
  };

  const handleSend = async () => {
    if (text.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text },
      ]);
      setText("");
      setIsBotTyping(true);
      // console.log("user -- ", text);
      // Make API call to /chat endpoint
      const response = await fetch("http://localhost:8081/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: getLanguageLabel(language), // Extract language code
          level: "beginner", // Example level, can be modified
          userPrompt: text,
        }),
      });

      const data = await response.json();
      const botMessage = data.response;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botMessage },
      ]);
      setIsBotTyping(false);

      // Speak the last bot message
      // handle send
      // console.log("from handle-send lang: ", language);
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(botMessage);
      utterance.lang = language;
      synth.speak(utterance);
      // speak({ lang: language, text: botMessage });
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleListen = () => {
    if (listening) {
      stop();
    } else {
      listen({ lang: language });
    }
  };

  return (
    <>
      <div>
        <h3>Chat</h3>
        <div className="chat-container">
          <div className="chat-body">
            <ul>
              {messages
                .slice()
                .reverse()
                .map((msg, index) => (
                  <li key={index} className={`chat-${msg.sender}`}>
                    {msg.text}
                  </li>
                ))}
            </ul>
            {isBotTyping && <div className="bot-typing">Bot is typing...</div>}
          </div>
          <div className="chat-footer">
            <select value={language} onChange={handleLanguageChange}>
              <option value="en-EN">English</option>
              <option value="de-DE">German</option>
              <option value="fr-FR">French</option>
              <option value="es-ES">Spanish</option>
              <option value="it-IT">Italian</option>
              <option value="ru-RU">Russian</option>
              <option value="cs-CZ">Czech</option>
              <option value="pl-PL">Polish</option>
              <option value="tr-TR">Turkish</option>
              <option value="ja-JP">Japanese</option>
              <option value="ko-KR">Korean</option>
              <option value="ceb-PH">Cebuano</option>
              <option value="tl-PH">Tagalog</option>
            </select>
            <button onClick={handleListen}>
              {listening ? "Stop" : "🎤 Start Listening"}
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
