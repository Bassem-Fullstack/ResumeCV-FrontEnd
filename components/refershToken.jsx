"use client";

import { useEffect, useState } from "react";
import api, { setAccessToken } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import { Cursor, useTypewriter } from "react-simple-typewriter";


// export default function AuthCheck({ children }) {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         // أول ما التاب تفتح نطلب توكن جديد بالكوكي
//         const res = await api.post("/users/refreshToken");
//         setAccessToken(res.data.accessToken);
//         router.push("/dashboard")
//       } catch (err) {
//         // لو مفيش كوكي أو انتهت طرده للوجين
//         if (pathname !== "/login" && pathname !== "/register") {
//           router.push("/");
//         }
//       } finally {
//         setLoading(false); // نفتح الموقع بعد ما التوكن يجهز في الـ Memory
//       }
//     };

//     initAuth();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // أو Spinner تحمي الصفحة لحد ما التوكن ييجي
//   }

//   return <>{children}</>;
// }


export default function AuthCheck({children}) {

  const [loading , setLoading] = useState(true)

  const [authorized , setAuthorized] = useState(false) // كود دة بيلغي ان مستخدم ميقدرش يوصل لداشبورد لو هو مسجل دخول وكتب فوق في شريط بحث كدة

  const [text] = useTypewriter({


  words : ["Loading..."] ,

  delaySpeed : 50 ,

  deleteSpeed : 50 ,

  typeSpeed : 50

  })

  const router = useRouter() 


  const pathName = usePathname()


 useEffect(() => {

const initAuth = async()=> {

setLoading(true)

try {

const res = await api.post("/users/refreshToken")  

setAccessToken(res.data.accessToken)

setAuthorized(true) // يعرض محتوي كلة بالكامل

}

catch(err){

if(pathName !== "/login" && pathName !== "/register") {

 router.push("/")

//  لو مستخدم مش مسجل دخول اطردوة على طول على صفحة رئيسية 

}

}

finally{

 setLoading(false)

}

}

initAuth()


 } , [])


if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-[#8722fb] rounded-full animate-spin" />
        <p className="text-gray-300 text-3xl">{text} <Cursor/></p>
      </div>
    </div>
  )
}




if(!authorized){
 
  return null // هنا بقي السحر كلة حوار رمشة عين بتحصل هنا بقولوة رجعلي نال لو هو مسجل عندي متعرضش محتوي داشبورد دة لزائر لو كتب في شريط بحث داشبورد يعني رجعوة لصفحة اللى هو واقف فيها
   

// setAuthorized(true)   هي  قيمتها ديفولت فولس ثم بعد كدة كانت هنا في تراي ترو فأصبحت شايلة قيمة بقولوة لو كنت استخدمت شرط بتاعي من غير علامة تعجب كانت هيجبلي صفحة سودة خالص مفيهاش حاجة مفيهاش محتوي لان انت قايلوة ريترن نال رجعلي قيمة فاضية متعرضليش اي حاجة 
  
// return null يعني معناها متعرضش حاجة خالص خاص بمحتوي دة لو مش مسجل عندنا 

}

return <> {children} </> // دة كمبيونتدانات بتاعتي بقولوة اعرضهالي كلها بعد ما المستخدم يسجل الدخول ونتأكد ان هو عندة توكين عشان نعرضلوة صفحة داشبورد بتاعوة الخاص بة عشان احنا هنمسك دالة اوس تشيك دي وهنلفها على صفحات وكمبيونتدات مشروع كلها لو صفحة لسة بتفتح على طول هيعرض لمستخدم كلمة لودينج في منتصف اول حاجة وبعد كدة هيعرضلك كل كمبيونتدات اللى هو تشالدينرت بارميتر ماسك كل كمبيونتدات بتاعتك ولو شيلت كلمة تشالديرن وكتبت اي حاجة تاني رسالة مثلا شكر مش هيعرضلك باقي كمبيونتدات لأن انت لفيت دالة داخل لاي اويت كلة

// children دي ماسكة كمبيونتدات بتاعتي وبتعرضها على متصفح لاي اويت

}