const API_URL = "http://localhost:5000/jwt/";
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
