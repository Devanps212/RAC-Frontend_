import React from "react";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { findOneUser } from "../../../features/axios/api/admin/adminUser";
import { findOnePartner } from "../../../features/axios/api/partner/partner";

type MessageType = {
  message: any;
  own: boolean;
  id: string;
};

function Message({ message, own, id }: MessageType) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!own) {
          const res = await findOneUser(id)
          setUser(res?.data);
        } else {
          const res = await findOnePartner(id)
          setUser(res?.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id, own]);

  return (
    <div className={`d-flex flex-column mt-3 ${own ? "align-items-end" : ""}`}>
      <div className="d-flex">
        <img
          className="mr-2 rounded-circle"
          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
          src={user?.image ?? '../user.jpg'}
          alt=""
        />
        <p
          className={`p-3 rounded ${
            own ? "bg-light text-dark" : "bg-primary text-white"
          }`}
          style={{ maxWidth: '250px' }}
        >
          {message?.text}
        </p>
      </div>
      <div className="small mt-2">{format(message?.createdAt)}</div>
    </div>
  );
}

export default Message;
