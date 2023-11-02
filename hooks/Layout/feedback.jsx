import axios from "axios";
import Cookies from "js-cookie";


export const sendFeedback = async (data) => {
  
  try {  
    const token = Cookies.get('token') || Cookies.get('guestToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post('http://localhost:3500/api/layout/feedback',{headers}, {
      title: data.title, 
      description: data.description,
    })

    return response.data;
  }
  catch (error) {
    console.error('Error performing the feedback sending on the backend:', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
    
    return data;
  }
}

