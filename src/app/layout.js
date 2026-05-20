import "./globals.css";
import AppNavber from "@/components/AppNavber";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PetNest",
  description: "Pet adoption platform for finding loving homes.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full bg-slate-50 text-slate-900" suppressHydrationWarning>
        <Providers>
          <AppNavber />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
