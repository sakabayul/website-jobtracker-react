import React from "react";
import ComponentButton from "./ComponentButton";
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";

const ComponentModalJob = ({ onClose, onSave, onDelete, fromData, fields, showModal }) => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const defaultData = {};
    fields.forEach((field) => {
      if (fromData) {
        defaultData[field.name] =
          fromData[field.name] ?? field.defaultValue ?? "";
      } else {
        defaultData[field.name] = field.defaultValue ?? "";
      }
    });

    // Tambahkan ID untuk mode tambah
    defaultData.id = fromData?.id ?? null;

    setData(defaultData);
  }, [fromData, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...data, id: data.id ?? Date.now() });
  };

  const customIsValidNewOption = (inputValue, selectValue, selectOptions) => {
    // Cek apakah input persis sama dengan opsi yang ada (case-sensitive)
    const exists = selectOptions.some(option => option.label === inputValue);
    return inputValue.trim().length > 0 && !exists;
  };

  return (
    <div className={`px-3 fixed inset-0 flex items-center justify-center z-50 bg-black/70 transition-opacity duration-300 ease-in-out
      ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[600px] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">
          {fromData ? "Edit Job" : "Add Job"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map((field) => (
            <div key={field.name}>
              {!field.hidden && (
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
              )}
              {field.type === "select" ? (
                <div className="mt-2 grid grid-cols-1">
                  <Select
                    value={field.options.find(opt => opt.value === data[field.name]) ?? null}
                    onChange={(selectedOption) =>
                      handleChange({
                        target: {
                          name: field.name,
                          value: selectedOption ? selectedOption.value : "",
                        }
                      })
                    }
                    options={field.options}
                    placeholder="Pilih posisi"
                  />
                </div>
              ) : field.type === "creatable-select" ? (
                <div>
                  <CreatableSelect
                    value={field.options.find(opt => opt.value === data[field.name]) ?? null}
                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        handleChange({
                          target: {
                            name: field.name,
                            value: selectedOption.value,
                          },
                        });

                        // Tambahkan ke daftar options jika value baru
                        if (!field.options.find(opt => opt.value === selectedOption.value)) {
                          field.options.push({
                            label: selectedOption.label,
                            value: selectedOption.value,
                          });
                        }
                      } else {
                        // Jika di-clear
                        handleChange({
                          target: {
                            name: field.name,
                            value: "",
                          },
                        });
                      }
                    }}
                    options={field.options}
                    placeholder="Pilih atau buat baru..."
                    isValidNewOption={customIsValidNewOption}
                  />
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.label}
                  value={data[field.name] ?? ""}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 h-32 resize-none ${
                    field.disabled
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  required={field.required}
                  disabled={field.disabled}
                />
              ) : (
                <input
                  hidden={field.hidden}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.label}
                  value={data[field.name] ?? ""}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    field.disabled
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  required={field.required}
                  disabled={field.disabled}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            {fromData && (
              <ComponentButton
                type="button"
                onClick={() => onDelete(data)}
                variant="delete"
              >
                Delete
              </ComponentButton>
            )}

            <ComponentButton
              type="button"
              onClick={onClose}
              variant="cancel"
            >
              Cancel
            </ComponentButton>

            <ComponentButton
              type="submit"
              variant="save"
            >
              {fromData ? "Update" : "Save"}
            </ComponentButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComponentModalJob;
