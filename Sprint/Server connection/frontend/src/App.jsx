import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((res) => {
        setJokes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <h1>Paras Vishwakarma</h1>
      <p>JOKES: {jokes.length}</p>
      <div>
        {jokes.map((joke, index) => {
          return(<div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.description}</p>
          </div>)})}
      </div>
    </>
  );
}

export default App;
