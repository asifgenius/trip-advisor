import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import ShowTransport from '../ShowTransport/ShowTransport';
import './Home.css'
import Data from '../../fake api/Data';
const Home = () => {
    const [transport, setTransport] = useState([]);
    useEffect(() => {
        setTransport(Data);
    },[transport])
    return (
        <div className="home-div">
           <div className="container">
                <div className="row">
                   {
                       transport.map(vehicle => 
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <ShowTransport vehicle = {vehicle} key = {transport.id}></ShowTransport>
                        </div>
                        )
                   }
                </div>
           </div>
        </div>
    );
};

export default Home;