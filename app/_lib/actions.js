"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBooking } from "./data-service";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile");
  }
  const nationalID = formData.get("nationalID").toString().trim();
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const updateData = { nationality, nationalID: nationalID, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
  return data;
}
export async function signInAction() {
  return signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: "/" });
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to delete a reservation");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);
  if (error) {
    console.error(error);
    throw new Error("Reservation could not be deleted");
  }
  //revalidate the cache;
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  // 1. Authentication check
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile");
  }

  // 2. Extract values from formData
  const id = formData.get("id");
  const updatedData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  // 3. Update booking in Supabase
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  // 4. Error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // 5. Revalidate & redirect
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${id}`);
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  console.log("data we got in the createBooking function is ", formData);
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to delete a reservation");
  }

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    guestId: session.user.guestId,
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
