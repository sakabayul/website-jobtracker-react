import React, { useRef } from "react";
import ComponentButton from "./ComponentButton";
import ComponentHeaderTitle from "./ComponentHeaderTitle";

const ComponentLocalStorageBackup = () => {
  const fileInputRef = useRef(null);

  // Export semua data dari localStorage ke file JSON
  const handleExport = () => {
    if (confirm(`Yakin Export data?`)) {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
      }
  
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = "localStorage-backup.json";
      link.click();
    }
  };

  // Import data dari file JSON ke localStorage
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        alert("Data berhasil di-import ke localStorage!");
      } catch (error) {
        alert("File tidak valid." + error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-x-4">
      <ComponentHeaderTitle
        title="Backup & Restore"
        description="Save or restore your LocalStorage data."
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <ComponentButton
          type="button"
          onClick={handleExport}
          variant={"save"}
        >
          Export LocalStorage
        </ComponentButton>

        <ComponentButton
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          Import LocalStorage
        </ComponentButton>
      </div>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleImport}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ComponentLocalStorageBackup;
