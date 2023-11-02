"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { finishRegistration } from "@hooks/Auth/signup";
import { useAuth } from "@context/AuthContext";
import { toast } from "react-toastify";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";


function SignupInfo(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("");
  const position ={ lat: 36.8815887, lng: 10.3383 };
  const [bio, setBio] = useState("");
  const [images, setImages] = useState([]);
  const [pdp, setPdp] = useState("");
  const [markerPosition, setMarkerPosition] = useState(position);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleFirstNameChange = (e) => {
    const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFirstName(newValue);
  };

  const handleLastNameChange = (e) => {
    const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setLastName(newValue);
  };

  const fullName = firstName + " " + lastName;

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const [profilePic, setProfilePic] = useState("");

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

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(newPos);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async () => {
    const response = await finishRegistration(data);
    const success = response.success;
    const fallback = response.fallback;
    const token = response.token;

    console.log("DATA" + data);
    const userData = response.data;
    console.log(markerPosition)
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
      });
      login(userData,token);
      router.push("/");
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
      });
      console.error("Valeurs mals envoyees a la DB.");
    }
  };

  const data = {
    phoneNumber: props.phoneNumber,
    fullName: fullName,
    age: age,
    avatar: avatar,
    rating: 0,
    bio: bio,
    images: images,
    position: markerPosition,
  };

  const navigateToHaveAccount = () => {
    router.replace("/auth/signup");
  };

  return (
    <>
      <div className="flex flex-col items-center h-full place-items-center">
        <div className="mt-5 card w-96 bg-base-100">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl mb-5">Creer votre compte</h2>
            <br />
            <div className="flex flex-row">
              <div className="flex flex-col mr-3">
                <span className="label-text">Votre prenom</span>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  maxLength={16}
                  className="input input-bordered input-primary appearance-none w-full max-w-xs"
                />
              </div>

              <div className="flex flex-col ml-3">
                <span className="label-text">Votre nom</span>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={handleLastNameChange}
                  maxLength={16}
                  className="input input-bordered input-primary appearance-none w-full max-w-xs"
                />
              </div>
            </div>
            <br />
            <span className="label-text">Votre age</span>
            <input
              type="number"
              placeholder="18"
              value={age}
              onChange={handleAgeChange}
              maxLength={2}
              max={80}
              min={18}
              className="input input-bordered input-primary appearance-none w-full max-w-xs"
            />
            <br />
            <span className="label-text">Votre photo de profile</span>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleAvatarChange}
            />
            {pdp && (
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mt-4">
                {" "}
                <img
                  src={pdp}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <br />

            <br />
            <span className="label-text">Decrivez-vous en quelques mots</span>
            <textarea
              className="textarea textarea-primary"
              required
              placeholder="Decrivez-vous..."
              onChange={handleBioChange}
              value={bio}
            ></textarea>
            <br />
            <br />
            <div className="sm:flex hidden h-[300px] w-[500px]  border border-gray-800 rounded">
              <APIProvider apiKey={"AIzaSyDIYEw-l7wSLk7SFmF-OQeRgFwa87QzLNU"}>
                <Map
                  mapId={"413cd8a1913fc6c1"}
                  center={position}
                  zoom={11}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                >
                  <Marker
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={(e) => setMarkerPosition(e.latLng.toJSON())}
                  />
                </Map>
              </APIProvider>
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={setCurrentLocation}
            >
              Ma Localisation
            </button>
            <br />
            <br />
            <span className="label-text">
              Avez-vous des images de vos anciens projets, de vos
              diplomes/certificats, de votre matériel ?
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            <br />
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
            <p>
              Vous avez un compte ?{" "}
              <a href="/auth/login" className="link link-primary">
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupInfo;
