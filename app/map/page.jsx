import TabCardMap from '@components/Map/TabCardMap';

export const metadata = {
  title: {
    absolute: 'Maps - Djoby',
  },
  description : {
    absolute: 'Offre et demande a proximite en Tunisie'
  }
}

const MapPage = () => {
  return (
    <section className="w-full flex-center flex-col">
      <TabCardMap />
    </section>
  );
};

export default MapPage;
