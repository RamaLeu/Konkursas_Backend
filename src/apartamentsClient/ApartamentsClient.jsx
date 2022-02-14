import React, { useState }  from 'react'
import { getDatabase, ref,get, child} from "firebase/database";
import {
    Link
  } from "react-router-dom";


const ApartamentsClient = (props) => {
    const [apartData, setApartData] = useState([])

    const dbRef = ref(getDatabase());
    let readData = async () => {
        get(child(dbRef, `apartaments/`)).then((snapshot) => {
          if (snapshot.exists()) {
            setApartData(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    readData()
    return (
        <div>
           <table>
               <tbody>
                   <tr>
                       <th>
                           #
                       </th>
                       <th>
                           Name
                       </th>
                       <th>
                           Location
                       </th>
                       <th>
                           Floors
                       </th>
                       <th>
                           Bedrooms
                       </th>
                       <th>
                           Bathrooms
                       </th>
                       <th>
                           Living spaces
                       </th>
                       <th>
                           Car spaces
                       </th>
                       <th>
                           Area
                       </th>
                       <th>
                           Price
                       </th>
                   </tr>
                        {apartData.map((item, index) =>{
                            return <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.name}</td>
                                    <td>{item.location}</td>
                                    <td>{item.floors}</td>
                                    <td>{item.bedrooms}</td>
                                    <td>{item.bathrooms}</td>
                                    <td>{item.living_spaces}</td>
                                    <td>{item.car_spaces}</td>
                                    <td>{item.area}</td>
                                    <td>{item.price}€</td>
                                    {item.status ==="available" ? <td className="greenBg">Laisvas</td>: <td className="redBg">Rezervuotas</td>}
                                    {index!==0 && item.status==="available"?<td><Link to={"/apartaments/" + index + "/reserve"} href={"/apartaments/" + index + "/reserve"} className="button">Reservuoti</Link></td>: <td></td>}
                                    </tr>
                        })}
               
               </tbody>
            </table> 
        </div>
    )
}

export default ApartamentsClient
