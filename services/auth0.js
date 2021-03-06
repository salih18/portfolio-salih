import auth0 from "auth0-js";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-76jc-7jk.auth0.com",
      clientID: CLIENT_ID,
      redirectUri: `${BASE_URL}/callback`,
      postLogoutRedirectUri: BASE_URL,
      responseType: "token id_token",
      scope: "openid profile",
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }
  login() {
    this.auth0.authorize();
  }
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.log(err);
        }
      });
    });
  }
  setSession(authResult) {
    Cookies.set("jwt", authResult.idToken);
  }

  logout() {
    Cookies.remove("jwt");

    this.auth0.logout({
      returnTo: "",
      clientID: CLIENT_ID,
    });
  }

  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken) {
        return undefined;
      }

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // BUILD CERTIFICATE
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (err) {
          return undefined;
        }
      }
    }
  }
  async clientAuth() {
    const token = Cookies.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken; // actually it is user data
  }

  async getJWKS() {
    const res = await axios.get(
      "https://dev-76jc-7jk.auth0.com/.well-known/jwks.json"
    );
    const jwks = res.data;
    return jwks;
  }

  async serverAuth(req) {
    const { headers } = req;
    const cookie = headers.cookie || "";
    const tokenCookie = cookie
      .split(";")
      .find((c) => c.trim().startsWith(`jwt=`));

    if (!tokenCookie) {
      return undefined;
    }
    const token = tokenCookie.split("=")[1];

    const verifiedToken = await this.verifyToken(token);

    return verifiedToken;
  }
}

const auth0Client = new Auth0();

export default auth0Client;
