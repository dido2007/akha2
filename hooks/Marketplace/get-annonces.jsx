import axios from "axios";
import Cookies from "js-cookie";




export const getOffres = async (metier) => {
    try {
        const positionStr = Cookies.get('userPosition');
        const token = Cookies.get('token') || Cookies.get('guestToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        let url = `http://localhost:3500/api/marketplace/filtregetoffres?metier=${metier}`;

        if (positionStr  && positionStr !== 'null' ) {
            const position = JSON.parse(positionStr);
            if (position.latitude && position.longitude) {
                url += `&latitude=${position.latitude}&longitude=${position.longitude}`;
            }
        }

        const response = await axios.get(url, { headers });
       
        return response.data;
        
    } catch (error) {
        console.error('Error fetching offres by metier:', error);
        return {
            success: false,
            fallback: "Erreur lors de la connexion à la base de données"
        };
    }
};



export const getDemandes= async (metier) => {
  try {
    const positionStr = Cookies.get('userPosition');
    const token = Cookies.get('token') || Cookies.get('guestToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let url = `http://localhost:3500/api/marketplace/filtregetdemandes?metier=${metier}`;

    if (positionStr  && positionStr !== 'null' ) {
        const position = JSON.parse(positionStr);
        if (position.latitude && position.longitude) {
            url += `&latitude=${position.latitude}&longitude=${position.longitude}`;
        }
    }


    const response = await axios.get(url, { headers });
    return response.data;
      
  } catch (error) {
      console.error('Error fetching demandes by metier:', error);
      return {
          success: false,
          fallback: "Erreur lors de la connexion à la base de données"
      };
  }
}

export const getOffresByProfile= async (userId) => {
  try {
      const authToken = Cookies.get('token');
      const guestToken = Cookies.get('guestToken');

      const token = authToken || guestToken;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};   

      const response = await axios.get(`http://localhost:3500/api/marketplace/filtregetoffres?userId=${userId}`, {headers});
      return response.data;
      
  } catch (error) {
      console.error('Error fetching offres by metier:', error);
      return {
          success: false,
          fallback: "Erreur lors de la connexion à la base de données"
      };
  }
}

export const getDemandesByProfile= async (userId) => {
try {
    const authToken = Cookies.get('token');
    const guestToken = Cookies.get('guestToken');

    const token = authToken || guestToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response = await axios.get(`http://localhost:3500/api/marketplace/filtregetdemandes?userId=${userId}`, {headers});
    return response.data;
    
} catch (error) {
    console.error('Error fetching demandes by metier:', error);
    return {
        success: false,
        fallback: "Erreur lors de la connexion à la base de données"
    };
}
}
