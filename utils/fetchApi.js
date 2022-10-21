import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com"



export const fetchApi = async (url)=>{
const {data} = await axios.get(url, {
    headers: {
        'X-RapidAPI-Key': 'd317c038f9msh028cf537136977fp16b626jsndbd9ee496955',
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
      }
})
return data
}