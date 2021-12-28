import React from "react";
import axios from "axios";




const apiKey = process.env.REACT_APP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const authURL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${CLIENT_ID}&response_type=code`
let authCode = undefined;


const getCode = () => {
  window.location.href = authURL;
  
}




const getToken = () => {

  const url = "https://www.bungie.net/Platform/App/OAuth/token/";

  const param = new URLSearchParams();
  param.append('client_id',`${CLIENT_ID}`);
  param.append('grant_type',`authorization_code&code=${authCode}`)


  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    }
  }

  axios.post(url, param.toString(), config)
    .then((response) => {
      console.log(response);
      return response.json();
    })
  /*
  axios.post("https://www.bungie.net/Platform/App/OAuth/token/", {
    
    body: new URLSearchParams({
      'client_id': `${CLIENT_ID}`,
      'grant_type': `authorization_code&code=${authCode}`,
    }).toString()
  })
  .then(response = () => {
    console.log(response);
    return response.json();
  })
  */
}

if (window.location.href.includes('code=')){
  var queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  authCode = params.get('code');
  console.log(authCode);
  getToken();
}


const App = () => {


  
  return (
    <div>
      <h1>Placeholder</h1>
      <button id="myAnchor" onClick={getCode}>
        get token
      </button>
    </div>
  )
}



export default App;
