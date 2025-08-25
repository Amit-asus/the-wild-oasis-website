import React from "react";
import { auth } from "../_lib/auth";



const page = async () => {
  const session = await auth();
  console.log("session in account page", session);
  const firstName = session?.user?.name.split(" ").at(0);
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      welcome {firstName}
    </h2>
  );
};

export default page;
