import React from "react";
import ReservationForm from "./ReservationForm";
import DateSelector from "./DateSelector";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();
  console.log('sessionReservation', session)
  return (
    <div className="grid grid-cols-2  border-x-primary-500 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        c
        settings={settings}
        lassName="border"
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} className="" user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
