export const dynamic = "force-dynamic";

import "./globals.css";

import AuthCheck from "@/components/refershToken"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
    >
      <body className="bg-gray-100">

       
   

    <main>{children}</main>

 
    

      

      </body>
      
     
    </html>
  );
}
