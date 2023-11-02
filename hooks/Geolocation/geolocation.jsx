'use client'
import Cookies from 'js-cookie';
import { useAuth } from '@context/AuthContext';
import { useState, useEffect } from 'react';

export const useLocation = () => {
  const { user, isAuthenticated } = useAuth();
  const [userPosition, setUserPosition] = useState(null);

  const getLocation = async () => {
    if (isAuthenticated && user && user.position) {
      // Utilisateur authentifié, utiliser la position de l'utilisateur
      const position = {
        latitude: user.position.latitude,
        longitude: user.position.longitude,
      };
      setUserPosition(position);
      Cookies.set('userPosition', JSON.stringify(position));
    } else {
      // Utilisateur non authentifié
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const userPosition = { latitude, longitude };
            setUserPosition(userPosition);
            Cookies.set('userPosition', JSON.stringify(userPosition));
          },
          () => {
            // L'utilisateur a refusé de partager sa localisation
            setUserPosition(null);
            Cookies.set('userPosition', 'null');
          }
        );
      } else {
        alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
        setUserPosition(null);
        Cookies.set('userPosition', 'null');
      }
    }
  };

  useEffect(() => {
    const savedPosition = Cookies.get('userPosition');
    if (savedPosition) {
      setUserPosition(JSON.parse(savedPosition));
    } else {
      getLocation();
    }
  }, [isAuthenticated, user]);

  return userPosition;
};