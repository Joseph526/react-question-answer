import auth0 from "auth0-js";

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: "joseph526.auth0.com",
            audience: "https://joseph526.auth0.com/userinfo",
            clientID: "Laa1cOI7lMsoUe9z3ii3eHHGIR5ki4zd",
            redirectUri: "http://localhost:3000/callback",
            responseType: "token id_token",
            scope: "openid profile"
        });

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.idToken = authResult.idToken;
                this.profile = authResult.idTokenPayload;
                // Set the time at which the id token will expire
                this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
                resolve();
            });
        });
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    signIn() {
        this.auth0.authorize();
    }

    signOut() {
        // Clear id token, profile and expiration
        this.idToken = null;
        this.profile = null;
        this.expiresAt = null;
    }
}

const auth0Client = new Auth();

export default auth0Client;
