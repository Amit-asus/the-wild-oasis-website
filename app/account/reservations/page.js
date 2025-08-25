import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings } from "@/app/_lib/data-service";

export const metadata = {
  title: "Your Reservations",
  description: "Manage your reservations",
};
export default async function Page() {
  console.log("reservations page start");
  // CHANGE
  const session = await auth();
  console.log("sessionReservationPage", session);
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList  bookings={bookings}/>
      )}
    </div>
  );
}
