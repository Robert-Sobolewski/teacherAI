import logo from "./logo.svg";
import "./App.css";
import Counter from "./components/counter/Counter";
import Reader from "./components/reader/Reader";
import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";

function App() {
  const fetchData = async () => {
    const response = await fetch("http://localhost:8081/hello", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => setData(d.msg))
      .catch((error) => console.error("Error:", error)); //'https://jsonplaceholder.typicode.com/posts');
    // const data = await response.json();
    // return data;
  };
  const [data, setData] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="App">
        <h2>Teacher AI</h2>
        <p>Data: {data && data}</p>
        {/* <Counter /> */}
        <Chat />
        <section>{/* <Reader /> */}</section>
      </div>
    </>
  );
}

export default App;
