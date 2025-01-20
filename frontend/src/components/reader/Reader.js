import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

const ReaderComponent = ({ lang = "en-En" }) => {
  const [language, setLanguage] = useState("en-En");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const changeLang = (e) => {
    setLanguage(e.target.value);
    setText("");
    setMessage("");
  };

  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setText(text + " " + result);
    },
  });

  const list = () => {
    if (listening) {
      stop(); // Stop if already listening
      // setText("");
    } else {
      // setText("");
      listen({ lang: language }); // Start listening
    }
  };

  const speakLanguages = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = language;
    synth.speak(utterance);
    console.log("lang =", language);
  };

  return (
    <>
      <div className="ReaderComponent">
        <h3>ReaderComponent</h3>
        <p>current language: {language}</p>
        <p>
          lang:{" "}
          <select name="lang" onChange={(e) => changeLang(e)}>
            <option value="en-EN">English</option>
            <option value="de-DE">German</option>
            <option value="pl-PL">Polish</option>
            <option value="fr-FR">French</option>
            <option value="it-IT">Italian</option>
            <option value="pt-PT">Portuguese</option>
            <option value="zh-CN">Chinese</option>
            <option value="ja-JP">Japanese</option>
          </select>
          <span>
            <button onClick={() => message !== "" && speakLanguages()}>
              Speak{" "}
            </button>
          </span>
        </p>
        <article>
          <section>
            <textarea
              cols={61}
              rows={12}
              value={text}
              onClick={() => setText("")}
              onChange={(event) => setText(event.target.value)}
            />
            <button onMouseDown={list} onMouseUp={stop}>
              🎤<span>Record</span>
            </button>
            {listening && <div>Go ahead I'm listening</div>}
          </section>
          <section>
            <h3>Message</h3>
            <div className="message">
              <button onClick={() => setMessage(message.concat(text + "."))}>
                Add to Message
              </button>
              <textarea
                cols={61}
                rows={12}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          </section>
        </article>
      </div>
    </>
  );
};

export default ReaderComponent;
