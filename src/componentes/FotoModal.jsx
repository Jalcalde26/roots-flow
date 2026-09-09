import { useRef } from "react";

export default FotoModal;

function FotoModal({ src, alt }) {
  const dialogRef = useRef(null);

  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className="cursor-pointer object-cover w-full h-full" 
        onClick={() => dialogRef.current.showModal()} 
      />
      <dialog 
        ref={dialogRef} 
        className="flex py-20 w-screen h-screen bg-transparent backdrop:bg-black/80"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}>
        <div className="relative m-auto">
          <img src={src} alt={alt} className="w-full h-full object-contain"/>
          <button onClick ={ () => dialogRef.current.close() } className="absolute top-0 right-2 text-slate-100 text-4xl cursor-pointer">&times;</button>
        </div>
        
      </dialog>
    </>
  )};