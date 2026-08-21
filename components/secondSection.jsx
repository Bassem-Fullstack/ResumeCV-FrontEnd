
"use client"

import { useState } from "react";

import { motion } from "framer-motion";

export const SecondSection = () => {

    const [isHover, setIsHover] = useState(false);

    return (
        <> 
           <div className="flex flex-col items-center my-10">

        <motion.div className="flex items-center mb-5 gap-2 text-gray-900 border border-[#7c1dfb] rounded-full px-5 py-2"
        
         initial={{opacity : 0 , y : 100}}

       whileInView = {{ opacity : 1 , y:0 }}

        transition={ { duration : 0.62 , ease : "easeOut" } }
        
        viewport={{amount : 0.28 , once : true }}
        
        
        >
    
            <div className="relative flex size-3.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#8722fb] opacity-75 animate-ping duration-300"></span>
                <span className="relative inline-flex size-2 rounded-full bg-[#c300e0]"></span>
            </div>
            <span>Simple Process</span>
           
        </motion.div>

         <motion.div className="flex flex-col items-center gap-2 text-gray-500 px-6"
         
         
          initial={{opacity : 0 , y : 100}}

          whileInView = {{ opacity : 1 , y:0 }}

        transition={ { duration : 0.72 , ease : "easeOut" } }
        
        viewport={{amount : 0.3 , once : true }}
         
         
         >
            
           <h2 className="text-3xl font-bold text-center text-gray-900">Build your resume</h2>
            
            <span className="text-sm text-center leading-6"> Our streamlined process helps you create a professional <br/> resume in minutes with intelligent AI-powered tools and features .</span>

           </motion.div>



            <div className="flex flex-col md:flex-row items-center justify-center">
                <motion.img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" 
                
                
             initial={{opacity : 0 , y : 100}}

         whileInView = {{ opacity : 1 , y:0 }}

        transition={ { duration : 0.82 , ease : "easeOut" } }
        
        viewport={{amount : 0.28 , once : true }}
                
                />

                <motion.div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                    
                    
                 initial={{opacity : 0 , y : 100}}

             whileInView = {{ opacity : 1 , y:0 }}

           transition={ { duration : 0.86 , ease : "easeOut" } }
        
             viewport={{amount : 0.28 , once : true}}
                    
                    >
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">AI-Powered Content</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Instantly generate professional summaries and work experience tailored to your role.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-green-600"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">ATS-Friendly Templates</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Optimized resume layouts built to easily pass Applicant Tracking Systems.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                            <svg className="size-6 stroke-orange-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Instant Export & Customization</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Customize sections, fonts, and colors effortlessly, then download print-ready PDFs.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            </div>
            

        </>
    );
};