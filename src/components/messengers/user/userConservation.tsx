import React, {useEffect, useState} from "react";
import { partnerDetailInterface } from "../../../types/partnerInterface";
import { findOnePartner } from "../../../features/axios/api/partner/partner";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/axios/redux/reducers/reducer";
import { decodeToken } from "../../../utils/tokenUtil";


const Conversations = ({ conversation, currentUser, onlineUser}: any)=>{
    const [partner, setPartner] = useState<partnerDetailInterface>()
    const [isOnline, setIsOnline] = useState<boolean>(false)

    useEffect(()=>{
        const senderId = conversation?.memeber?.find(
            (m: Array<string>) => m !== currentUser?._id
        )

        const partnerFind = async()=>{
            try{
                const partner = await findOnePartner(senderId)
                setPartner(partner)
            } catch(error: any) {
                throw new Error(error.message)
            }
        }
    }, [conversation.member, conversation?.members, currentUser?._id])

    useEffect(()=>{
        const onlineUsers = onlineUser?.filter(
            (f: any) => f.userId === partner?._id
        )
        if( onlineUser?.length > 0){
            setIsOnline(true)
        }
    }, [partner?._id, onlineUser])
    
    return (
        <div className="d-flex align-items-center mt-3 p-3 cursor-pointer" style={{ position: 'relative', backgroundColor: '#f8f9fa' }}>
          <img
            className="mr-3 rounded-circle"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            src={partner?.profilePic ?? '../user.jpg'}
            alt="Employer"
          />
          <div className="d-flex flex-column">
            <span className="font-weight-bold">{partner?.email}</span>
            {isOnline ? (
              <span className="text-muted">online</span>
            ) : (
              <span className="text-muted">offline</span>
            )}
          </div>
          {isOnline && (
            <div style={{ position: 'absolute', top: '12px', left: '40px', height: '12px', width: '12px', borderRadius: '50%', backgroundColor: 'limegreen' }}></div>
          )}
        </div>
      );
}

export default Conversations