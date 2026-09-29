import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FontAwesomeConfig from "./fontawesomes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='h-full'>
      <head>
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <FontAwesomeConfig />

        {/* ✅ ADD THIS */}
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>

      <body className='h-full m-0 p-0'>
        {children}
      </body>
    </html>
  )
}