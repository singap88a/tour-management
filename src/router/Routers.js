import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import TourDtails from "../components/TourDetails/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import About from "../pages/About";
import ProtectedRoute from "./ProtectedRoute";
import BookingConfirmation from "../pages/BookingConfirmation";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import MoreTours from "../pages/MoreTours";

export default function Routers() {
  return (
    <div>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:country" element={<TourDtails />} />
        <Route
          path="/search-results"
          element={<ProtectedRoute element={<SearchResultList />} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/more-tours" element={<MoreTours />} />

      </Routes>
    </div>
  );
}
