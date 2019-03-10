import axios from 'axios';

// const axiosConfig = {
//   baseURL: config.API_URL,
// };

// const HTTP = axios.create(axiosConfig);

let _staff = [
  {
    "chStaffCode": "KE002003",
    "vcStaffName": "Agnes Gati",
    "RowNumber": "1",
    "Operations_Unit": "251  ",
    "chBusinessUnit": "TCS - ITS",
    "chServiceLineCode": "TAX  ",
    "Business_Unit": "204  ",
    "chCurrGradeCode": "62",
    "vcGradeDesc": "Associate",
    "vcEmailAddress": "agnes.gati@pwc.com"
  },
]

 export default {
    //this code interacts with the database to retrieve all staff information
    //The data is added to a js callback that returns an array of objects
    
    getAllStaffMembers(callback){
      callback(_staff)

        // axios.get('/staff')
        // .then(response => {
        //     // JSON responses are automatically parsed.
        //     // this.posts = response.data
        //     console.log(response)
        //     // _staff = response.data.staff
        //   })
        //   .catch(e => {
        //     // this.errors.push(e)
        //     console.log(e)
        //   })

          
    },
 
  }

