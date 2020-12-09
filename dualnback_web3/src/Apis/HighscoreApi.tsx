// const API_URL = "https://localhost:5001/account/"
const API_URL = "https://localhost:3000/highscore/";
const localstorage_token = "api_token"


export class HighscoreApi {

  async postHighscore(score: Number, username: string) : Promise<string | null | undefined> {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*")
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem(localstorage_token))
    myHeaders.append("content-type","application/x-www-form-urlencoded");

    const data = new URLSearchParams();
    data.append("score", score.toString());
    data.append("name", username);

    await fetch(API_URL + "add", {
      method: 'POST',
      headers: myHeaders,
      body: data,
    })
    .then(response => response.json())
    .then(data => {
        console.log("data" , data);
      localStorage.setItem(localstorage_token, data);
    });
    return;
  }
}

export default new HighscoreApi();
