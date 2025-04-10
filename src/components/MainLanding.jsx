import React from "react";
import bgImg from "../assets/images/landing_page_background.jpg";
import section1bgImg from "../assets/images/7.png";
import section2bgImg from "../assets/images/10.png";
import card1Img from "../assets/images/11.png"
import card2Img from "../assets/images/12.png"
import card3Img from "../assets/images/13.png"


const MainLandingPage = () => {
    return (

        <>

            <div className="z-0  h-screen w-full bg-cover bg-center flex items-center justify-evenly" style={{ backgroundImage: `url(${bgImg})` }}>



                { /*  first section left container  */}
                <div className="overflow-hidden h-4/5 w-3/6  flex-col place-content-center  ">


                    <h3 className="z-0 my-5 font-bold text-logoGreen text-3xl flex place-content-end justify-end  ">Your Best Plant Care Application</h3>
                    <p className="z-0   text-black text-lg flex place-content-end justify-end">Experience the joy of thriving plants with Plantora -<br /> Your free plant identifier and best plant care app <br /> with plant diseases identification having a plant care guide</p>



                </div>




                { /*  first section right container  */}
                <div className=" my-20  right-0 flex-col place-self-start justify-center   h-4/5 w-3/6 bg-no-repeat rounded-lg bg-center"
                    style={{ backgroundImage: `url(${section1bgImg})` }}></div>



            </div>    { /* First Section */}



            <div className=" z-0  h-screen w-full bg-cover bg-center flex items-center justify-evenly" style={{ backgroundImage: `url(${bgImg})` }}>

                { /*  second section left container  */}
                <div className="  right-0 flex-col place-self-start justify-center h-full w-3/6 bg-no-repeat rounded-lg bg-center" style={{ backgroundImage: `url(${section2bgImg})` }}></div>



                { /*  second section right container  */}
                <div className="overflow-hidden h-4/5 w-3/6  flex-col place-content-center ">


                    <h3 className="z-0 my-5 font-bold text-logoGreen text-3xl flex place-content-start justify-start  ">About Us</h3>
                    <p className="z-0   text-black text-lg flex place-content-start justify-start">Green Pulse is an innovative AI-powered platform designed to
                        assist amateur <br /> farmers and gardeners in identifying plant
                        diseases with ease. By leveraging <br /> advanced image recognition
                        technology, our platform enables users to simply <br /> capture and
                        upload a photo of their plant to receive accurate disease
                        diagnoses<br /> along with expert-recommended solutions.

                        <br />

                        At Green Pulse, we are committed to fostering a greener future by
                        making plant<br /> care effortless, efficient, and data-driven. Whether
                        you are a home gardener or a<br /> small-scale farmer, our platform
                        provides the tools and knowledge needed to <br />safeguard plant
                        health and promote sustainable growth.

                    </p>



                </div>



            </div>    { /* Second Section */}




            <div className=" z-0  h-screen w-full bg-cover bg-center flex-col m-auto" style={{ backgroundImage: `url(${bgImg})` }}>



                <h3 className="text-4xl font-bold text-logoGreen  flex items-center justify-center my-16">GreenPulse Features</h3>



                <div className=" h-3/5 flex items-center justify-center">




                    <div className="p-2 overflow-hidden h-full w-1/5 mx-5 hover:shadow-md transition duration-100 ease-linear rounded-lg bg-card1bgcolor flex-col justify-evenly m-auto place-items-center">

                        <img
                            className="bg-no-repeat bg-center h-1/6 w-2/6 border-none outline-none shadow-none"
                            style={{
                                border: "none",
                                outline: "none",
                                boxShadow: "none"
                            }}
                            src={card1Img}
                            alt="Card 1"
                        />
                        <h6 className="font-bold text-xl text-logoGreen my-10 ">Plant Care Tips</h6>

                        <p className=" text-base text-wrap ">Our plant care app consists of tips or guides based on the specific needs of your plants. You can also refer to our plant guide which provides detailed information on everything from watering to lighting to plant diseases control.</p>

                    </div>

                    <div className="p-2 overflow-hidden h-full w-1/5 mx-5 hover:shadow-md transition duration-100 ease-linear rounded-lg bg-card2bgcolor flex-col justify-evenly m-auto place-items-center">

                        <img
                            className="bg-no-repeat bg-center h-1/6 w-2/6 border-none outline-none shadow-none"
                            style={{
                                border: "none",
                                outline: "none",
                                boxShadow: "none"
                            }}
                            src={card2Img}
                            alt="Card 2"
                        />
                        <h6 className="font-bold text-xl text-logoGreen my-10 ">Symptom Checker</h6>

                        <p className=" text-base text-wrap ">By using this free plant identifier app, you can find out which type of problems your plants are facing and find appropriate steps of plant care. This helps you to take better care of their plants and improve their overall plant health.</p>

                    </div>

                    <div className="p-2 overflow-hidden h-full w-1/5 mx-5 hover:shadow-md transition duration-100 ease-linear rounded-lg bg-card1bgcolor flex-col justify-evenly m-auto place-items-center">

                        <img
                            className="bg-no-repeat bg-center h-1/6 w-2/6 border-none outline-none shadow-none"
                            style={{
                                border: "none",
                                outline: "none",
                                boxShadow: "none"
                            }}
                            src={card3Img}
                            alt="Card 3"
                        />
                        <h6 className="font-bold text-xl text-logoGreen my-10 ">Plant Identification</h6>

                        <p className=" text-base text-wrap ">Do you have a plant but don't know its name or how to care for it? No problem! our app is the best plant identification app in the category. You can take a photo of the plant or upload a snapshot and easily identify plants with tremendous plant care tips specific to that plant.</p>

                    </div>




                </div>










            </div>    { /* Cards Section */}






            <div className=" z-0 flex items-center   h-screen w-full bg-cover bg-center flex-col m-auto" style={{ backgroundImage: `url(${bgImg})` }}>

                <div className="w-4/5 flex-wrap">


                    <h3 className="text-4xl font-bold text-logoGreen  flex items-center justify-center my-16">Blogs</h3>

                    <div className=" flex items-center justify-evenly">
                        {/* <BackgroundBlogCard />
                        <BackgroundBlogCard /> */}
                    </div>
                </div>

            </div>     { /* Blogs Section */}



        </>

    )
}

export default MainLandingPage;