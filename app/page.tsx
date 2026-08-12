import Comments from "@/components/comments";
import ResumWorks from "@/components/HowITWorks";
import { SecondSection } from "@/components/secondSection";

import HeroSection from "@/components/heroSection";

import Navbar from "@/components/Navbar";

import  AuthCheck from "@/components/refershToken";

export default function Home() {
  
return (


<>
    
 <AuthCheck>

 <Navbar/>

  <HeroSection/>

  <SecondSection/>

   <ResumWorks/>

     <Comments/>

    </AuthCheck>
  
</>
    
)
  
 
}
