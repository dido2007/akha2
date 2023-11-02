import axios from "axios";
import Cookies from "js-cookie";

export const updateProfile = async (data) => {

  const formData = new FormData();

  formData.append('data', JSON.stringify(data));

  for (let i = 0; i < data.images.length; i++) {
    formData.append('images', data.images[i]);
  }
  
  try {
    const token = Cookies.get('token') || Cookies.get('guestToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post('http://localhost:3500/api/profile/update', formData, { headers });
    
    return response.data;
  } catch (error) {
    console.error('Error performing the update profile: ', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
    
    return data;
  }
}