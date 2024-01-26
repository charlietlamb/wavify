import { useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import {default as NextImage} from "next/image";

type updateType = (url : string) => void;

type ProfileProps = {
  setURL: updateType;
  user: User;
}

const Profile = ({setURL, user}: ProfileProps) => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);

  const updateAvatar = (imgSrc : string) => {
    avatarUrl.current = imgSrc;
    setUploadedFile(true);
    setURL(avatarUrl.current)
  };


  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        {uploadedFile && <NextImage
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-primary"
          width={512}
          height={512}
        />}
        {!uploadedFile && <div className="relative w-[150px] h-[150px] rounded-full border-2 border-primay">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute w-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>}
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-background hover:bg-black border border-primary"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
          setURL = {setURL}
          user = {user}
        />
      )}
    </div>
  );
};

export default Profile;