


"use client"
import api from "@/lib/api"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Mail, Phone, MapPin, X, Download } from "lucide-react"
import AuthCheck from "@/components/refershToken"
import { usePDF } from "react-to-pdf"

import { motion } from "framer-motion"

interface RawInput {

fullName : string 

email : string 

phone : string 

summary : string 

address: string 


} 


interface WorkExperience {

company : string 

position : string 

duration : string 

bullets : string[] 

}


interface Language {
  name: string

  level: string
}



interface Education {

school : string 

degree : string 

year : string 

certification? : string 

}


interface GeneratedContent {

  summary: string

  experience: WorkExperience[]

  education: Education[]

  skills: string[] 

  languages : Language []

}


interface CV {

  _id: string

  jobTitle: string

  rawInput: RawInput

  generatedContent: GeneratedContent

  createdAt: string

  updatedAt: string

}






export default function BuilderEdit () {


const [loading , setLodaing] = useState(true)  


const [ cv , setCV ] = useState <CV | null > (null)


const [orginalCV , setOrginalCV] = useState <CV | null > (null)

const [editCV , setEditCv] = useState(false)


const [save , setSave] = useState(false)




const router = useRouter() 


const {id} = useParams()



useEffect(() => {


const fetchDate = async()=>{


 try {
   
  const res = await api.get(`/cv/${id}`)

   setCV(res.data.getOneCV)

    setOrginalCV(res.data.getOneCV)
 }


 catch(err) {

   console.log(err)

   router.push("/dashboard")

 }


finally{
 
setLodaing(false)

}

}


fetchDate()

} , [])



const updateCV = ( key : string , value :any ) => {


if(!cv)return 


setCV({

 ...cv ,

 generatedContent : {...cv.generatedContent , [key] : value}

})


}




const updateRawInput = ( key : string , value :any ) => {


if(!cv)return 


setCV({

 ...cv ,

 rawInput : {...cv.rawInput , [key] : value}

})


}




const handleSave = async() => {

if(!cv) return 


setSave(true) 


try {
       
       await api.patch(`/cv/update/${id}` , {
       
        generatedContent : cv.generatedContent
        
       })


      setOrginalCV(cv) //  بنحدث الستيت بتاعنا فية نسخة اصلية بنحدث سي في بتاعنا بس  
      
      setEditCv(false) // خلاص خلصنا تعديل سيف 


}

catch(err) {

console.log(err)

}


finally {

setSave(false)

}


}




const updateExperience = (filed : string , index : number , value : string) => {

if (!cv) return;

const updateExperiencValues = [...cv?.generatedContent.experience]


updateExperiencValues[index] = {


...updateExperiencValues[index] ,

[filed] : value

}


setCV({

...cv ,

generatedContent : {

...cv?.generatedContent,

 experience : updateExperiencValues

}

})



} 





const updateEducation = (filed : string , index : number , value : string) => {

if (!cv) return;

const updateExperiencValues = [...cv?.generatedContent.education]


updateExperiencValues[index] = {


...updateExperiencValues[index] ,

[filed] : value

}


setCV({

...cv ,

generatedContent : {

...cv?.generatedContent,

 education : updateExperiencValues

}

})



} 







const updateLanguage = (filed : string , index : number , value : string) => {

if (!cv) return;

const updateExperiencValues = [...cv?.generatedContent.languages]


updateExperiencValues[index] = {


...updateExperiencValues[index] ,

[filed] : value

}


setCV({

...cv ,

generatedContent : {

...cv?.generatedContent,

 languages : updateExperiencValues

}

})



} 





const updateSkill = (index: number, value: string) => {

  if (!cv) return;

  setCV({

    ...cv,

    generatedContent: {

      ...cv.generatedContent,

      skills: cv.generatedContent.skills.map((skill, i) =>

        i === index ? value : skill

      )
    }
  })
}




const updateJobTitle = (value: string) => {
  if (!cv) return
  setCV({
    ...cv,
    jobTitle: value
  })
}


const handleCancel = () => {

setCV(orginalCV) 

setEditCv(false)

}





if (loading || !cv) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-[#8722fb] rounded-full animate-spin" />
      </div>
    </div>
  )
}





