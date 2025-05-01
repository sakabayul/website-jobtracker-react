import ComponentButton from "./ComponentButton";

const ComponentHeaderTitle = ({ title, description, handleShowModal, button = false }) => {
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
              Add
            </ComponentButton>
          )}
        </div>
      </div>
    </>
  );
};

export default ComponentHeaderTitle;