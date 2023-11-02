'use client'
import { useAuth } from "@context/AuthContext";
import AuthenticatedChats from '@components/Chat/myChatAuth';

const ChatClient = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className='flex items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>
          Vous devez être connecté
        </h1>
      </section>
    );
  }

  return <AuthenticatedChats />;
}

export default ChatClient;
