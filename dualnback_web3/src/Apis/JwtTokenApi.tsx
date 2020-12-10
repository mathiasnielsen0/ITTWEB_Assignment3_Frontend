const API_URL = window.location.hostname.includes("://localhost") ? "http://localhost:5000/jwt/" : " https://obscure-refuge-32890.herokuapp.com/jwt/";
//https://intense-wildwood-97387.herokuapp.com/
const localstorage_token = "api_token"

export class JwtTokenApi {

    async getJwtToken() : Promise<string | null | undefined> {
        if (localStorage.getItem(localstorage_token) == null) {
            var myHeaders = new Headers();
            myHeaders.append("Access-Control-Allow-Origin", "*")
            
            await fetch(API_URL + "get", {
                method: 'GET',
                headers: myHeaders,
            })
            .then(response => response.json())
            .then(data => {
                console.log("data" , data.token);
                localStorage.setItem(localstorage_token, data.token);
            });
            return;
        }
    }
}

export default new JwtTokenApi();
