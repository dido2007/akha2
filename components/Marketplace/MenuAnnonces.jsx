'use client'
import { useState, useEffect } from "react";
import { getOffresByProfile, getDemandesByProfile } from '@hooks/Marketplace/get-annonces';
import Link from "next/link";
import { useAuth } from "@context/AuthContext";
import AnnoncesCard from './ProfileAnnoncesCard'

const MenuAnnonces = () => {
  const [offres, setOffres] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
        if (user) {
        const offresResponse = await getOffresByProfile(user._id);
        const demandesResponse = await getDemandesByProfile(user._id);

        if (offresResponse.success) {
            setOffres(offresResponse.data);
        } else {
            console.error("Erreur lors du get des offres.");
        }

        if (demandesResponse.success) {
            setDemandes(demandesResponse.data);
        } else {
            console.error("Erreur lors du get des demandes.");
        }
        }
    };

    fetchData();
    }, [user && user._id]);

  if (!isAuthenticated) {
    return (
      <section className='flex items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>
          Vous devez être connecté
        </h1>
      </section>
    );
  }



  return (
    <>
    <div className="card w-full h-full flex bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
            <div className="card-actions">
                <Link href="/annonce/add">
                    <button className="btn btn-outline h-32 w-96 text-xl btn-primary">
                    Ajouter une annonce
                    </button>
                </Link>
            </div>
            <br />
            <div className="flex flex-col w-full h-full lg:flex-row">
                <div className="grid flex-grow h-full card bg-base-100 rounded-box place-items-center">
                    <h2 className="card-title">Offres</h2>
                    {offres.length > 0 ? (
                            <>
                                <div className="mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {offres.map((offre, index) => (
                                            <AnnoncesCard key={index} annonce={offre} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                    )}
                </div>
                <div className="divider divider-horizontal"></div>
                <br />
                <br />
                <div className="grid flex-grow h-32 h-full card bg-base-100 rounded-box place-items-center">
                    <h2 className="card-title">Demandes</h2>
                    <br />
                    {demandes.length > 0 ? (
                        <>
                            <div className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {demandes.map((demande, index) => (
                                        <AnnoncesCard key={index} annonce={demande} />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    </div>
    <br />
                    <br />
                    <br />
                    <br />
    </>
   )
}

export default MenuAnnonces;
