import { useState, useEffect } from 'react';


function Searchbar({ onSearch }) {
  const [selectedValue, setSelectedValue] = useState('');


  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(selectedValue);
    }
  };

  return (
    <>
      <div className="form-control">
        <div className="input-group input-group-lg">
          <select
            className="select select-bordered"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option disabled value="">Quel métier cherchez-vous ?</option>
            <option value="Tout les métiers">Tout les métiers</option>
            <optgroup label="Techniciens">
              <option value="Jardinier">Jardinier</option>
              <option value="Femme de Ménage">Femme de Ménage</option>
              <option value="Plombier">Plombier</option>
              <option value="Menuisier">Menuisier</option>
              <option value="Electricien">Electricien</option>
            </optgroup>
            <optgroup label="Formation">
              <option value="Formation Scolaire">Formation Scolaire</option>
              <option value="Formation Sportive">Formation Sportive</option>
              <option value="Formation Professionnelle">Formation Professionnelle</option>
              <option value="Formation Artistique">Formation Artistique</option>
              <option value="Formation Culinaire">Formation Culinaire</option>
            </optgroup>
            <optgroup label="Freelance">
              <option value="Développeur">Développeur</option>
              <option value="Graphiste">Graphiste</option>
              <option value="Marketing Digital">Marketing Digital</option>
              <option value="Designer">Designer</option>
            </optgroup>
          </select>
          <button className="btn" onClick={handleSearchClick}>Go</button>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
