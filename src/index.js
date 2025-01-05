import axios from 'axios';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isAuthenticated, validateToken } from './Components/Authenticator';
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
import { setCurrentUser } from './Redux/user';

export default function App() {
  const user = useSelector((state) => state.userReducer?.user)
  const authenticated = isAuthenticated(user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (validateToken() && !authenticated) {
      axios.get(`${process.env.REACT_APP_API_URI}/user`, { headers: { token: localStorage.getItem('token') } })
        .then(function (response) { dispatch(setCurrentUser(response.data.user)); })
        .catch(function (error) { });
    }
  }, [dispatch, authenticated])

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={authenticated ? <AccountPage /> : <SignInPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/add" element={<AddPage />}></Route>
          <Route path="/today" element={<TodayPage />}></Route>
          <Route path="/calendar" element={<CalendarPage />}></Route>
          <Route path="/patients" element={<PatientsListPage />}></Route>
          <Route path="/patient" element={<PatientDetailsPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>);