import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import Select from 'react-select';
import { v4 as uuidv4 } from "uuid";
import ComponentModal from "../components/ComponentModal";

const PageCalender = () => {
  const options = [
    { value: 'dayGridMonth', label: '📅 Bulan' },
    { value: 'listDay', label: '📋 List Day' },
    { value: 'listWeek', label: '📋 List Week' },
    { value: 'listMonth', label: '📋 List Month' }
  ];

  const [data, setData] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [clickedDate, setClickedDate] = useState({});
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [isMobile, setIsMobile] = useState(false);
  const calendarRef = useRef();
  const usedColorsRef = useRef([]);

  const saveJobsToStorage = (data) => {
    localStorage.setItem('calendarEvents', JSON.stringify(data));
  };

  const formatToDatetimeLocal = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleChangeView = (selectedOption) => {
    const selectedView = selectedOption?.value || "";
    setCurrentView(selectedView);
    calendarRef.current.getApi().changeView(selectedView);
  };

  const handleDateClick = (arg) => {
    const baseDate = new Date(arg.dateStr.includes("T") ? arg.dateStr : `${arg.dateStr}T08:00`);
    const endDateObj = new Date(baseDate);

    endDateObj.setHours(endDateObj.getHours() + 1);
    
    setClickedDate({
      start_date: formatToDatetimeLocal(baseDate),
      end_date: formatToDatetimeLocal(endDateObj)
    });
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    const eventData = data.find(e => e.id === clickInfo.event.id);
    setSelectedEvent(eventData);
    setShowModal(true);
  };

  const handleEventDrop = (dropInfo) => {
    const updated = data.map(ev =>
      ev.id === dropInfo.event.id
        ? {
            ...ev,
            start: formatToDatetimeLocal(dropInfo.event.startStr),
            end: formatToDatetimeLocal(dropInfo.event.endStr),
          }
        : ev
    );
    setData(updated);
    saveJobsToStorage(updated);
  };

  const handleResize = (resize) => {
    const updated = data.map(ev =>
      ev.id === resize.event.id
        ? {
            ...ev,
            start: formatToDatetimeLocal(resize.event.start),
            end: formatToDatetimeLocal(resize.event.end),
          }
        : ev
    );
    setData(updated);
    saveJobsToStorage(updated);
  };

  const getColor = () => {
    const darkColors = [
      '#1E1E2F', '#2C3E50', '#34495E', '#4B0082', '#2F4F4F',
      '#483D8B', '#191970', '#3B3B98', '#2C2C54', '#3A3A3C',
      '#455A64', '#4A235A', '#7B241C', '#512E5F', '#784212',
    ];

    if (usedColorsRef.current.length === darkColors.length) {
      usedColorsRef.current = [];
    }

    const availableColors = darkColors.filter(
      (color) => !usedColorsRef.current.includes(color)
    );

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const chosenColor = availableColors[randomIndex];
    usedColorsRef.current.push(chosenColor);

    return chosenColor;
  };

  const handleSave = (row) => {
    let updatedJobs;

    if (data.find((j) => j.id === row.id)) {
      // Update
      updatedJobs = data.map((j) => (j.id === row.id ? row : j));
    } else {
      // Tambah
      row.id = uuidv4();
      row.backgroundColor = getColor(); // Tambahkan warna
      updatedJobs = [...data, row];
    }
    setData(updatedJobs);
    saveJobsToStorage(updatedJobs);
    setShowModal(false);
  };

  const handleDelete = (row) => {
    if (confirm(`Yakin hapus data: ${row.title}?`)) {
      const updatedJobs = data.filter((j) => j.id !== row.id);
      setData(updatedJobs);
      saveJobsToStorage(updatedJobs);
      setShowModal(false);
    }
  };

  const fields = [
    { label: "Title", name: "title", required: true },
    { label: "Description", name: "description", type: "text", required: true },
    { label: "Start", name: "start", type: "datetime-local", defaultValue: clickedDate.start_date, required: true, disabled: selectedEvent? false : true },
    { label: "End", name: "end", type: "datetime-local", defaultValue: clickedDate.end_date, required: false, disabled: false }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) setData(JSON.parse(saved));

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
      {isMobile && (
        <div className="mb-4 relative z-50">
          <Select
            value={options.find(opt => opt.value === currentView)}
            onChange={handleChangeView}
            options={options}
            placeholder="Pilih posisi"
          />
        </div>
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={currentView}
        editable
        selectable
        events={data}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleResize}
        headerToolbar={{
          left: 'prev,today,next',
          center: 'title',
          right: isMobile ? false : 'timeGridDay,timeGridWeek,dayGridMonth,listMonth',
        }}
        views={{
          timeGridDay: {
            titleFormat: { day: 'numeric', month: 'short' }
          },
          listMonth: {
            titleFormat: { day: 'numeric', month: 'short' }
          },
          timeGridWeek: {
            titleFormat: { month: 'short' }
          },
          dayGridMonth: {
            titleFormat: { month: 'short' }
          },
          listDay: {
            titleFormat: { day: 'numeric', month: 'short' }
          },
          listWeek: {
            titleFormat: { month: 'short' }
          }
        }}
        buttonText={{
          today: 'Today',
          timeGridDay: 'Day',
          timeGridWeek: 'Week',
          dayGridMonth: 'Month',
          listMonth: 'List'
        }}
        eventTimeFormat={{
          // day: '2-digit',
          // month: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        height="auto"
        eventContent={isMobile? (arg) => (
          <div className="text-gray-700 truncate max-w-[130px]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <b>{arg.timeText}</b>
            <i className="ml-2">{arg.event.title}</i>
          </div>
        ) : true}
      />

      <ComponentModal
        onClose={() => setShowModal(false)}
        fields={fields}
        onSave={handleSave}
        onDelete={handleDelete}
        fromData={selectedEvent}
        showModal={showModal}
      />
    </div>
  );
};

export default PageCalender;
