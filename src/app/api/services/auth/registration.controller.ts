import axios from "axios";

const URL_REGISTER = 'https://cdn.masterium.uz/api/v1/auth/register/'
const URL_SEND_OTP = 'https://cdn.masterium.uz/api/v1/auth/register/verify/'

class RegistrationController {
    private _access_token: string
    private _refresh_token: string
    private _auth_type: string

    constructor(accessToken: string, refreshToken: string, authType: string) {
        this._access_token = accessToken;
        this._refresh_token = refreshToken;
        this._auth_type = authType;
    }

    public get accessToken (): string {
        return this._access_token;
    }

    public get refreshToken (): string {
        return this._refresh_token;
    }

    public get authType (): string {
        return this._auth_type;
    }

    public async setOtpApi (props: any) {
        const {req_type} = props;
        console.log("REQ TYPE", req_type)
        if (req_type === "otp") {
            console.log("THISSSS OTP VERIFY")
            const {phone_number, code} = props;
            
            try {
                const response = await axios.post(URL_SEND_OTP, {phone_number, code})
                console.log("RESSSPPPPOOONNNSE", response)
                const {access_token, refresh_token, token_type} = response.data;
                this.saveTokens({accessToken: access_token, refreshToken: refresh_token, authType: token_type})
                return response;
            } catch (e: any) {
                console.error("Error while sent the Otp Code: ", e.message)
                return e
            }

        } else {
            console.log("THISSSS SEND OTP")
            try {
                const { phone_number, password, name } = props;
                const response = await axios.post(URL_REGISTER, { phone_number, password, name }).then(res => res.data)
                return response
            } catch (e: any) { // Add ': any' to 'e' for better type handling
                console.error("Error while sending the registration request to external API:", e);
                // Re-throw the error so it can be caught by the route handler
                throw new Error(e.response?.data?.message || e.message || "Registration API call failed");
            }
        }
    }

    public saveTokens ({accessToken, refreshToken, authType}: any) {
        this._access_token = accessToken;
        this._auth_type = authType;
        this._refresh_token = refreshToken;
    }
}

export const registrationController = new RegistrationController("", "", "")