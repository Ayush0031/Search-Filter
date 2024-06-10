import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Cards from '../components/Cards'

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
        <div className="container" style={{display:"flex"}}>
        {
            data.map((d)=>{
                return <Cards data={d} key={d._id}  />
            })
        }
        </div>
        
   </>
  )
}
