import React from "react";
import ComponentButton from "./ComponentButton";
import { PlusIcon } from '@heroicons/react/24/solid';

const ComponentHeaderTitle = ({ title, description, handleShowModal, button = false }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <>
      <div className="mb-5 flex justify-between items-center gap-10">
        <div>
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