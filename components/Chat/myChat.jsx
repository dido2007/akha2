"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";

const ChatCard = ({ chat }) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  console.log("le user id est", user._id);
  console.log("le from user id est", chat._id);

  const handleInitiateChat = () => {
    const toUserId = user._id; // Récupérez cet ID comme vous le souhaitez, peut-être à partir d'une liste d'utilisateurs ou de profils
    const fromUserId = chat._id;

    router.push(`/chat/${fromUserId}+${toUserId}`);
  };
  return (
    <div className="card w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <div className="avatar mb-1.5">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={"http://localhost:3500/" + chat.avatar}
              alt={chat.fullName}
              width={96} // Vous devez spécifier une largeur
              height={96} // Vous devez spécifier une hauteur
              className="rounded-xl"
              priority={true}
            />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{chat.fullName} </h2>
        <div className="card-actions">
          <button
            onClick={handleInitiateChat}
            className="btn btn-outline btn-primary"
            aria-label="Initiate chat with {chat.fullName}" 
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
