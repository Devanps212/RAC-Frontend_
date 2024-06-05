import React from "react";
import './getInTouch.css'
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { BiSolidLocationPlus } from "react-icons/bi";
import { FaAt } from "react-icons/fa";
import { Button } from "react-bootstrap";


const GetInTouch = ()=>{
    return(
        <div className="container-fuid">
            <div className="row d-flex flex-column justify-content-center align-item-center">
                <div className="col-12">
                    <div className="UPR-img position-relative">
                        <img
                        src="https://res.cloudinary.com/dlkrxem40/image/upload/v1717214943/Assets/page%20banners/peakpx_2_c6g29i.jpg"
                        className="responsive-img"
                        alt="car Banner"/>
                        <div className="img-overlay"></div>
                        <div className="text-message-overlay"><h4 className="text-mess">Let's Talk</h4></div>
                    </div>
                </div>
                <div className="col-12 p-0 mx-0 py-0 full-col" style={{width:'100%', height:'100%'}}>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 col-md-6 column-1">
                            <div className="first-box">
                                <div>
                                    <h4>Meet Us</h4>
                                </div>
                                <div className="first-box-contens">
                                    <p><BsTelephoneFill/> +91 6756346789</p>
                                    <p><BiSolidLocationPlus/> 456, Sunshine Avenue, Mumbai, Maharashtra - 400001, India</p>
                                    <p><FaAt/>RENTACAR@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6  p-0 mx-0 py-0 column-2">
                            <div className="second-box">
                                <div className="second-box-contens">
                                    <h4>Pitch Us</h4>
                                    <textarea
                                    placeholder="write here"
                                    value={"ddscsd"}
                                    className="pitch-text"/>
                                </div>
                                <Button>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch