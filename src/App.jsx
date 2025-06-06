import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ComponentNavbar from './components/ComponentNavbar';
import PageMain from './pages/PageMain';
import PageAppliedJobs from './pages/AppliedJobs';
import PageProjects from './pages/PageProjects';
import PageCalendar from './pages/PageCalendar';
import PageReports from './pages/PageReports';
import PageSetting from './pages/PageSetting';
import Page404 from './pages/Page404';
import './app.css'

/**
 * Komponen utama aplikasi yang menangani routing dan state global.
 * Menggunakan React Router untuk navigasi antar halaman.
 */
const App = () => {
  // State untuk menyimpan query pencarian

  return (
    // Menggunakan HashRouter untuk menangani navigasi berbasis hash (#)
    <Router>
      {/* Navigasi utama, menerima query untuk pencarian */}
      <ComponentNavbar />
      {/* Definisi rute aplikasi */}
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<PageMain />} />
            <Route path="/applied-jobs" element={<PageAppliedJobs />} />
            <Route path="/project-history" element={<PageProjects />} />
            <Route path="/calendar" element={<PageCalendar />} />
            <Route path="/reports" element={<PageReports />} />
            <Route path="/setting" element={<PageSetting />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
      

      {/* Footer yang muncul di semua halaman */}

    </Router>
  );
};

export default App;