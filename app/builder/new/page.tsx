// "use client"
// import { useSearchParams, useRouter } from "next/navigation"
// import { useState } from "react"
// import api from "@/lib/api"
// import AuthCheck from "@/components/refershToken"  
// export default function BuilderNew() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const jobTitle = searchParams.get("JobTitle") || ""

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     summary: "",
//     skills: "", // هنكتبها كنص واحد مفصول بفاصلة، وهنحولها array قبل الإرسال
//     experience: [{ company: "", position: "", duration: "", description: "" }],
//     education: [{ school: "", degree: "", year: "" }],
//   })

//   // تحديث حقل بسيط (اسم، إيميل، ...)
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   // تحديث حقل جوه array الخبرة
//   const handleExperienceChange = (index: number, field: string, value: string) => {
//     const updated = [...formData.experience]
//     updated[index] = { ...updated[index], [field]: value }
//     setFormData({ ...formData, experience: updated })
//   }

//   const addExperience = () => {
//     setFormData({
//       ...formData,
//       experience: [...formData.experience, { company: "", position: "", duration: "", description: "" }],
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const res = await api.post("/cv/generate", {
//         jobTitle,
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         summary: formData.summary,
//         skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
//         experience: formData.experience,
//         education: formData.education,
//       })

//       router.push(`/builder/${res.data.createCV._id}`)
//     } catch (err) {
//       setError("حصل خطأ أثناء إنشاء السي في، حاول تاني")
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (

//     <AuthCheck>
//     <div className="max-w-2xl mx-auto py-12 px-4">
//       <h1 className="text-2xl font-bold mb-6 text-gray-50">إنشاء سي في لوظيفة: {jobTitle}</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//         <input
//           name="fullName"
//           placeholder="الاسم بالكامل"
//           value={formData.fullName}
//           onChange={handleChange}
//           className="border border-gray-300 rounded-lg px-4 py-3"
//           required
//         />

//         <input
//           name="email"
//           type="email"
//           placeholder="البريد الإلكتروني"
//           value={formData.email}
//           onChange={handleChange}
//           className="border border-gray-300 rounded-lg px-4 py-3"
//         />

//         <input
//           name="phone"
//           placeholder="رقم الموبايل"
//           value={formData.phone}
//           onChange={handleChange}
//           className="border border-gray-300 rounded-lg px-4 py-3"
//         />

//         <textarea
//           name="summary"
//           placeholder="نبذة عن نفسك (اختياري)"
//           value={formData.summary}
//           onChange={handleChange}
//           className="border border-gray-300 rounded-lg px-4 py-3 min-h-[80px]"
//         />

//         <input
//           name="skills"
//           placeholder="المهارات (افصل بينهم بفاصلة، مثال: Node.js, MongoDB)"
//           value={formData.skills}
//           onChange={handleChange}
//           className="border border-gray-300 rounded-lg px-4 py-3"
//         />

//         {/* قسم الخبرات */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">الخبرات العملية</h3>
//           {formData.experience.map((exp, i) => (
//             <div key={i} className="border border-gray-200 rounded-lg p-4 mb-3 flex flex-col gap-2">
//               <input
//                 placeholder="اسم الشركة"
//                 value={exp.company}
//                 onChange={(e) => handleExperienceChange(i, "company", e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2"
//               />
//               <input
//                 placeholder="المسمى الوظيفي"
//                 value={exp.position}
//                 onChange={(e) => handleExperienceChange(i, "position", e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2"
//               />
//               <input
//                 placeholder="المدة (مثال: 6 months)"
//                 value={exp.duration}
//                 onChange={(e) => handleExperienceChange(i, "duration", e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2"
//               />
//               <textarea
//                 placeholder="وصف مختصر لمهامك"
//                 value={exp.description}
//                 onChange={(e) => handleExperienceChange(i, "description", e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2"
//               />
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addExperience}
//             className="text-purple-600 text-sm font-medium"
//           >
//             + أضف خبرة تانية
//           </button>
//         </div>

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-gradient-to-r from-purple-600 to-orange-300 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
//         >
//           {loading ? "جاري الإنشاء..." : "إنشاء السي في بالذكاء الاصطناعي"}
//         </button>
//       </form>
//     </div>
    
// </AuthCheck>
//   )
// }



"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


 import api, { setAccessToken } from "@/lib/api"
import AuthCheck from "@/components/refershToken"
import Image from "next/image"
import { motion } from "framer-motion"



export default function DetailsCV () {


const [loading ,setLoading] = useState(false)


const searchURL = useSearchParams()

const getJobtitle = searchURL.get("JobTitle")

const router = useRouter()

const [error , setError] = useState("")

const [userName , setUserName] = useState<string>("")


const [formDate , setFormDate] = useState({



    fullName : "" , 

     email  : "",

     phone  : "" , 
     
     address : "" ,

    summary : "" , 

    experience : [{    company : "" , position : "" , duration : "" , description : "" }] ,

    skills :"" ,

    languages: [{ name: "", level: "" }],

    education : [ {  school :"" , degree : "" , year : "" , certification : ""}] 

})




const handleChangeInput = ( e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {


 setFormDate({ ...formDate , [e.target.name] : e.target.value})   

 
}





const addMoreExperiences = () => {

setFormDate({

 ...formDate, // عشان ميمسحش اي قيمة من قيم لفات في انبوت زاي فون وفول نيم والايميل

  experience : [...formDate.experience , { company : "" , position : "" , duration : "" , description : "" }] 

}) // عشان لو مستخدم حب يضيف اكتر من خبرة 

}



const addMoreLanguages = () => {


setFormDate({

 ...formDate ,

 languages : [...formDate.languages , { name: "", level: "" } ]


})
 

}






// بحدث كل قيمة داخل اكسبرينس و داخل تعليم برضو


const handleExperienceChange = (field:string , index:number , value:string) => {


const update = [...formDate.experience] // حاططها في مصفوفة لان انا معرفها في ستيت كمصوفة والباك اند مستني مني مصفوفة


update[index] = {

...update[index], // بنسخ خبرات للفات عشان خاطر متتمسحش

 [field] : value    

}

setFormDate({
 
  ...formDate, 

  experience : update


})


}


const handleEductionChange = (field:string , index:number , value:string) => {


const update = [...formDate.education] // حاططها في مصفوفة لان انا معرفها في ستيت كمصوفة والباك اند مستني مني مصفوفة


update[index] = {

...update[index], // بنسخ خبرات للفات عشان خاطر متتمسحش

 [field] : value    

}

setFormDate({
 
  ...formDate, 

  education : update


})


}




const handleLanguageChange = (field:string , index:number , value:string) => {


const update = [...formDate.languages] // حاططها في مصفوفة لان انا معرفها في ستيت كمصوفة والباك اند مستني مني مصفوفة


update[index] = {

...update[index], // بنسخ خبرات للفات عشان خاطر متتمسحش

 [field] : value    

}

setFormDate({
 
  ...formDate, 

  languages : update


})


}



const handleSubmit = async ( e:React.FormEvent) => {

e.preventDefault()

setError("")

setLoading(true)


try {

const res =await api.post("/cv/generate" , {

fullName : formDate.fullName ,

phone :  formDate.phone ,

email   : formDate.email ,

address : formDate.address,

jobTitle: getJobtitle ,

skills: formDate.skills.split(",").map((s) => s.trim()).filter(Boolean), // تحويل لـ array

// اقسم او قص كل كلمة او كل نص لوحدة وحطهولي في ماب طبعا ماب بيرجع مصفوفة وسكيلز هناك احنا عاملينوة مصفوفة في باك اند وبقولوة الغيلي مسافات عشان ساعات سبيلد بيسيب مسافات الغيلي مسافات بتاع كلمة واية متحطليش نص فاضي يعني لو مستخدم بعت نص فاصي مابين علامتين تنصيص زاي كدة "" لاء الغيها عشان كدة استخدمت فلتر بولين يعني فلتري قيمة ترو كلمة موجودة فقط وطيرلي قيمة فولس يعني لازم يكون قيمة فيها كلام يعني بترو 

experience : formDate.experience ,

education : formDate.education ,

languages: formDate.languages.filter((l) => l.name && l.name.trim() !== "")

})

router.push(`/builder/${res.data.createCV._id}`)

// هيوديني على cv دة على طول الايدي بتاعوة صفحة بتاعت سي في كل سي في لهو ايدي

}

catch(err) {

console.log(err)

setError("something went wrong")

}


finally {

setLoading(false)

}

}



useEffect(()=> {


const getUserName = async()=> {

try { 

const res = await api.post("/users/refreshToken")

setAccessToken(res.data.accessToken)

if(res.data.userName){

  setUserName(res.data.userName)
}

}

catch(err){
 
 console.log(err)   

}

}


getUserName()

}, [])



const handleLogout = async() => {


try {

await api.delete("/users/logout")

setAccessToken(null) 

router.push("/login")

}

catch(err){

router.push("/login")

}


}

return(

<AuthCheck>

    <div className="w-full mb-16 bg-gradient-to-r from-purple-600 to-orange-300">

     <motion.nav className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-12 py-3.5 text-slate-800 transition-colors"
     
  initial={{opacity : 0 , y : -100}}

  animate = {{ opacity : 1 , y:0 }}

  transition={ { duration : 0.6 } }

   viewport={{once : true}}


     >

      <div className="flex items-center">

       <Image className="w-auto h-10 bg-white rounded-md" height={48} width={300} alt="logo" src={"/logo4.webp"} />

      </div>

    <div className="flex items-center gap-4">


       <p className="text-md font-bold text-gray-100"> Hi , <span className="text-gray-800">{userName} </span></p>
       
       <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-gray-100 transition-all  px-7 py-1.5 rounded-full ">

        Logout
       </button>

    </div>

     </motion.nav>
    
      </div>

<div className="w-full px-4 sm:px-6">

< motion.div className="w-full max-w-2xl mx-auto px-4 py-5 bg-gradient-to-r from-gray-500 to-orange-400 rounded-lg"


    initial={{opacity : 0 , y : 100}}

      whileInView = {{ opacity : 1 , y:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

    viewport={{once : true}}


>

<h1 className="text-2xl text-center font-bold mb-6 text-gray-50"> Enter Your Details </h1>

<h1 className="text-2xl text-center font-bold mb-6 text-gray-50"> Your Job Title is : {getJobtitle} </h1>


 <form  onSubmit={handleSubmit}  className="flex flex-col gap-4 items-cente">

  <input 
   
   name="fullName"

   onChange={handleChangeInput} 
   
   value={formDate.fullName}
   
   placeholder="Full Name"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 

<input 
     
   name="email"
    
   type="email"

   onChange={handleChangeInput} 
   
   value={formDate.email}
   
   placeholder="Email@com"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 

<input 
   
   name="phone"

   onChange={handleChangeInput} 
   
   value={formDate.phone}
   
   placeholder="Phone Number"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 


<input 
   
   name="address"

   onChange={handleChangeInput} 
   
   value={formDate.address}
   
   placeholder="Address"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 




<textarea
   
   name="summary"

   onChange={handleChangeInput} 
   
   value={formDate.summary}
   
   placeholder="Summary (Optional)"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  /> 


<textarea
   
   name="skills"

   onChange={handleChangeInput} 
   
   value={formDate.skills}
   
   placeholder="Skills (Optional)"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  /> 

  

<div>

<h2 className="font-semibold px-3 mt-2 text-gray-200 mb-2"> Experinces </h2>


{
    formDate.experience.map((exp , i) => (

   <div key={i} className="flex flex-col gap-4 mb-3 pb-6 border-b border-white/40">

     <input 
   
   value={exp.position}
    
   onChange={(e) => handleExperienceChange( "position" , i , e.target.value )}

   placeholder="Your Position"

  className="w-full rounded-lg px-4 py-3 text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 
  
   
   <input 
   
   value={exp.company}
    
   onChange={(e) => handleExperienceChange( "company" , i , e.target.value )}

   placeholder="Company"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 
  

  <input 
   
   value={exp.duration}
    
   onChange={(e) => handleExperienceChange( "duration" , i , e.target.value )}

   placeholder="Duration"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 
  
  
   <textarea 
   
   value={exp.description}
    
   onChange={(e) => handleExperienceChange( "description" , i , e.target.value )}

   placeholder="Description your role last job (Optional)"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
 
  /> 
  
   </div> //{/*  flex flex-col gap-4 */}



))}


<button
    type="button"

    onClick={addMoreExperiences}

    className="text-gray-50 hover:text-blue-600 text-sm font-medium text-left"
  >
    + Add more experience
  </button>

</div>






<div>

<h2 className="font-semibold px-3 mt-5 text-gray-200 mb-2"> Education </h2>


{
    formDate.education.map((edc , i) => (

   <div key={i} className="flex flex-col gap-4">

     <input 
   
   value={edc.school}
    
   onChange={(e) => handleEductionChange("school" , i , e.target.value )}

   placeholder="School"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 
  
   
   <input 
   
   value={edc.degree}
    
   onChange={(e) => handleEductionChange("degree" , i , e.target.value )}

placeholder="Degree / Qualification (e.g., Computer Science, Technical Diploma, IS)"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 
  

  <input 
   
   value={edc.year}
    
   onChange={(e) => handleEductionChange("year" , i , e.target.value )}

   placeholder="Graduation Year"

  className="w-full rounded-lg px-4 py-3  text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors" 
  
  required

  /> 
  
  
 


   </div> // {/*  max-w-2xl mx-auto py-12 px-4 */}


))

}




<div>
  <h2 className="font-semibold px-3 mt-5 text-gray-200 mb-2">Languages</h2>

  {formDate.languages.map((lang, i) => (
    <div key={i} className="flex gap-3 mb-3">
      <input
        value={lang.name}
        onChange={(e) => handleLanguageChange("name", i, e.target.value)}
        placeholder="Language (e.g., English)"
        className="flex-1 rounded-lg px-4 py-3 text-gray-950 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
      />

      <select
        value={lang.level}
        onChange={(e) => handleLanguageChange("level", i, e.target.value)}
        className="rounded-lg px-4 py-3 text-gray-950 border-none outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
      >
        <option value="">Select Level</option>
        <option value="Basic">Basic</option>
        <option value="Good">Good</option>
        <option value="Very Good">Very Good</option>
        <option value="Fluent">Fluent</option>
        <option value="Native">Native</option>
      </select>
    </div>
  ))}

  <button
    type="button"
    onClick={addMoreLanguages}
    className="text-gray-50 hover:text-blue-600 text-sm font-medium text-left"
  >
    + Add more language
  </button>
</div>





</div> {/*  flex flex-col gap-4 */}

  {error && <p className="text-gray-50 text-sm text-center">{error}</p>}

 <button type="submit" disabled={loading}  className="text-center mt-4 bg-gradient-to-r from-orange-300 to-yellow-200 cursor-pointer   transition-opacity duration-300 text-gray-900 p-3 rounded-md disabled:opacity-50"> 

  {loading ? "Loading ..." : "Generate CV"} 

 </button>

 

 
 </form> {/*  flex flex-col gap-4 items-center */}





</motion.div> {/*  max-w-2xl mx-auto py-12 px-4 */}

</div> {/* w-full px-4 sm:px-6  */}
 
</AuthCheck>



)








}











