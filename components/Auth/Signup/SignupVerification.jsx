'use client'
import { useState } from 'react';
import { sendVerificationCode } from '@hooks/Auth/signup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

const SignupVerification = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleVerificationCode = async () => {

        console.log("Numero de telephone obtenu a travers la signup card : " + phoneNumber);
    
        const response = await sendVerificationCode(phoneNumber);
        const success = response.success
        const fallback = response.fallback
        
        if (success) {
            toast.success(fallback, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            props.buttonClick(data);
        } else {
            toast.error("Invalid phone number.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            console.error("Invalid phone number.");
        }
    };

    const data = {
        cardtype: 2,
        phoneNumber: phoneNumber,
    }

    const navigateToHaveAccount = () => {
        router.replace("/auth/login")
    };


  return (
    <>
        <div className='flex flex-col items-center h-screen place-items-center'>
            <div className='mt-44 card w-96 bg-base-100'>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-3xl mb-5">Creer votre compte</h2>
                    <span className="label-text">Votre numero de telephone</span>
                    <input type="number" placeholder="20218111" value={phoneNumber} onChange={handlePhoneNumberChange} maxLength={8} min={0} className="input input-bordered input-primary appearance-none w-full max-w-xs" />
                    <div className="card-actions">
                    <button className="btn btn-primary" onClick={() => handleVerificationCode()}>Creer un compte</button>
                    </div>
                    <Link href='/auth/login'>
                        <p className="link link-primary"> Se connecter </p>
                    </Link>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default SignupVerification