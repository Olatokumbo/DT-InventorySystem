import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Requests.module.css";
import RequestCard from "../../components/RequestCard/RequestCard";
const Requests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getRequests = async () => {
      await axios.get("http://localhost:7000/requests")
      .then((receivedData) => {
          setRequests(receivedData.data); 
      });
    };
    getRequests();
  }, []);
  const removeCard = (id) =>{
    // console.log("REMOVE", id);
    // console.log(requests.filter((request)=>id!==request.id));
    setRequests((prevState)=>{
      return prevState.filter((data)=>(id!==data.id))
    })
  }
  return (<div className={style.main}>
    <div className={style.header}>
    <h2>Pending Requests</h2>
    </div>
    <div className={style.requests}>
    {requests.map((request)=> <RequestCard key={request.id} data={request} removeCard={removeCard}/>)}
    </div>
    </div>);
};

export default Requests;
