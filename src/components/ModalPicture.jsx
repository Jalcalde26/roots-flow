import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

export default ModalPicture;

function ModalPicture({ src, alt, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        onClick={() => {
          dialogRef.current.showModal()
          setIsOpen(true);
        }} 
      />
      <dialog 
        ref={dialogRef} 
        className={`${isOpen ? "flex" : ""} w-full h-full bg-transparent backdrop:bg-black/80`}
        onClick={(e) => {if (e.target === dialogRef.current) {
                  dialogRef.current.close();
                  setIsOpen(false);
                }}}>
        <div className="relative block m-auto">
          <img src={src} alt={alt} className="object-contain"/>
          <button 
            onClick ={ () => {
              dialogRef.current.close()
              setIsOpen(false);
              }}
            className="absolute top-1 right-1 text-neutral-300 text-4xl cursor-pointer hover:text-neutral-400">
              <IoClose className="w-4 h-4" aria-hidden="true" focusable="false"/>
          </button>
        </div>
        
      </dialog>
    </>
  )};