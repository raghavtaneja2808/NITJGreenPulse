import React from "react";

import Navbar from "../components/Navbar";
import MainLandingPage from "../components/MainLanding";


const LandingPage = () => {
    return (

        <>
<div className="relative min-h-screen overflow-hidden bg-white">
        <Navbar/>

        <MainLandingPage />
        </div>

        </>

    )
};

export default LandingPage;