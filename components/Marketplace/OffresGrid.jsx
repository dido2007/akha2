'use client'
import { useState, useEffect } from "react";
import { Suspense } from "react";
import LoadingMarketPlace from "@components/Layout/Loading/LoadingMarketplace";
import Cookies from "js-cookie";
import AnnoncesOffresCard from "./AnnoncesOffresCard";
import { getOffres } from "@hooks/Marketplace/get-annonces";
import { getGuestToken } from "@hooks/Token/GenerateToken"; 
import { useLocation } from "@hooks/Geolocation/geolocation";

function OffresGrid({metierFilter}) {
    const position = useLocation();
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token') || Cookies.get('guestToken')
  const savedPosition = Cookies.get('userPosition');
  //const positionToken = Cookies.get('userPosition')


  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

        if (!token) {
            await getGuestToken();
        } 
        const offresResponse = await getOffres(metierFilter === 'Tout les métiers' ? '' : metierFilter);

        if (offresResponse.success) {
            setOffres(offresResponse.data);
        } else {
            console.error("Erreur lors du get des offres.");
        }
    

        setLoading(false);
    };

    fetchData();
}, [metierFilter, token, position]);

return (
  <>
    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offres.map((offre, index) => (
                  <AnnoncesOffresCard key={index} annonce={offre} />
              ))}
          </div>
  </>
);
}
  
export default OffresGrid; 