return(
   
  <AuthCheck>

  <div className="min-h-screen bg-gray-100 p-3 sm:p-6 md:p-10">


 <div className="max-w-[794px] flex flex-wrap items-center justify-end gap-2.5 mb-4 print:hidden"> 



           
        {

         !editCV && cv && (

        
          <motion.button
          
        initial={{opacity : 0 , y : -60}}

       animate = {{ opacity : 1 , y:0 }}

       transition={ { duration : 0.72 , ease : "easeOut" } }

          viewport={{once : true}}

         onClick={()=> window.print()}

          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-gray-50 transition-colors text-xl bg-red-500 hover:bg-red-600 "

          >

         <Download size={20}/>
         
          Download PDF 

          </motion.button>
       

         ) 

        }  
        



 {
  editCV ? (
   

 <>
  
<motion.button onClick={handleSave} className="flex items-center gap-1.5 px-7 hover:bg-green-600 transition-colors py-2 rounded-lg   text-gray-50 text-xl bg-green-500"

  initial={{opacity : 0 , x : -100}}

  animate = {{ opacity : 1 , x:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

    viewport={{once : true}}
>
    
   Save 
    
    </motion.button>


 <motion.button onClick={handleCancel} className="flex items-center gap-1.5 hover:bg-red-500 px-5 py-2 rounded-lg transition-colors text-xl bg-red-600 text-gray-50"
 
   initial={{opacity : 0 , x : 100}}

   animate = {{ opacity : 1 , x:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

    viewport={{once : true}}
 
 >
   
   Cancel 
   
 </motion.button>

  

 </>


  ) 
  
  : <motion.button onClick={()=> setEditCv(true)} className="flex text-xl items-center gap-1.5 px-6 py-2 rounded-lg text-gray-50 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
  
  
    initial={{opacity : 0 , y: -60}}

      animate = {{ opacity : 1 , y:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

    viewport={{once : true}}
  
  >
    


      Edit CV 

    </motion.button>

 }

 

 



 </div>  {/* max-w-3xl mx-auto flex justify-end gap-3 mb-4 */}


  
 <div className="w-full flex justify-center pb-6">
    
   <motion.div className="cv-template w-full max-w-[794px] min-h-auto print:min-h-0 bg-white p-4 sm:p-8 mx-auto shadow-lg border sm:rounded-none rounded-lg border-gray-300"
   
     initial={{opacity : 0 , x : 100}}

      whileInView = {{ opacity : 1 , x:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

    viewport={{once : true}}
   
   
   > 
  
  <div className="border-b-[3px] border-gray-400 text-center pb-6 mb-6">

   
   {
    editCV ? (

       <> 
       <input
      value={cv.rawInput?.fullName}
      onChange={(e) => updateRawInput("fullName", e.target.value)}
      placeholder="Full Name"
      className="text-2xl sm:text-3xl text-[#1f4e79] font-bold mb-2 text-center w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />

     
    <input
      value={cv.rawInput?.email}
      onChange={(e) => updateRawInput("email", e.target.value)}
      placeholder="Email"
       className="flex-1 p-1.5 border border-gray-300 rounded text-md focus:outline-none focus:border-blue-500"
    />


    <input
      value={cv.rawInput?.phone}
      onChange={(e) => updateRawInput("phone", e.target.value)}
      placeholder="Phone"
       className="flex-1 p-1.5 border border-gray-300 rounded text-md focus:outline-none focus:border-blue-500"
    />

   <input
      value={cv.rawInput?.address}
      onChange={(e) => updateRawInput("address", e.target.value)}
      placeholder="Address"
       className="flex-1 p-1.5 border border-gray-300 rounded text-md focus:outline-none focus:border-blue-500"
    />

 <input
      value={cv.jobTitle}
      onChange={(e) => updateJobTitle(e.target.value)}
      placeholder="Job Title"
       className="flex-1 p-1.5 border border-gray-300 rounded text-md focus:outline-none focus:border-blue-500"
    />


   </>

    ) 

     : 
     (
        
     <>

       <h1 className="text-2xl sm:text-3xl text-[#1f4e79] tracking-tight font-bold mb-2"> {cv.rawInput?.fullName} </h1>

      
   <p  className="text-base sm:text-lg text-gray-600 font-medium mb-3"> {cv.jobTitle} </p> 

<div className="flex justify-center items-center gap-x-3 gap-y-1 flex-wrap text-xs sm:text-sm text-gray-600">

              {cv.rawInput?.email && (

              <span className="flex items-center gap-1.5">

                  {cv.rawInput.email} |

              
              </span>
            )}

            {cv.rawInput?.phone && (

              <span className="flex items-center gap-1.5">


                <span>{cv.rawInput.phone} | </span>

              </span>
            )}

            {cv.rawInput?.address && (
              <span className="flex items-center gap-1.5">


                <span>{cv.rawInput.address}</span>

              </span>
            )}

  </div> {/*  flex justify-center items-center gap-4 flex-wrap */}


       </>
     )

   }


  </div> {/*  border-b pb-4 mb-6  */}

  

<div className="space-y-1 ">

   <h2 className="text-lg border-b pb-2 border-gray-400 font-semibold text-[#1F4E79] tracking-wide uppercase">Summary</h2>
   
      {

        editCV ? (
           
         <textarea
         
          value={cv.generatedContent.summary}
          
          onChange={(e)=> updateCV("summary" , e.target.value)}
          
           rows={4}

          className="w-full p-2  bg-gray-100 focus:outline-none rounded focus:outline-gray-500"

         />

        ) 
        
         :
     
        (

        <p className="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-line"> {cv.generatedContent.summary} </p>

        )


      }



</div> {/*  space-y-2 */}



{
 cv.generatedContent.experience && (


  <div className="cv-section space-x-0 mt-5">

  <h2 className="text-lg border-b pb-2 border-gray-400  font-semibold text-[#1F4E79] tracking-wide uppercase">Work Experience</h2>



   <div className="space-y-6">

    {
       cv.generatedContent.experience.map((exp , index) => (

        <div key={index} className="space-y-2"> 
        
           
         {
          editCV ? (

           <>

         <div className="space-y-2 p-3 bg-gray-50 border border-gray-300 rounded">

         <div className="flex gap-2">

          <input
         
          value={exp.position}
          
          onChange={(e)=> updateExperience("position" , index , e.target.value)}
         

          className="w-1/2 p-2 border rounded focus:outline-gray-500"

         />

        <input
         
          value={exp.company}
          
          onChange={(e)=> updateExperience("company" , index , e.target.value)}
            
          className="w-full p-2 border-gray-300 focus:outline-none rounded focus:outline-gray-500"

         />

      <input
         
          value={exp.bullets}
          
          onChange={(e)=> updateExperience("bullets" , index , e.target.value)}
            
          className="w-full p-2 border rounded focus:outline-gray-500"

         />

         <input
         
          value={exp.duration}
          
          onChange={(e)=> updateExperience("duration" , index , e.target.value)}
            
          className="w-full p-2 border rounded focus:outline-gray-500"

         />
         
         

        </div>  {/*  flex gap-2 */}

        </div>  {/*  space-y-2 p-3 bg-gray-50 border */}    
   
   </> 

          ) 

          : (
         <>

         <div className="flex flex-row  justify-between items-baseline">

         <h3 className="text-base pt-2 sm:text-md font-semibold text-gray-900 min-w-0 flex-1 "> • {exp.position} | <span className="text-[#1F4E79]">{exp.company}</span></h3>

        <span className="text-[15px] text-gray-600 font-medium"> {exp.duration} </span>

         </div> {/*  flex flex-row justify-between  */}
         
         <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 font-medium">

         <span className="text-xs sm:text-sm text-gray-800 leading-relaxed pl-2"> {exp.bullets} </span>

         </div> {/*  flex flex-wrap items-center gap-2 */}
          

        </>

          )

         }  


    </div>  //{/*  space-y-2 */}

       ))       
 
    }


   </div> {/*  space-y-6  */}



  </div> //{/*  space-x-4 mt-70  */}
  

 )}

 

   {
     
     cv.generatedContent.skills&&(

      <div className="mt-7 cv-section space-y-2">

      <h2 className="text-lg border-b pb-2 border-gray-400 font-semibold text-[#1F4E79] tracking-wide uppercase">Skills</h2>
      
        <div className="flex flex-col gap-3 pt-1">
         
         {
          
          cv.generatedContent.skills.map((skill , index) => (
            
          <div key={index} >

         
{
 
 editCV ? (

        <input
          type="text"
          value={skill}
          onChange={(e) => updateSkill(index, e.target.value)}
          className="w-full p-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
        />

 ) 

 
  : (

<span className="text-gray-900 text-[14px] font-medium p-1">

          <span className="font-bold text-md">•</span>  {skill}

        </span>


  )}
 
</div> // {/* div key={index}  */}
 
))}

        </div> {/*  flex flex-col flex-wrap gap-3 pt-1  */}

      </div> // {/*  mt-7 space-y-2  */}

     )}


  {cv.generatedContent?.education && (
  <div className="cv-section mt-6 space-y-3">
    <h2 className="text-lg border-b pb-1 border-gray-400 font-semibold text-[#1F4E79] tracking-wide uppercase">
      Education
    </h2>

    <div className="space-y-3 pt-1">
      {cv.generatedContent.education.map((educ: any, index: number) => (
        <div key={index} className="text-sm">
          {editCV ? (
            /* وضع التعديل */
            <div className="flex flex-col sm:flex-row gap-2 w-full p-2 bg-gray-50 border border-gray-300 rounded">
              <input
                type="text"
                placeholder="Degree (e.g. B.Sc. Computer Science)"
                value={educ.degree || ""}
                onChange={(e) => updateEducation("degree", index, e.target.value)}
                className="w-full sm:w-1/2 p-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="School / University"
                value={educ.school || ""}
                onChange={(e) => updateEducation("school", index, e.target.value)}
                className="w-full sm:w-1/2 p-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Year (e.g. 2020 - 2024)"
                value={educ.year || ""}
                onChange={(e) => updateEducation("year", index, e.target.value)}
                className="w-full sm:w-1/4 p-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            /* وضع العرض */
            <div className="flex justify-between items-baseline gap-2 sm:gap-4">
              <p className="text-gray-800 leading-normal min-w-0 flex-1 break-words">
                {educ.degree && (
                  <span className="font-bold text-gray-900 text-[14px]">• {educ.degree}</span>
                )}
                {educ.school && (
                  <span className="text-gray-800 text-[14px]"> — {educ.school}</span>
                )}
              </p>

              {educ.year && (
                <span className="text-[14px] font-medium text-gray-600 shrink-0 whitespace-nowrap text-right">
                  {educ.year}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}




{cv.generatedContent?.languages?.length > 0 && (
  <div className="cv-section mt-4">
    <h2 className="text-lg mb-3 border-b pb-1 border-gray-400 font-semibold text-[#1F4E79] tracking-wide uppercase">
      Languages
    </h2>

    <div className="flex flex-col gap-2 p-1">
      {cv.generatedContent.languages.map((lang: any, i: number) => (
        <div key={i}>
          {editCV ? (
            /* وضع التعديل */
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Language (e.g. English)"
                value={lang.name || ""}
                onChange={(e) => updateLanguage("name", i, e.target.value)}
                className="w-1/2 p-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Level (e.g. Native / Fluent)"
                value={lang.level || ""}
                onChange={(e) => updateLanguage("level", i, e.target.value)}
                className="w-1/2 p-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            /* وضع العرض */
            <span className="text-gray-800 text-[15px]">
              <span className="font-bold text-sm">•</span> {lang.name}{" "}
              {lang.level && <span className="text-gray-500">— {lang.level}</span>}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
)}



 </motion.div> {/*  bg-white rounded-xl text-gray-950  */}


 </div> {/*  min-h-screen bg-gray-100 p-3 sm:p-6 md:p-10 */}

  </div>  {/* w-full overflow-x-auto pb-6 */}

</AuthCheck>
)









}













