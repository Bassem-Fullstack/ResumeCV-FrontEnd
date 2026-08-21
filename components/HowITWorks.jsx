


"use client" 


import { motion } from "framer-motion";


export default function ResumWorks () {


return(

<section className="text-white w-full max-w-7xl px-5 mx-auto py-10">

  <motion.div className="flex flex-col items-center mb-16"
  
  
     initial={{opacity : 0 , y : 100}}

       whileInView = {{ opacity : 1 , y:0 }}

        transition={ { duration : 0.62 , ease : "easeOut" } }
        
        viewport={{amount : 0.28 , once : true}}
  
  >
    <h2 className="text-5xl font-extrabold tracking-tight leading-tight text-center text-purple-500">
      How <span className="bg-gradient-to-r from-[#bf00e2] to-[#f9782c] text-transparent bg-clip-text">Resum</span> <span className="text-gray-900">Works</span>
    </h2>
    <p className="text-center text-gray-500 text-base leading-relaxed mt-4">
      Create a professional resume in just three steps.
    </p>
  </motion.div>

  <motion.div className="flex flex-col md:flex-row justify-center items-center w-full gap-8"
  
  initial={{opacity : 0 , y : 100}}

       whileInView = {{ opacity : 1 , y:0 }}

        transition={ { duration : 0.72 , ease : "easeOut" } }
        
        viewport={{amount : 0.28  , once :true}}
  
  >

    <div className="flex flex-col items-center text-center gap-3 flex-1 max-w-xs mx-auto">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#bf00e2] to-[#f9782c] text-white font-bold text-lg">
        1
      </div>
      <h4 className="text-gray-900 font-semibold text-lg">Enter Your Details</h4>
      <p className="text-gray-500 text-sm leading-relaxed">
        Add your experience, education, skills, or just paste your existing resume content.
      </p>
    </div>

    <div className="flex flex-col items-center text-center gap-3 flex-1 max-w-xs mx-auto">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#bf00e2] to-[#f9782c] text-white font-bold text-lg">
        2
      </div>
      <h4 className="text-gray-900 font-semibold text-lg">Let AI Do the Work</h4>
      <p className="text-gray-500 text-sm leading-relaxed">
        Our AI instantly structures, rewrites, and optimizes for recruiters.
      </p>
    </div>

    <div className="flex flex-col items-center text-center gap-3 flex-1 max-w-xs mx-auto">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#bf00e2] to-[#f9782c] text-white font-bold text-lg">
        3
      </div>
      <h4 className="text-gray-900 font-semibold text-lg">Download & Apply</h4>
      <p className="text-gray-500 text-sm leading-relaxed">
        Download your resume in PDF format.
      </p>
    </div>

  </motion.div>

</section>

)

}







