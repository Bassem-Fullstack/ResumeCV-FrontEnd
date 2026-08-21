// app/dashboard/page.tsx

"use client"
import AuthCheck from "@/components/refershToken"     
import api, { setAccessToken } from "@/lib/api";
import { Edit3, FileText, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import JobTitle from "@/components/JobTitleModal";


interface Resume {
  _id: string;
  jobTitle: string;
  createdVia: "ai" | "manual";
  updatedAt: string;
}




export default function Dashboard() {

const [userName , setUserName] = useState<string>("")

const [resumes , setResumes] = useState<Resume[]>([])

const [loading , setLoading] = useState(false)

const[showModel , setShowModel] = useState(false)


const router = useRouter()

const searchParams = useSearchParams();


useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const getAllCV = await api.get("/cv");

      setResumes(getAllCV.data.getCV);

      if (getAllCV.data.userName) {
        setUserName(getAllCV.data.userName);   
      }
    } catch (err) {
      console.error("Failed to load user info", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);




useEffect(() => {
  const token = searchParams.get("accessToken");
  if (token) {
    setAccessToken(token);
    router.replace("/dashboard"); // يشيل التوكين من الـ URL
  }
}, []);





/////////////////////////////////////////////////////////////////////////////// 


const handleLogout = async() => {


try {

await api.delete("/users/logout")

setAccessToken(null) 

router.push("/")

}

catch(err){

router.push("/login")

}


}


/////////////////////////////////////////////////////////////////////////////////////


const CreateNewCv = (jobTitle: string) => {

setShowModel(false) 


router.push(`/builder/new?JobTitle=${jobTitle}`)

}


const editCV = (id : string) => {

router.push(`/builder/${id}`)

}



const handleDeleteCV = async(id:string , e:React.MouseEvent) => {


  e.stopPropagation() //  منع فتح صفحة التعديل عند الضغط على زرار الحذف

  
  if(!confirm("Are you sure you want to delete this resume?")) return ; // بنتاكد اول على مستخدم ان هو هيحذف سي في ولا لاء علامة تعجب ترو بفولس والفولس بترو افرض مثلا مش هحذف لو شيلت علامة تعجب هيفكترها فولس وساعتها هيخش على كود بعدك ويحذفها


try {

 await api.delete(`/cv/delete/${id}`)

setResumes((prev)=> prev.filter((cv)=> cv._id !==id))
}

catch(err){

console.error("Failed to delete resume", err);

}

}




  return (
    <AuthCheck>

      <div className="w-full mb-14 bg-gradient-to-r from-purple-600 to-orange-300 overflow-hidden">

     <motion.nav className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-12 py-3.5 text-slate-800"
     
        initial={{opacity : 0 , y : -100}}

animate = {{ opacity : 1 , y:0 }}

transition={ { duration : 0.6 } }

viewport={{once : true}}
     
     
     
     >

      <div className="flex items-center">

       <Image className="w-auto h-10 bg-gray-50 rounded-md" height={48} width={300} alt="logo" src={"/logo4.webp"} />

      </div>

    <div className="flex items-center gap-2 sm:gap-4">


       <p className="text-md font-bold text-gray-100"> Hi , <span className="text-gray-800">{userName} </span></p>
       
       <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-gray-100 transition-all  px-4 sm:px-7 py-1.5 rounded-full ">

        Logout
       </button>

    </div>

     </motion.nav>
    
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-12 pb-16">
        <motion.h1 className="text-2xl font-bold text-gray-900 text-center mb-6"
        
              initial={{opacity : 0 , y : 100}}

      whileInView = {{ opacity : 1 , y:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

    viewport={{once : true}}


        >
          
        List Your Resumes
        
        </motion.h1>

        {loading ? (
          <p className="text-gray-500 animate-spin h-11 rounded-full w-11 border border-t-purple-600"></p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* كارت إنشاء سي في جديد */}
            <motion.button
              onClick={()=> setShowModel(!showModel)}
              
            initial={{opacity : 0 , y : 100}}

      whileInView = {{ opacity : 1 , y:0 }}

    transition={ { duration : 0.72 , ease : "easeOut" } }

    viewport={{once : true}}

              
              className="w-full min-h-[220px] bg-white flex flex-col items-center justify-center rounded-xl gap-3 text-gray-950 border-2 border-dashed border-gray-400 group hover:border-purple-600 hover:shadow-lg transition-colors duration-300 cursor-pointer p-4"
            >
              <PlusIcon className="size-12 transition-transform duration-300 p-2.5 bg-gradient-to-br from-purple-500 to-orange-300 text-white rounded-full group-hover:scale-110" />
              <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">Create New CV</p>
            </motion.button>

            {/* عرض كل الـ CVs الموجودة */}
            {resumes.map((resume) => (
              <motion.div
                key={resume._id}
                onClick={() => editCV(resume._id)}
                
                initial={{opacity : 0 , y : 100}}

               whileInView = {{ opacity : 1 , y:0 }}

           transition={ { duration : 0.72 , ease : "easeOut" } }

             viewport={{once : true}}

                className="w-full min-h-[220px] bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-xl hover:border-purple-400 transition-colors duration-300 cursor-pointer relative group overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                      {resume.createdVia === "ai" ? "AI Generated" : "Manual"}
                    </span>
                    <FileText className="size-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {resume.jobTitle }
                  </h3>

                  <p className="text-xs text-gray-400 mt-2">
                    Last update : {new Date(resume.updatedAt).toLocaleDateString("en")}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                  <span className="text-xs text-purple-600 font-medium flex items-center gap-1 group-hover:underline">
                    <Edit3 className="size-3.5" /> Update
                  </span>

                  <button
                    onClick={(e) => handleDeleteCV(resume._id, e)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
        
        <JobTitle close={()=> setShowModel(false)} 
          
           open={showModel}
          
          submit={CreateNewCv}

          />
    
 
    </AuthCheck>
  );
}