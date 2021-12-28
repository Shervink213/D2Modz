import React from "react";
//import fetch from 'isomorphic-fetch';




const apiKey = process.env.REACT_APP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const authURL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${CLIENT_ID}&response_type=code`
let authCode = undefined;


const getCode = () => {
  window.location.href = authURL;
  
}

if (window.location.href.includes('code=')){
  var queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  authCode = params.get('code');
  console.log(authCode);
  getToken();
}


const getToken = () => {
  fetch("https://www.bungie.net/Platform/App/OAuth/token/", {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      'client_id': `${CLIENT_ID}`,
      'grant_type': 'authorization_code',
      'code': authCode
    }).toString()
  }).then(Response = () => {
    console.log(Response);
    return Response.json();
  })
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
