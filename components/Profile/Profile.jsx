'use client'
import { useState } from 'react';
import { updateProfile } from '@hooks/Profile/update-profile';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@context/AuthContext';


const Profile = ({ user, userProfile }) => {

    const [edit, setEdit] = useState(false)
    const { user: currentUser, isAuthenticated, login } = useAuth();
    const router = useRouter();
    // const userPosition = [user.position.latitude, user.position.longitude]
    const [fullName, setFullName] = useState();
    const [age, setAge] = useState(user.age);
    const [avatar, setAvatar] = useState();
    // const [position, setPosition] = useState([user.position.latitude, user.position.longitude]);
    const [bio, setBio] = useState(user.bio);
    const [images, setImages] = useState();
    const [pdp, setPdp]= useState('');

  const handleInitiateChat = () => {
    if (isAuthenticated) {
      const toUserId = currentUser._id; 
      const fromUserId = user._id;


      router.push(`/chat/${toUserId}+${fromUserId}`);

    } else {
      toast.error("Vous devez être connecté pour chatter.", {
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

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleAgeChange = (event) => {
      setAge(event.target.value);
  };



  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdp(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleBioChange = (event) => {
      setBio(event.target.value);
  };

  const handleImagesChange = (event) => {
      setImages(Array.from(event.target.files));
  };

  const handleEdit = () => {
    setEdit(true)
  };

  const handleSubmit = async () => {
    const response = await updateProfile(data);
    const success = response.success
    const fallback = response.fallback

    const userData = response.data

    if (success) {
        login(userData)
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
    } else {
      toast.error(fallback, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      console.error("Valeurs mals envoyees a la DB.");
    }
  };

  const data = {
    userId : user._id,
    fullName: fullName,
    age: age,
    avatar: avatar,
    rating: 0,
    bio: bio,
    images: images,
    // position: position,
  }



    return (
      <>
      <br/>
      <div className="card w-96 bg-base-100 w-1/2">
        <figure className="px-10 pt-10">
          <div className="avatar mb-1.5">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              { edit? (
                <>
                    <input type="file" accept="image/*" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={handleAvatarChange} />
                    {pdp && ( <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mt-4"> <img src={pdp} alt="Avatar" className="w-full h-full object-cover" /></div>)}
                    <br />
                </>
              ) :
              (
                <img src={'http://localhost:3500/' + user.avatar} alt='User Avatar' />
              )
              }
            </div>
          </div>          
        </figure>
        <div className="card-body items-center text-center">
          {
            edit? (
              <>
                <input type="text" placeholder={user.fullName} value={fullName} onChange={handleFullNameChange} className="input input-bordered input-primary w-full max-w-xs" />
                <input type="number" placeholder={user.age} value={age} onChange={handleAgeChange} maxLength={2} max={80} min={18}  className="input input-bordered input-primary appearance-none w-full max-w-xs" />
              </>
            ) : (
              <>
                <h2 className="card-title">{user.fullName}</h2>
                <p>{user.age}ans</p>
              </>

            )
          }
          {
            userProfile? (
                edit? (
                  <>
                  </>
                ) : 
                (
                  <div className="card-actions">
                    <button onClick={handleEdit} className="btn btn-outline btn-primary">Edit</button>
                  </div>
                )
            ) : (
              <div className="card-actions">
                <button onClick={handleInitiateChat} className="btn btn-outline btn-primary">Message</button>
                <a href={`tel:+216` + user.phoneNumber}><button className="btn btn-outline btn-primary">Telephone</button></a>
              </div>
            )
          }

          <br />
          {
            edit? (
              <>
                  <br />
                  <textarea className="textarea textarea-primary" required placeholder={user.bio} onChange={handleBioChange} value={bio}></textarea>
                  <br/>
                  <br />
                  <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                  <br/>
                  <div className="card-actions">
                      <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                  </div>              
              </>
            ) : (
              <>
                <div className='card badge p-10'>
                  {user.bio}
                </div>
                <br />
                {user.images.length > 0 &&
                      user.images.slice(0, 5).map((image, index) => (
                  <div key={index} className="carousel carousel-center rounded-box">
                    <div className="carousel-item">
                      <img className="h-64 w-64" src={'http://localhost:3500/' + image} alt={`User image` + index} />
                    </div> 
                  </div>
                      ))
                }
              </>

            )
          }
        </div>
      </div>
      </>

    );
};

export default Profile;