

import axios from "axios";





const api = axios.create({


baseURL : "https://resume-cv-backend-nou7.vercel.app" ,

withCredentials : true 

})




let accessToken = null 


export function setAccessToken(token) {


accessToken = token 


}


api.interceptors.request.use((config)=> {


config.headers.Authorization = `Bearer ${accessToken}` 

return config

})





api.interceptors.response.use(


(response) => response ,

async(error) => {


const handleError = error.config   


if(error.response?.status === 401 && !handleError._retry){

 handleError._retry = true 



try {


 const res = await api.post("/users/refershToken")  
  
 const newToken = res.data.accessToken   

 setAccessToken(newToken)

 handleError.headers.Authorization = `Bearer ${newToken}`

return api(handleError)

}

catch(err){

 setAccessToken(null)    

 return Promise.reject(err) 

}



}


return Promise.reject(error) // لو الخطأ مش 401 مش خطأ توكين ارميلي بعيد عني ميخصنيش ارميلي وش مستخدم

}

 

)




export default api
