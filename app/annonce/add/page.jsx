import AddAnnonce from "@components/Marketplace/AddAnnonce";

export const metadata = {
  title: {
    absolute: 'Ajoutez votre annonce'
  },
  description: {
    default: "Demandez ou offrez votre offre sur la platforme de mise en relation d offreur a demandeur Djoby"
  },
}

const AddAnnoncePage = () => {
  return <AddAnnonce />
}

export default AddAnnoncePage