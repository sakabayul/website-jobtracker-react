import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import ComponentButton from "./ComponentButton";

const ComponentModalJob = ({ onClose, onSave, onDelete, fromData, fields }) => {
  const [data, setData] = useState({});

  useEffect(() => {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {fromData ? "Edit Job" : "Add Job"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              {field.type === "select" ? (
                <div className="mt-2 grid grid-cols-1">
                  <select
                    name={field.name}
                    value={data[field.name] ?? ""}
                    onChange={handleChange}
                    className="col-start-1 row-start-1 w-full appearance-none rounded bg-white px-3 py-2 text-base outline-1 -outline-offset-1 outline-black focus:outline-2"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
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
