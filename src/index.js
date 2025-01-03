import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import AccountPage from './Pages/AccountPage';
import AddPage from './Pages/AddPage';
import CalendarPage from './Pages/CalendarPage';
import Footer from './Pages/Footer';
import Header from './Pages/Header';
import HomePage from './Pages/HomePage';
import PatientDetailsPage from './Pages/PatientDetailsPage';
import PatientsListPage from './Pages/PatientsListPage';
import SignInPage from './Pages/SignInPage';
import TodayPage from './Pages/TodayPage';
import store from './Redux/store';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/add" element={<AddPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/today" element={<TodayPage />}></Route>
          <Route path="/calendar" element={<CalendarPage />}></Route>
          <Route path="/patients" element={<PatientsListPage />}></Route>
          <Route path="/patient" element={<PatientDetailsPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>);