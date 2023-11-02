'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "@context/AuthContext";
import Cookies from 'js-cookie';


export const useMyChats = () => {
  const { user } = useAuth();
  const [myChats, setMyChats] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
    const token = Cookies.get('token');  // supposez que vous stockez votre token sous le nom 'token'
      try {
        const response = await axios.get('http://localhost:3500/api/chat/mychats', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            userId: user._id
          }
        });
        setMyChats(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des conversations", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id ]); //mettre user._id 

  return { myChats, loading };
};