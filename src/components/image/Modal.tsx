import { AnimatedXIcon } from "../icons/x";
import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

interface ModalProps {
    updateAvatar: (imgSrc: string) => void;
    closeModal: () => void;
    setURL: (url: string) => void;
    user: User
  }

const Modal: React.FC<ModalProps> = ({ updateAvatar, closeModal, setURL, user }) => {
  const iconProps = {
    height:"24",
    width:"24",
    color:'#facc15'
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex justify-center min-h-full px-2 py-[15vh] text-center ">
          <div className="relative flex w-[95%] sm:w-[80%] h-[70vh] rounded-2xl bg-background_content text-primary text-left shadow-xl transition-all">
            <div className="relative w-full px-5 py-4 height-full">
              <button
                type="button"
                className="absolute z-10 inline-flex items-center justify-center p-1 rounded-md text-primary hover:bg-black focus:outline-none top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <AnimatedXIcon {...iconProps}/>
              </button>
              <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
                setURL = {setURL}
                user = {user}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;