import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import './cars.css';
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import Cards from "../../commonComponent/cards/cards";


const Cars: React.FC = () => {
    return (
        <div className="container-fluid full-container">
            <div className="contents">
                <div className="row">
                    <div className="col-4" style={{padding:'12px'}}>
                        <div className="left-contents">
                            <div className="row d-flex flex-column justify-content-center align-items-center">
                                <div className="col-12">
                                    <p className="font-text">Sort by Price :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        <Button style={{height: '36px', width:'10rem'}}>
                                            <BiSortUp className="me-1" /> Low to High
                                        </Button>
                                        <Button className="ms-2">
                                            High to Low <BiSortDown className="ms-1" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Rating :</p>
                                    <div className="d-flex flex-column justify-content-start align-items-start">
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">sort by Category :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        <div>
                                            <Button variant="link">
                                                hello
                                            </Button>
                                            <Button variant="link">
                                                hello
                                            </Button>
                                            <Button variant="link">
                                                hello
                                            </Button>
                                            <Button variant="link">
                                                hello
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Brand :</p>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex justify-content-start align-items-start">
                                                <Button variant="light" style={{width: "25%"}}>
                                                    Dodge
                                                </Button>
                                                <Button variant="light ms-3" style={{width: "25%"}}>
                                                    Dodge
                                                </Button>
                                                <Button variant="light ms-3" style={{width: "25%"}}>
                                                    Dodge
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Seats :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        <div>
                                            <Button className="me-2" variant="light">
                                                1 Seater
                                            </Button>
                                            <Button className="me-2" variant="light">
                                                2 Seater
                                            </Button>
                                            <Button variant="light">
                                                3 Seater
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="rightSide-content">
                                <div className="col-11">
                                    <div className="right-top-contents d-flex justify-content-center align-items-center">
                                        <div className="col-2 d-flex justify-content-center">
                                            <input type="date" />
                                        </div>
                                        <div className="col-2 d-flex justify-content-center">
                                            <input type="date" />
                                        </div>
                                        <div className="col-1 d-flex justify-content-center">
                                            <input type="time" />
                                        </div>
                                        <div className="col-1 d-flex justify-content-center">
                                            <input type="time" />
                                        </div>
                                        <div className="col-3 d-flex justify-content-center">
                                            <input type="text" style={{width:'120px'}} placeholder="select Starting"/>                                        </div>
                                        <div className="col-1 d-flex justify-content-center">
                                            <input type="text" style={{width:'120px'}} placeholder="select ending"/>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 mt-4">
                                    <h5>Cars</h5>
                                    <div className="right-bottom-contents">
                                        {/* <Cards/> */}
                                        <h1> hello</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cars;
