"use client";
import Image from "next/image";
import "../app/_styles/globals.css";
import bg from "@/public/bg.png";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <main className="mt-24">
        <Image
          src={bg}
          alt="Mountains and forests with two cabins"
          fill
          className="object-cover object-top"
          placeholder="blur"
          quality={80}
        />

        <div className="relative z-10 text-center">
          <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
            Welcome to paradise.
          </h1>
          <a
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Explore luxury cabins
          </a>
        </div>
      </main>
    </QueryClientProvider>
  );
}
