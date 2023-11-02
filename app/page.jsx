import TabCard from '@components/Marketplace/TabCard';

export const metadata = {
  title: 'Djoby',
  description: 'Page d acceuil, de la platforme de mise en relation d offreur a demadeur de sercices de particulier a particulier en tunisie, pour ceux qui recherchent du travail.',
  author: 'H&H Corporation 2023'
};


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <TabCard />
    </section>
  );
};

export default Home;
