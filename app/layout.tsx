import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atu-gpa.vercel.app"),

  title: {
    default: "ATU ÜOMG Sistemi",
    template: "%s | ATU ÜOMG Sistemi",
  },

  description:
    "Azərbaycan Tibb Universiteti tələbələrinin ÜOMG məlumatlarını təhlükəsiz şəkildə daxil etməsi üçün hazırlanmış sistem.",

  applicationName: "ATU ÜOMG",

  keywords: [
    "ATU",
    "Azərbaycan Tibb Universiteti",
    "ÜOMG",
    "GPA",
    "Student",
    "Medical University",
  ],

  authors: [
    {
      name: "Bəhruz Abasov",
    },
  ],

  creator: "Bəhruz Abasov",

  robots: {
    index: false,
    follow: false,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="transition-colors duration-300">{children}</body>
    </html>
  );
}
