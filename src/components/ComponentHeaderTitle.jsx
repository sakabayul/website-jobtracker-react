import React from "react";
import ComponentButton from "./ComponentButton";
import { PlusIcon } from '@heroicons/react/24/solid';
import { useLocation } from "react-router-dom";

const ComponentHeaderTitle = ({ title, description, handleShowModal, button = false }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const location = useLocation();

  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  React.useEffect(() => {
    setIsVisible(false); // Reset dulu
    const timeout = setTimeout(() => {
      setIsVisible(true); // Aktifkan lagi untuk trigger animasi
    }, 10);

    return () => clearTimeout(timeout);
  }, [location.pathname]); // Trigger ulang saat path berubah

  return (
    <>
      <div className="mb-5 flex justify-between items-center gap-10">
        <div className={`flex flex-col transition-all duration-500 ease-in-out ${
          isVisible? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <h2 className="text-2xl text-gray-700 font-bold">{ title }</h2>
          <p className="text-gray-600 max-w-200">
            { description }
          </p>
        </div>
        <div>
          {button && (
            <ComponentButton
                type="button"
                onClick={handleShowModal}
            >
              {isMobile? <PlusIcon className="h-5 w-5" /> : "Add Data"}  
            </ComponentButton>
          )}
        </div>
      </div>
    </>
  );
};

export default ComponentHeaderTitle;