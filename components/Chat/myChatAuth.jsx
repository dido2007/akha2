'use client'

import { useMyChats } from '@hooks/Chat/mychat';
import ChatCard from '@components/Chat/myChat';

const AuthenticatedChats = () => {
    const { myChats, loading } = useMyChats();

    if (myChats.length === 0) {
      return (
        <section className='flex items-center justify-center h-screen'>
          <h1 className='text-3xl font-bold text-center'>
            Aucun Chat, commencez en un.
          </h1>
        </section>
      );
    } else {
      return (
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className='text-2xl font-bold mb-4 text-center'>Vos Chats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myChats.map((chat, index) => (
              <ChatCard key={index} chat={chat} />
            ))}
          </div>
        </div>
      );    
    }
  };
  
  export default AuthenticatedChats;
