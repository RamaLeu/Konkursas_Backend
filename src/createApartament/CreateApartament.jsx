import React, { useState } from 'react';
import { getDatabase, ref, set, get, child} from "firebase/database";



const CreateApartament = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [floor, setFloor] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [area, setArea] = useState(0);
    const [carSpaces, setCarSpaces] = useState(0);
    const [livingSpaces, setLivingSpaces] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState("available");
    const [dateSellFrom, setDateFrom] = useState("");
    const [dateSellTo, setDateTo] = useState("");
    const [errors, setErrors] = useState([])

    let tempErrors = []


    const firebaseConfig = {
    apiKey: "AIzaSyBFZMMduruYrE9TbyskryG1NQZ63mhstLo",
    authDomain: "butupardavimai-2b2ea.firebaseapp.com",
    projectId: "butupardavimai-2b2ea",
    storageBucket: "butupardavimai-2b2ea.appspot.com",
    databaseURL: "https://butupardavimai-2b2ea-default-rtdb.europe-west1.firebasedatabase.app",
    messagingSenderId: "686461585376",
    appId: "1:686461585376:web:219591aca7609188d8cd85"
    };

    const db = getDatabase();


    function handleSubmit(e){
        if(name.length > 255 ||location.length > 255 || floor<= 0||bedrooms<=0||carSpaces<=0|| livingSpaces<=0||bathrooms<=0||area<=0|| price<=0){
            tempErrors.push("neteisingai ivesti duomenys!!")
            setErrors(tempErrors)
            e.preventDefault();

        }
        else{
            writeUserData()
        }
    }


    let readLatestId = async () => {
    
        const dbRef = ref(getDatabase());
        get(child(dbRef, `apartaments/`)).then((snapshot) => {
          if (snapshot.exists()) {
            setId(snapshot.val().length);
          } else {
            setId(0);
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }

    readLatestId();
    function writeUserData() {
    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        set(ref(db, 'apartaments/' + id), {
          name: name,
          location: location,
          floor: floor,
          bedrooms: bedrooms,
          area: area,
          car_spaces: carSpaces,
          living_spaces: livingSpaces,
          bathrooms: bathrooms,
          price: price,
          status: status,
          date_sell_from: dateSellFrom,
          date_sell_to: dateSellTo,
          created_at: date,
          updated_at: date,
        });
      }

    return (
        <div>
            <ul>
                <li>{errors}</li>
            </ul>
            <form id="butoForma" onSubmit={handleSubmit} action="/Apartaments">
            <input type="text" id="name" placeholder="Name" onChange={(e) => {
                setName(e.target.value)}} required/>
            <input type="text" id="location" placeholder="Location" onChange={(e) => {
                setLocation(e.target.value)}} required/>
            <input type="number" id="floor" placeholder="Floor" onChange={(e) => {
                setFloor(e.target.value)}} required/>
            <input type="number" id="bedrooms" placeholder="Bedrooms" onChange={(e) => {
                setBedrooms(e.target.value)}} required/>
            <input type="number" id="car_spaces" placeholder="Car spaces" onChange={(e) => {
                setCarSpaces(e.target.value)}} required/>
            <input type="number" id="bathrooms" placeholder="Bathrooms" onChange={(e) => {
                setBathrooms(e.target.value)}}/>
            <input type="number" id="area" placeholder="Area" onChange={(e) => {
                setArea(e.target.value)}} required/>
            <input type="number" id="price" placeholder="Price(euro)" onChange={(e) => {
                setPrice(e.target.value)}} required/>
            <input type="number" id="living_spaces" placeholder="Living Spaces" onChange={(e) => {
                setLivingSpaces(e.target.value)}}/>
            <input type="date" id="date_sell_from" placeholder="Date selling from" onChange={(e) => {
                setDateFrom(e.target.value)}}/>
            <input type="date" id="date_sell_to" placeholder="Date selling to" onChange={(e) => {
                setDateTo(e.target.value)}}/>
            <select name="status" id="status" onChange={(e) => {
                console.log(e.target.value)
                setStatus(e.target.value)}}>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
            </select>
            <input type="submit" value="Irasyti"/>
            </form>
        </div>
    )
}

export default CreateApartament
