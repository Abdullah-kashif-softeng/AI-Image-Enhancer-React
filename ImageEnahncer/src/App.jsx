import React from 'react'
import { useState } from 'react'
import axios from "axios"
const App2 = () => {
    const [originalImage,setOriginalImage]=useState(null);
    const [enhancedImage,setEnhancedImage]=useState(null);
    const [previewImage,setPreviewImage]=useState(null);

    const Base_URL="https://techhk.aoscdn.com/";
    const APIKEY="wxe4s99dacelq7vxj";

    const imageHandler=async(originalImage)=>{
        const enhancedImageURL=await imageApiHandler(originalImage);
        setEnhancedImage(enhancedImageURL.image);
    }
    const imageApiHandler=async(originalImage)=>{
        const taskid=await uploadImage(originalImage);
        const enhahncedURL=await getEnhancedImageurl(taskid);

        return enhahncedURL;
    }

    const uploadImage=async(originalImage)=>{
        setPreviewImage(URL.createObjectURL(originalImage));
        const formData=new FormData();
        formData.append("image_file",originalImage);

        const {data}=await axios.post(
        `${Base_URL}api/tasks/visual/scale`,
        formData,
        {
           headers:{ "Content-Type": "multipart/form-data",
          "X-API-KEY": APIKEY
        }
    }
        )

        return data.data.task_id;
    }

    const getEnhancedImageurl=async(taskid)=>{
        const {data}=await axios.get(
            `${Base_URL}api/tasks/visual/scale/${taskid}`,
           { headers: {
                "X-API-KEY": APIKEY,
              }
            }
        )
        return data.data;
    }
  return (
    <div>

        <div>
            <form>
                <input type="file" onChange={(e)=>{setOriginalImage(e.target.files[0])}} />  
            </form>
            <img src={previewImage} alt="" />
            <button onClick={()=>{imageHandler(originalImage)}}>Enhacnh</button>
            <img src={enhancedImage} alt="" />
        </div>
    </div>
  )
}

export default App2