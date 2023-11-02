'use client'
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Annonce from '@components/Marketplace/Annonce';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function AnnoncePage() {
  const pathname = usePathname();
  const [annonce, setAnnonce] = useState(null);

  console.log(pathname);
  
  useEffect(() => {
    const token = Cookies.get('token') || Cookies.get('guestToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    if (pathname) {
      const match = pathname.match(/\/annonce\/(\d+)-(.+)/);

      if (match) {  
        console.log(match[1])

        const getAnnonceType = () => {
          if (match[1]  === '1') {
            return 'demande'
          } else if (match[1] === '2' ) {
            return 'offre'
          }        
        };
        const annonceType = getAnnonceType(match);
        const idPart = match[2];

        console.log(idPart);

        if (idPart) {
          axios.get(`http://localhost:3500/api/marketplace/annonce/${annonceType}/${idPart}`,{headers})
            .then(response => {
              setAnnonce(response.data);
              if (response.data.fallback) {
                alert(response.data.fallback);
              }
            })
            .catch(error => {
              console.error('Error fetching the annonce: ', error);
              alert("Erreur lors de la connection à la base de données");
            });
        }
      }
    }
  }, [pathname]);

  if (!annonce) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <Annonce annonce={annonce} />;
    </div>
    )

    
}

export default AnnoncePage;
