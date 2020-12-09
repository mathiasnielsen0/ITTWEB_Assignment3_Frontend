const API_URL = "http://localhost:5000/highscore/";
const localstorage_token = "api_token"

export class HighscoreApi {

  async postHighscore(score: Number, username: string) : Promise<boolean> {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*")
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem(localstorage_token))
    myHeaders.append("content-type","application/x-www-form-urlencoded");
    const data = new URLSearchParams();
    data.append("score", score.toString());
    data.append("name", username);
    console.log("posting highscore", username, score)
    let success = false;
    await fetch(API_URL + "add", {
      method: 'POST',
      headers: myHeaders,
      body: data,
    })
    .then(response => {
        if(response.ok)
            success = true;
    });
    return success;
  }
}

export default new HighscoreApi();
