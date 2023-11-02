'use client';
import Link from 'next/link';
import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";


const Annonce = ({ annonce }) => {
  const router = useRouter();
  const { user: currentUser, isAuthenticated } = useAuth();
    // const userPosition = [annonce.user.position.latitude, annonce.user.position.longitude]
  
  
    // if (!userPosition) {
    //   return <p>Chargement de la position...</p>;
    // }
    const setImage = () => {
      switch(annonce.metier) {
        case 'Jardinier':
          return '/assets/images/metiers/technicien-jardinier.png'
        case 'Femme de Menage':
          return '/assets/images/metiers/technicien-nettoyeur.png'
        case 'Plombier':
          return '/assets/images/metiers/technicien-plombier.png'
        case 'Menuisier':
          return '/assets/images/metiers/technicien-menuisier.png'
        case 'Electricien':
          return '/assets/images/metiers/technicien-electricien.png'
        case 'Formation Scolaire':
          return '/assets/images/metiers/formation-scolaire.png'
        case 'Formation Sportive':
          return '/assets/images/metiers/formation-sportive.png'
        case 'Formation Professionnelle':
          return '/assets/images/metiers/formation-informatique.png'
        case 'Formation Artistique':
          return '/assets/images/metiers/formation-artistique.png'
        case 'Developpeur':
          return '/assets/images/metiers/freelance-developpeur.png'
        case 'Graphiste':
          return '/assets/images/metiers/freelance-graphiste.png'
        case 'Marketing Digital':
          return '/assets/images/metiers/freelance-marketing.png'
        case 'Designer':
          return '/assets/images/metiers/freelance-webdesigner.png'
      }
    }
  
    const image = setImage()
  
    const images = annonce.images

    const handleInitiateChat = () => {
      if (isAuthenticated) {
        const toUserId = annonce.user._id; 
        const fromUserId = currentUser._id;
  
  
        router.push(`/chat/${fromUserId}+${toUserId}`);
  
      } else {
        alert("Vous devez être connecté pour chatter.");
      }
    };

    return (
      <>
        <br/>
        <div className='flex justify-center items-center'>
          <div className="sm:w-1/3 sm:flex hidden p-40 mr-0">
          </div>
          <div className="card w-96 bg-base-100 sm:w-1/3">
            <button className='sm:hidden'>
              <Link href={'/profile/' + annonce.user._id}>
                <h2>
                  <div className="avatar">
                    <div className="w-6 h-6 rounded-full mr-4">
                        <img src={'http://localhost:3500/' + annonce.user.avatar} />
                    </div>
                  </div>
                  {annonce.user.fullName}
                </h2>
                <span className="indicator-item badge">8km</span>
              </Link>
          </button>
          <figure className="px-10 pt-10">
            <div className="w-64 carousel rounded-box">
              <div className="carousel-item w-full">
                <img src={image} alt="Metier" />
              </div> 
                {images.map((image, index) => (
                  <div className="carousel-item w-full">
                      <img src={'http://localhost:3500/' + image} className="mask mask-squircle w-80 h-60" key={index} alt="Tailwind CSS Carousel component" />
                  </div> 
                ))}
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{annonce.annonceType + '  '} | {annonce.metier}</h2>
            <p>{annonce.tarif}DT</p>
            <br />
                <div className="card-actions">
                  <button onClick={handleInitiateChat} className="btn btn-outline btn-primary">Message</button>
                  <a href={`tel:+216` + annonce.user.phone}><button className="btn btn-outline btn-primary">Telephone</button></a>
                </div>
            <br />    
            <div className='card badge p-10'>
              {annonce.description}
            </div>
            <br />
            {annonce.images.length > 0 &&
                  annonce.images.slice(0, 5).map((image, index) => (
              <div key={index} className="carousel carousel-center rounded-box">
                <div className="carousel-item">
                  <img className="h-64 w-64" src={'http://localhost:3500/' + image} alt={`User image` + index} />
                </div> 
              </div>
                  ))
            }
          </div>
          </div>
          <div className="card w-96 bg-base-100 w-1/3 pr-10 ml-50 sm:flex hidden">
              <figure className="px-10 pt-10">
                <div className="avatar mb-1.5">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={'http://localhost:3500/' + annonce.user.avatar} alt='User Avatar' />
                  </div>
                </div>          
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{annonce.user.fullName}</h2>
                <p>{annonce.user.age}ans</p>
                <div className="card-actions">
                    <Link href={'/profile/' + annonce.user._id}>
                      <button className="btn btn-outline btn-primary">Voir le profile</button>
                    </Link>
                </div>
                <br />
                <div className='card badge p-10'>
                  {annonce.user.bio}
                </div>
                <br />
              </div>
          </div>
        </div>

      </>

    );
};

export default Annonce;