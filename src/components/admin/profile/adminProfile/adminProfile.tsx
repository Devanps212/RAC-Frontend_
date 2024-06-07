import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import userDetailForm, { onSubmitType } from '../../../../Validators/adminValidator';
import { tokenInterface } from '../../../../types/payloadInterface';
import { RootState } from '../../../../features/axios/redux/reducers/reducer';
import { findOneAdmin, updateAdmin } from '../../../../features/axios/api/admin/adminAuthentication';
import { userAdminInterface } from '../../../../types/userInterface';
import EditProfileAdmin from '../editProfile/editProfile';
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';
import './adminProfile.css';

const AdminProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const adminToken = useSelector((root: RootState) => root.adminToken.adminToken) ?? '';
    const decode: tokenInterface = jwtDecode(adminToken);
    const adminId = decode.payload;
    const [adminDetails, setAdminDetails] = useState<userAdminInterface>({
        _id: adminId,
        name: '',
        email: '',
        profilePic: '',
        mobile: 0
    });

    useEffect(() => {
        const findAdmin = async () => {
            try {
                const response = await findOneAdmin(adminId);
                setAdminDetails(response);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        findAdmin();
    }, [adminId]);

    const handleSubmit: onSubmitType = async (values, { setSubmitting }) => {
        try {
            const updatedAdmin = await updateAdmin(values);
            setAdminDetails(updatedAdmin);
            setIsEditing(false);
            toast.success('Admin profile updated successfully');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                if(!adminDetails.name){
                    toast.warning('Please update the profile details before updating the profile picture.')
                    return
                }
                const formData = new FormData();
                formData.append('_id', adminId);
                formData.append('name', adminDetails.name); 
                formData.append('profilePic', e.target.files[0]);
        
                
                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]); 
                }
                console.log("FormData:", formData); 
                
                const updatedAdmin = await updateAdmin(formData);
                setAdminDetails(updatedAdmin);
                toast.success('Profile picture updated successfully');
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    };
    

    useEffect(()=>{
        console.log(adminDetails)
    }, [adminDetails])

    const formik = userDetailForm(handleSubmit, adminDetails);

    return (
        <div className="container-fluid admin-profile">
            <div className="row">
                <div className="col-md-5 col-12">
                    <div className="left-content-list d-flex flex-column justify-content-center align-items-center position-relative">
                        <div className="profile-pic position-relative">
                            {adminDetails.profilePic ? (
                                typeof adminDetails.profilePic === 'string' ? (
                                    <img src={adminDetails.profilePic} alt="admin profile" />
                                ) : (
                                    <FaUserCircle className="add-profile-pic" size={200} />
                                )
                            ) : (
                                <FaUserCircle className="add-profile-pic" size={200} />
                            )}
                            <input
                                type="file"
                                id="profilePicUpload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="profilePicUpload" className="upload-icon">
                                <FaPlusCircle size={30} />
                            </label>
                        </div>
                        <div className="admin-basic-info">
                            <strong>{adminDetails.name}</strong>
                            <p>{adminDetails.email}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-12">
                    <div className="right-content-list d-flex flex-column justify-content-center align-items-center">
                        <div className='d-flex justify-content-center align-items-center'>
                            <Button
                                className={`admin-profile-button ${isEditing ? '' : 'active'}`}
                                onClick={() => setIsEditing(false)}
                            >
                                Detail
                            </Button>
                            <Button
                                className={`admin-profile-button ${isEditing ? 'active' : ''}`}
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="admin-details">
                            {isEditing ? (
                                <EditProfileAdmin adminDetails={adminDetails} handleSubmit={handleSubmit} handleFileChange={handleFileChange} />
                            ) : (
                                <>
                                    <p><strong>Name:</strong> {adminDetails.name}</p>
                                    <p><strong>Email:</strong> {adminDetails.email}</p>
                                    <p><strong>Mobile:</strong> {adminDetails.mobile}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
