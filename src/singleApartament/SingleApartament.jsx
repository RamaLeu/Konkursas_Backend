import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import { getDatabase, ref, set, get, child} from "firebase/database";
const SingleApartament = () => {

    let {id} = useParams();
    const [apartament, setApartament] = useState({});
    const [reservation_id, setResId] = useState(0);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState(0);
    const [message, setMessage] = useState(0);
    const [errors, setErrors] = useState([]);

    let tempErrors = [];


    const dbRef = ref(getDatabase());
    const db = getDatabase();
    let readData = async () => {
        get(child(dbRef, `apartaments/${id}/`)).then((snapshot) => {
          if (snapshot.exists()) {
            setApartament(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }


      let readLatestResId = async () => {
    
        const dbRef = ref(getDatabase());
        get(child(dbRef, `reservations/`)).then((snapshot) => {
          if (snapshot.exists()) {
            setResId(snapshot.val().length);
          } else {
            setResId(0);
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }

    readLatestResId();

    function handleSubmit(event){
        if(first_name.length <3 ||first_name.length>60 || last_name.length <3 || last_name.length > 60 ||email.length <3 || email.length>255||message.length>5000||phone.length <6 || phone.length >20){
            tempErrors.push("neteisingai ivesti duomenys!!")
            setErrors(tempErrors)
            event.preventDefault();

        }
        else{
            writeData();
    }
    }


    function writeData(){
        
        set(ref(db, 'reservations/' + reservation_id), {
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            message: message
          });
          
      }

    readData()
            return (
                <div className="reservationScreen">
                    <ul>
                        <li>Reservation for : {apartament.name}</li>
                        <li>Price: {apartament.price}€</li>
                    </ul>
                    <h4>Enter your info below</h4>
                    <ul>
                        <li>{errors}</li>
                    </ul>
                    <form id="butoForma" onSubmit={handleSubmit} action={"/success"}>
                        <input type="text" id="first_name" placeholder="Vardas" onChange={(e) => {
                            setFirstName(e.target.value)}} required/>
                        <input type="text" id="last_name" placeholder="Pavarde" onChange={(e) => {
                            setLastName(e.target.value)}} required/>
                        <input type="number" id="phone" placeholder="Tel. numeris" onChange={(e) => {
                            setPhone(e.target.value)}} required/>
                        <input type="email" id="email" placeholder="El. pastas" onChange={(e) => {
                            setEmail(e.target.value)}} required/>
                        <input type="text" id="message" placeholder="Palikite zinute!" onChange={(e) => {
                            setMessage(e.target.value)}} />
                        <input type="submit" value="Irasyti"/>
                        </form>
                </div>
            )
}

export default SingleApartament
