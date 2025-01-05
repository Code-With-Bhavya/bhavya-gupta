import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});


export const metadata = {
  title: "Bhavya Gupta || Portfolio",
  description: "Bhavya Gupta's Portfolio. I am a Full Stack Web Developer. I am a enthusiast in web development and I love to work on new projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
