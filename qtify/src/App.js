// import logo from './logo.svg';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import { Card } from "./components/Card/Card";
import pic from "./assets/pic.png";
import Section from "./components/Section/Section";
// import Logo from "./components/Logo/Logo";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Section />
      {/* <Card title="Card Title" followers={100} imageUrl={pic} /> */}
    </div>
  );
}

export default App;


  