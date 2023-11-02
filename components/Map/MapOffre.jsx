'use client'
import { useEffect, useState } from 'react';
import LoadingSkeletonMap from '@components/Layout/Loading/LoadingSkeletonMap';
import { getOffres } from '@hooks/Marketplace/get-annonces';
import { useAuth } from "@context/AuthContext";
import PinAnnonce from './PinAnnonce';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

const MapOffre = ({ load, metierFilter }) => {
  const { user, isAuthenticated } = useAuth();
  const [userPosition, setUserPosition] = useState(null); // État initial à null
  const [offres, setOffres] = useState([]);
  const [positionLoading, setPositionLoading] = useState(true); // État pour le chargement de la position
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const position = {lat: 36.8815887, lng: 10.3383};


  const fetchData = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        setPositionLoading(false); // Position disponible, définir positionLoading sur false
        if (!isAuthenticated) {
          fetchOffres(); // Si l'utilisateur n'est pas authentifié, récupérer les offres une fois la position disponible
        }
      });
    } else {
      alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
      setPositionLoading(false); // Géolocalisation non prise en charge, définir positionLoading sur false
      if (!isAuthenticated) {
        fetchOffres(); // Si l'utilisateur n'est pas authentifié, récupérer les offres même en cas d'échec de géolocalisation
      }
    }

    if (isAuthenticated) {
      setUserPosition([user.position.latitude, user.position.longitude]);
      setPositionLoading(false); // Position utilisateur disponible, définir positionLoading sur false
      fetchOffres(); // Si l'utilisateur est authentifié, récupérer les offres une fois la position disponible
    }
  };

  const fetchOffres = async () => {
    const offresResponse = await getOffres(metierFilter === 'Tout les métiers' ? '' : metierFilter);

    if (offresResponse.success) {
      setOffres(offresResponse.data);
      setLoading(false);
    } else {
      setError("Erreur lors du get des demandes.");
      setLoading(false);
      console.error("Erreur lors du get des demandes.");
    }
  };

  useEffect(() => {
    if (load) {
      fetchData();
    }
  }, [load, metierFilter]);

  if (positionLoading) {
    return <p>Chargement de la position...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des demandes.</p>;
  }

  return (
    <>

      <div>
        <div className="sm:flex hidden h-[500px] w-[500px]">
          <APIProvider apiKey={'AIzaSyDIYEw-l7wSLk7SFmF-OQeRgFwa87QzLNU'}>
              <Map 
              mapId={'413cd8a1913fc6c1'}
              center={position} 
              zoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={true}    
              >
              {offres.map((offre, index) => (
                <PinAnnonce key={index} annonce={offre} />
              ))}         
              </Map>
            </APIProvider>
        </div>
        <div className="sm:hidden">
          <div className="card w-56 h-96 items-center bg-base-100 rounded-2 sticky p-100 border-blue-500">
          <APIProvider apiKey={'AIzaSyDIYEw-l7wSLk7SFmF-OQeRgFwa87QzLNU'}>
              <Map 
              mapId={'413cd8a1913fc6c1'}
              center={position} 
              zoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={true}  
                
              >
              {offres.map((offre, index) => (
                <PinAnnonce key={index} annonce={offre} />
              ))}         
              </Map>
            </APIProvider>

          </div>
        </div>
      </div>
    
    </>
  );
};

export default MapOffre;
