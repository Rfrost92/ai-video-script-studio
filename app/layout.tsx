import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
    title: "AI Video Script Studio",
    description: "Generate high-converting video scripts with AI."
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            {children}
        </div>
        </body>
        </html>
    );
}
