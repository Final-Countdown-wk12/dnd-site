import FullSidebarAccordion from "./components/SidebarAccordian";
import GlobalDiceRoller from "./components/GlobalDiceRoller";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";
import { dark } from "@clerk/themes";

export const metadata = {
  title: "The  Nexus",
  description: "Your D&D companion app",
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <FullSidebarAccordion />
          <GlobalDiceRoller />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
