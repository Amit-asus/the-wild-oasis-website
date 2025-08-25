"use client";
import { set } from "date-fns";
import React, { createContext, useContext, useState } from "react";

const initialState = { from: undefined, to: undefined };

const reservationContext = createContext(null);
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <reservationContext.Provider value={{ range, setRange, resetRange}}>
      {children}
    </reservationContext.Provider>
  );
}

export default ReservationProvider;

function useReservation() {
  const context = useContext(reservationContext);
  if (!context) {
    throw new Error("context was used outside provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
