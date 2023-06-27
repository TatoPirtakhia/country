import axios from 'axios'

const getData = async () =>{
   try {
     const response = await axios.get('https://restcountries.com/v3.1/all?fields')
     console.log(response.data)
     return response.data
   } catch (error) {
    console.log(error)
   }
}

export default getData