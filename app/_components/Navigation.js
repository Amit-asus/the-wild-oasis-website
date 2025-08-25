import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
export default async function Navigation() {
  const session = await auth();
  console.log("session", session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="text-white hover:text-accent-400 transition-colors "
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-white hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-2 text-white hover:text-accent-400 transition-colors"
            >
              <span> Guest area&nbsp;&nbsp;&nbsp;</span>
              {/* {JSON.stringify(session.user.image)} */}
              <Image
                width={50}
                height={50}
                src={session?.user?.image}
                alt="some"
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : (
            <Link
              href="/account"
              className="text-white hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
