import { Providers } from "@/components/providers";
import Navbar from "@/components/sections/navbar/default";
import FooterSection from "@/components/sections/footer/default";

export default function ExternalPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterSection />
    </Providers>
  );
}
