import { Toaster } from "sonner";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsappFab } from "@/components/layout/WhatsappFab";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsappFab />
      <Toaster
        theme="dark"
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "!rounded-none !border !border-ivory/15 !bg-noir-soft !text-ivory",
            title: "!font-display !tracking-tight !text-ivory",
            description: "!text-ivory-dim",
            success:
              "!border-emerald-500/40 !bg-emerald-500/10 !text-emerald-100",
          },
        }}
      />
    </>
  );
}
