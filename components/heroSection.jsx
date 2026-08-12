










"use client"

import { ArrowRight, Check, Sparkles } from "lucide-react"
import { useTypewriter  , Cursor } from "react-simple-typewriter"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function HeroSection () {

const [text] = useTypewriter({

words : [" Minutes"] ,

loop : true ,

typeSpeed : 80 ,

delaySpeed : 1200 ,

deleteSpeed : 50


})


const [isLogged , setLogged] = useState(false)


return (

 <>
 
 <section className="flex flex-col items-center text-center sm:px-6 px-4 md:py-20 sm:py-14 py-10">

  <motion.p className="flex items-center gap-2 mb-6 bg-gradient-to-r from-[#7c1dfb] 
  
   to-[#a400d6] text-white font-semibold text-base px-4 py-2 

   rounded-full shadow-md  hover:shadow-lg t"
  
 initial={{ opacity: 0, y: -50 }}

  whileInView = {{ opacity : 1 , y:0 }}
 
    transition={{ duration: 0.55, ease: "easeOut" }}

    whileHover={{ scale: 1.05 }}

    whileTap={{ scale: 0.97 }}
 
 > 

  <Sparkles size={18}/> 
  
  AI Power 
  
  </motion.p>

  <motion.h1 className="font-extrabold mb-5 tracking-tight leading-tight text-gray-100 text-5xl md:text-6xl"
  
    initial={{opacity : 0 , y : 100}}

   whileInView = {{ opacity : 1 , y:0 }}

    transition={ { duration : 0.65 , ease : "easeOut" } }
  
  >
    

    Professional {" "} <span className="bg-gradient-to-r from-[#8722fb] to-[#bf00e2] text-transparent bg-clip-text"> 
        
    Resume </span> <br/> In {" "} <span className="bg-gradient-to-r from-[#7c1dfb] to-[#a400d6] text-transparent bg-clip-text">{text} </span> <span>With</span> <span className="bg-gradient-to-r from-[#8722fb] to-[#bf00e2] text-transparent bg-clip-text">AI</span> </motion.h1>

   <motion.p className="max-w-2xl mb-8 text-gray-400 leading-relaxed text-xl"
   
      initial={{opacity : 0 , y : 100}}

      whileInView = {{ opacity : 1 , y:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

> 
   
   Stop wasting hours formatting resumes.<br/> Get a job-ready CV in mintues with AI </motion.p>
   
 <motion.div
          initial={{ opacity: 0, y: 100 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.78, ease: "easeOut" }}

          whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}

          whileTap={{ scale: 0.97, transition: { duration: 0.3, ease: "easeOut" } }}
        >

   <Link href={ isLogged ? "/dashboard" : "/login" }

   className="flex items-center gap-2 bg-gradient-to-r from-[#8722fb] 
   
    to-[#c300e0] hover:from-[#cc1bcf] hover:to-[#f9782c] text-white

    px-8 py-4 rounded-xl text-xl font-bold shadow-md hover:shadow-lg"
    
    
  //     initial={{ opacity: 0, y: 100 }}

  //   whileInView = {{ opacity : 1 , y:0 }}

  //   transition={{ duration: 0.78, ease: "easeOut" }}

  // whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}

  // whileTap={{ scale: 0.97, transition: { duration: 0.3 , ease: "easeOut"  } }}
    
    >
    
    Start Building <ArrowRight size={20}/>

     </Link>

  </motion.div>

 <motion.div className="mt-10 text-gray-100 flex flex-wrap justify-center gap-x-8 gap-y-4"
 
 initial={{opacity : 0 , y : 100}}

  whileInView = {{ opacity : 1 , y:0 }}

    transition={ { duration : 0.82 , ease : "easeOut" } }
 
 >
 
 <p className="flex items-center gap-2 text-[15px]"> <Check size={20} className="text-[#8322fc]" /> Build in mintues with AI </p>

 <p className="flex items-center gap-2 text-[15px]"> <Check size={20} className="text-[#8322fc]" /> Zero Design work  </p>

  <p className="flex items-center gap-2 text-[15px]" > <Check size={20} className="text-[#8322fc]" /> Fast generation  </p>


 </motion.div>



 </section>

 </>

)






}



















