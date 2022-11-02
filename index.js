const params = new URLSearchParams();

require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const port = 8080;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const generateRandomString = (length) => {
  let result = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.Length));
  }
  return result;
};

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = ["user-read-private", "user-read-email", "user-top-read"].join(
    " "
  );

  //   const queryParams = querystring.stringify({
  //     client_id: CLIENT_ID,
  //     response_type: "code",
  //     redirect_uri: REDIRECT_URI,
  //     state: state,
  //     scope: scope,
  //   });

  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scope}`
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    url: "/token",
    method: "post",
    baseURL: "https://accounts.spotify.com/api/",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    data: URLSearchParams.toString({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = URLSearchParams.toString({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:3000/?${queryParams}`);
      } else {
        res.redirect(
          `?${URLSearchParams.toString({ error: "invalid_token" })}`
        );
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: URLSearchParams.toString({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port),
  () => {
    console.log(`Express app listening on port: ${port}`);
  };
