'use client'
import { useState, useEffect } from "react";
import LoadingMarketPlace from "@components/Layout/Loading/LoadingMarketplace";
import { Suspense } from "react";
import AnnoncesDemandesCard from "./AnnoncesDemandesCard";
import { getDemandes } from '@hooks/Marketplace/get-annonces';
import Cookies from "js-cookie";



function DemandesGrid({metierFilter}) {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
    const token = Cookies.get('token') || Cookies.get('guestToken')


    useEffect(() => {
      if (!token) {
          return; 
      }
  
      const fetchData = async () => {
          setLoading(true);
  
          const demandesResponse = await getDemandes(metierFilter === 'Tout les métiers' ? '' : metierFilter);
  
          if (demandesResponse.success) {
              setDemandes(demandesResponse.data);
          } else {
              console.error("Erreur lors du get des demandes.");
          }
  
          setLoading(false);
      };
  
      fetchData();
  }, [metierFilter, token]);

    return (
      
      <>
      {/* {!loading ? (
          <LoadingMarketPlace />
      ) : ( */}
      <Suspense fallback={<h1> hahah</h1>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demandes.map((demande, index) => (
              <AnnoncesDemandesCard key={index} annonce={demande} />
            ))}
        </div>
      
        </Suspense>
      </>
    );
}
  
export default DemandesGrid;