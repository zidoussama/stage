// src/app/(auth)/layout.tsx

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 
          This is the layout for the auth pages.
          Notice there is no <Navbar /> or <Footer />.
          You could have a minimal header or branding here if you want.
        */}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}