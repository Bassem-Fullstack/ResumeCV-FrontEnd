


"use client"
import { useState } from "react"

 
import { X } from "lucide-react"



export default function JobTitle ( { close , submit , open } ) {


 const [jobTitle , setJobTitle] = useState("")   



 if(!open) return ; 


 const handleSubmit = (e) =>{


e.preventDefault()

if(!jobTitle.trim()) return // اخرج برة فونشين ومتنفذهاش لو مفيش قيمة عندك وكمان لو فية مسافة الغيها يعني نضمن ان هو ميبعتش حقل فاضي او مفيهوش "" مسافات


submit(jobTitle)

setJobTitle("") 

}



return(

 <div className="fixed inset-0 w-full bg-black/50 flex items-center justify-center z-50 px-4">

 <div className=" bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">

  <button onClick={close} className="absolute top-4  right-4 text-red-500 hover:text-red-700">
  
  <X size={20}/>

  </button>


  <h2 className="text-xl font-bold text-gray-900 mb-2">Create a Resume</h2>
   
   <p className="text-gray-500 text-sm mb-5">
    
    Enter Your Job Title

    </p>

   
   <form onSubmit={handleSubmit} className="flex flex-col gap-4">

    <input

    type="text"

    value={jobTitle}

    onChange={(e)=> setJobTitle(e.target.value)}

     placeholder="For Example HR"
      
     className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
    
    />


   <button type="submit" className="bg-gradient-to-r from-purple-600 to-orange-300 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">Create Resume</button>

   </form>


 </div>

 </div>   


)



}





