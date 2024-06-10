import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
export default function Home() {
    const [data,setData]=useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const data = await axios.get("http://localhost:5001/api/v1/products/all");
            setData(data.data);
        };
        fetchData();
    },[])
  return (
   <>
        <Header/>
   
   </>
  )
}
