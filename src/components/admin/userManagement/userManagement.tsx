import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaInfoCircle, FaLock, FaTrash, FaUnlock } from "react-icons/fa";
import { getAllUsers, blockUnblockUser, findOneUser} from "../../../features/axios/api/admin/adminUser";
import { userAdminInterface, userInterface } from "../../../types/userInterface";
import { confirmAlert } from "react-confirm-alert";
import { block, unBlock } from "../../../features/axios/redux/slices/user/BlockUnblockuser";
import { useDispatch } from "react-redux";
import './userManagement.css'
import { toast } from "react-toastify";

const UserManagement = ()=>{

    const dispatch = useDispatch()
    const [userData, setUserData] = useState<userAdminInterface[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<userInterface | null>(null)

    useEffect(()=>{
        getAllUsers()
        .then((response)=>{
            console.log("response data :", response.users)
            setUserData(response.users)
        })
        .catch((error:any)=>{
            console.log(error.message)
        })
    },[])
    
    const handleBlock = (e:React.FormEvent ,userId: string, Username:string, status: boolean | undefined)=>{
        e.preventDefault()
        let actions = status ? block(userId) : unBlock(userId)
        confirmAlert({
            title: (status === true) ? 'Blocking User': 'Unblocking user',
            message:`Are you sure you want to ${status ? 'block':'unblock'} ${Username}`,
            buttons:[
                {
                    label:'Yes',
                    onClick : async()=>{
                        try 
                        {
                            console.log("userId : ", userId);
                            const response = await blockUnblockUser(userId);
                            console.log(response);
                            setUserData((prevData) =>
                            prevData.map((user) =>
                            user._id.toString() === userId ? { ...user, isActive: !status } : user
                             ));
                            dispatch(actions)
                            toast.success(`User ${Username} has been ${status ? 'blocked' : 'unblocked'}`);
                        } 
                          catch (error:any) 
                        {
                            console.error(error);
                            toast.error(error.message)                            
                        }
                    }
                },
                {
                    label:'No',
                    onClick: ()=>{
                        console.log(status ? 'block cancelled' : 'Unblock cancelled')
                    },
                }
            ]
        })
    }

    const handleInfo = async(e:React.FormEvent, userId: string)=>{
        e.preventDefault()
        findOneUser(userId)
        .then((response)=>{
            console.log(response.user)
            setSelectedUser(response.user)
            setShowModal(true)
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    return(
        <div className="addUser-body">
            <h1 className="mb-5">User Management</h1>
            <Table responsive bordered striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>email</th>
                        <th>Mobile</th>
                        <th>Profile Picture</th>
                        <th>status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            userData.map((user, index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile ? user.mobile : <span className="text-danger">Mobile not given</span>}</td>
                                    <td>{user.profilePic && typeof user.profilePic === 'string' ?
                                    <img
                                    src={user.profilePic}
                                    alt={`Profile of ${user.name}`}
                                    style={{ maxWidth: "50px", maxHeight: "50px" }}/>
                                    : <span className="text-danger">Profile picture not updated</span>}</td>
                                    <td>{user.isActive ? 'Active' : 'Blocked'}</td>
                                    <td>
                                        <Button size="sm" variant={user.isActive ? "danger" : "success"} onClick={(e) => handleBlock(e, user._id.toString(), user.name, user.isActive)}>
                                            {user.isActive ? <FaLock/> : <FaUnlock/>} {user.isActive ? 'Block' : 'Unblock'}
                                        </Button>
                                        {' '}
                                        <Button size="sm" variant="success" onClick={(e)=>handleInfo(e,user._id.toString())}>
                                        <FaInfoCircle/> Info
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
                <Modal show={showModal} onHide={()=>setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {
                            selectedUser?.profilePic ? 
                            ( <img
                            src={selectedUser.profilePic}
                            alt={`Profile of ${selectedUser.name}`}
                            style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50%" }}/>):
                            (
                                <img
                                  src="https://via.placeholder.com/100?text=User"
                                  alt="Default Profile"
                                  style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50%" }}
                                />
                              )
                        }
                        <div>
                         <h4>{selectedUser?.name ?? <span style={{ color: 'red' }}>Not given</span>}</h4>
                         <p>Email: {selectedUser?.email ?? <span style={{ color: 'red' }}>Not given</span>}</p>
                         <p>Mobile: {selectedUser?.mobile ?? <span style={{ color: 'red' }}>Not given</span>}</p>
                         <p>Date Of Birth: {selectedUser?.DOB?.toLocaleDateString() ?? <span style={{ color: 'red' }}>DOB not given</span>}</p>
                         <p>Address:</p>
                         {selectedUser?.address ? (
                            <>
                            {selectedUser.address}
                            </>
                        ) : (
                        <p style={{ color: 'red' }}>Address not given</p>
                        )}
                        </div>


                    </Modal.Body>
                </Modal>
            </Table>
        </div>
    )
}

export default UserManagement