'use client'
import { useState, useEffect } from 'react';
import OffresGrid from './OffresGrid';
import DemandesGrid from './DemandesGrid';
import Searchbar from './Searchbar';

function TabCard() {
  const [activeTab, setActiveTab] = useState('offres');
  const [metierFilter, setMetierFilter] = useState('');

  const handleSearch = (metier) => {
    setMetierFilter(metier);
  };


  
    return (
      <>
      <div className="card w-96 bg-base-100 w-full">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">Marketplace</h2>
                <br />
                <Searchbar onSearch={handleSearch} />

                <br />
                <div className="tabs tabs-boxed">
                    <button onClick={(e) => setActiveTab(e.target.value)} value="offres" className={`tab ${ activeTab === 'offres' ? 'tab-active' : ''}`}>Offres</button> 
                    <button onClick={(e) => setActiveTab(e.target.value)} value="demandes" className={`tab ${ activeTab === 'demandes' ? 'tab-active' : ''}`}>Demandes</button> 
                </div>
                <br /> <br /> 

                <div className={`${ activeTab === 'offres' ? '' : 'hidden' }`}>
                    <OffresGrid metierFilter={metierFilter}  />
                </div>
                <div className={`${ activeTab === 'demandes' ? '' : 'hidden' }`}>
                    <DemandesGrid metierFilter={metierFilter} />
                </div>
            </div>
        </div>
      </>
    );
}
  
export default TabCard;