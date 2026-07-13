import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { RoomsPage } from './pages/RoomsPage.jsx';
import { TourPage } from './pages/TourPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
