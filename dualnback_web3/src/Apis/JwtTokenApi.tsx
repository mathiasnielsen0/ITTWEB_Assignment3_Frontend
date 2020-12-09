

// const API_URL = "https://localhost:5001/account/"
const API_URL = "https://localhost:3000/jwt/";
const localstorage_token = "api_token"


export class JwtTokenApi {

  async getJwtToken() : Promise<string | null | undefined> {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*")

    await fetch(API_URL + "get", {
      method: 'GET',
      headers: myHeaders,
    })
    .then(response => response.json())
    .then(data => {
        console.log("data" , data);
        localStorage.setItem(localstorage_token, data);
    });
    return;
  }

}

export default new JwtTokenApi();
