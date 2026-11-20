import "./globals.css";

export const metadata = {
  title: "HeritagePulse – Smart Heritage Site Crowd Management System",
  description: "Next-generation smart tourism platform delivering real-time historical insights, ticket pricing, time-slot availability, and live crowd monitoring for major Indian heritage sites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
