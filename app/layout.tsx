import "@/global.css";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers/Provides";

type RootLayoutProps = {
  children: React.ReactNode;
};

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fake store",
  description: "Test application fake store",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
