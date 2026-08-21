



"use client"

import Image from "next/image"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function Navbar () {


const router = useRouter()



const handleGetStarted = async()=> {


try {

const res = await api.post("/users/refreshToken")

router.push("/dashboard")

}


catch(err){

router.push("/login")

}

}



return (

<>

<header className="w-full  shadow-md">

<motion.nav className="max-w-[1600px] mx-auto flex items-center justify-between lg:px-16 lg:py-4 md:px-12 sm:px-6 px-4 py-2.5"

initial={{opacity : 0 , y : -100}}

animate = {{ opacity : 1 , y:0 }}

transition={ { duration : 0.6 } }

viewport={{once : true}}

>


<Image className="w-auto h-10 rounded-md" height={48} width={300} alt="logo" src={"/logo4.webp"} />


<button onClick={handleGetStarted} className="bg-gradient-to-r from-[#8722fb] to-[#bf00e2]

text-white rounded-lg lg:px-7 lg:py-3 px-5 py-3 shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"

>
    
Get Started</button>

</motion.nav>

</header>

</>

)

}





















