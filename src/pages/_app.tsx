import { Inter as FontSans } from "next/font/google";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
