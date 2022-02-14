import './App.css';
import CreateApartament from '../createApartament/CreateApartament';
import Apartaments from '../apartaments/Apartaments';
import React   from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import Footer from '../footer/Footer';
import ApartamentsClient from '../apartamentsClient/ApartamentsClient';
import SingleApartament from '../singleApartament/SingleApartament';
import Main from '../main/Main';






function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBFZMMduruYrE9TbyskryG1NQZ63mhstLo",
    authDomain: "butupardavimai-2b2ea.firebaseapp.com",
    projectId: "butupardavimai-2b2ea",
    storageBucket: "butupardavimai-2b2ea.appspot.com",
    databaseURL: "https://butupardavimai-2b2ea-default-rtdb.europe-west1.firebasedatabase.app",
    messagingSenderId: "686461585376",
    appId: "1:686461585376:web:219591aca7609188d8cd85"
    };

  const app = initializeApp(firebaseConfig);

  return (
    <div className="app">
    <Router>
      <div>
        <nav>
          <Link to="/">Butu rezervavimo sistema</Link>
          <ul>
            <li>
            <Link to="/">Pagrindinis Puslapis</Link>
            </li>
            <li>
            <Link to="/apartaments">Vadybininko zona</Link>
            </li>
            <li>
            <Link to="/apartaments/client">Kliento zona</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Main/>} >
          </Route>
          <Route path="/apartaments" element={<Apartaments />} >
          </Route>
          <Route path="/apartaments/client" element={<ApartamentsClient />} >
          </Route>
          <Route path="/apartaments/:id/reserve" element={<SingleApartament/>} >
          </Route>
          <Route path="/createApartament" element={<CreateApartament/>} >
          </Route>
          <Route path="/:success" element={<Main/>} >
          </Route>
        </Routes>
      </div>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
