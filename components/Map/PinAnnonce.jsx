"use client"
import { useState } from 'react';
import Link from 'next/link';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';



const PinAnnonce = ({ annonce }) => {

    const redirect = () => {
        if(annonce.annonceType == 'Offre'){
            return 2
        }else{
            return 1
        }
    }

  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const position = {lat: annonce.user.position.latitude, lng: annonce.user.position.longitude};

return (
  <>
    <AdvancedMarker
      ref={markerRef}
      onClick={() => setInfowindowOpen(true)}
      position={position}
      title={'AdvancedMarker that opens an Infowindow when clicked.'}
    />
    {infowindowOpen && (
      <InfoWindow
        anchor={marker}
        maxWidth={200}
        onCloseClick={() => setInfowindowOpen(false)}>
             <h1 className='font-bold text-center mb-2'>{annonce.metier}</h1>
             <h2 className='text-center mb-4'>{annonce.tarif} DT</h2>
             <Link href={'/annonce/' + redirect() + '-' + annonce._id} className="flex btn btn-outline btn-primary">VOIR L'OFFRE</Link>      
      </InfoWindow>
    )}
  </>
);
}

export default PinAnnonce

