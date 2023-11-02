"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { sendFeedback } from "@hooks/Layout/feedback";
import { LuMapPin } from "react-icons/lu";
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram, } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useAuth } from "@context/AuthContext";
import { AiOutlineUser, } from "react-icons/ai";
import { toast } from 'react-toastify';

function Footer() {
  const { isAuthenticated, user } = useAuth();
  let date = new Date();
  let year = date.getFullYear();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState([]);

  const data = {
    title: title,
    description: description,
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const submit = async () => {
    const response = await sendFeedback(data);
    const success = response.success
    const fallback = response.fallback
    if(success){
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
    }else{
      toast.console.error(fallback, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  };

  return (
    <>
      <div className="sm:flex hidden flex-col items-center justify-center">
      <footer className="footer footer-center p-10">
        <aside className="font-tsukimi_rounded">
          <Image className="h-20 w-20" src="/assets/logo.png" width={100} height={100} alt="Logo de Djoby.tn" />

          <div className="font-museomoderno"><h1 className="text-xl">DJOBY</h1> <br/>Plateforme de mise en relation d'offres et de demandes de services entre particuliers.</div>
        </aside> 
        <nav className="flex flex-col">
          <header className="footer-title">Feedback</header> 
          <div className="grid gap-4">
            <input value={title} onChange={handleTitleChange} type="text" placeholder="TItre" className="input input-bordered input-primary w-full max-w-xs" />
            <textarea value={description} onChange={handleDescriptionChange} className="textarea textarea-primary" placeholder="Description"></textarea>
            <button  onClick={submit} className="btn btn-primary">Envoyer</button>
          </div>
        </nav>
      </footer>
      <footer className="footer p-10 bg-base-100 grid-cols-4 items-center footer-center">
          <nav>
            <header className="footer-title">Freelance</header>
            <ul>
              <li>
                <a href="#" className="link link-hover">Developpeur</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Graphiste</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Web Designer</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Digital Marketing</a>
              </li>
            </ul>
          </nav>
          <nav>
            <header className="footer-title">Assistance</header>
            <ul>
              <li>
                <a href="#" className="link link-hover">Avec un animal</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Avec un enfant</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Avec un bébé</a>
              </li>
            </ul>
          </nav>
          <nav>
            <header className="footer-title">Technicien</header>
            <ul>
              <li>
                <a href="#" className="link link-hover">Plombier</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Menuisier</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Jardinier</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Forgeron</a>
              </li>
            </ul>
          </nav>
          <nav>
            <header className="footer-title">Formation</header>
            <ul>
              <li>
                <a href="#" className="link link-hover">Scolaire</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Sportive</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Artistique</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Scientifique</a>
              </li>
              <li>
                <a href="#" className="link link-hover">Culinaire</a>
              </li>
            </ul>
          </nav>
      </footer>
      <footer className="footer footer-center p-10 bg-base-100">
        <aside>
          <p>Copyright © 2023 - All right reserved</p>
        </aside> 
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </nav>
      </footer>

      </div>
      <div className="sm:hidden flex relative">
        <br/>
        <br/>

        <br/>
        <br/>
        <br/>

          <div className="btm-nav fixed bottom-0">
            <button className="text-primary">
              <a href="/map">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />  
                </svg>
              </a>
            </button>
            <button className="text-primary">
              <a href="/annonce/menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </a>
            </button>
            <button className="text-primary">
              <a href="/chat">
                <svg viewBox="0 0 512 512" fill="currentColor" className="h-5 w-5">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="52" d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"/>
                </svg>
              </a>
            </button>
          </div>
      </div>
    </>

  );
}

export default Footer;