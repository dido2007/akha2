import axios from "axios";
import Cookies from "js-cookie";

export const getGuestToken = async () => {
    try {
        const authToken = Cookies.get('token');
        const guestToken = Cookies.get('guestToken');

        const response = await axios.get(`http://localhost:3500/api/auth/generateGuestToken`);
       
        if (authToken) {
            Cookies.remove('guestToken');
        }

        if (!guestToken && !authToken && response.data.guestToken) {
            Cookies.set('guestToken', response.data.guestToken, { expires: 30 });
        }

    } catch (error) {
        console.error('Error fetching guest token:', error);
        return false;
    }
}


