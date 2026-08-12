

import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
    >
      <body className="bg-gray-950">

       

    <main>{children}</main>

    

      

      </body>
      
     
    </html>
  );
}
