import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@context/AuthContext'
import Navbar from '@components/Layout/Navbar/Navbar'
import Footer from '@components/Layout/Footer/Footer'
import { Suspense } from 'react'
import Loading from './loading'
import { ToastContainer } from 'react-toastify';



const RootLayout = ({ children }) => {
  return (
    <html lang='fr'>
        <body>
              <AuthProvider>
                
                <main className='app'>
                  <Suspense fallback={<Loading />}>
                    <Navbar />
                    <ToastContainer />
                    {children}
                    <Footer />
                  </Suspense>
                </main>
                
              </AuthProvider>
        </body>
    </html>
  )
}

export default RootLayout