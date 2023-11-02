import MenuAnnonces from "@components/Marketplace/MenuAnnonces";

export const metadata = {
  title: {
    absolute: 'Menu des annonces'
  },
  description: {
    default: "Demandez ou offrez votre offre sur la platforme de mise en relation d offreur a demandeur Djoby"
  },
}

const MenuAnnoncesPage = () => {
  return <MenuAnnonces />
}

export default MenuAnnoncesPage