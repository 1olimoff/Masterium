import axios from "axios";

const URL_LOGIN = "https://cdn.masterium.uz/api/v1/auth/login/";
const URL_LOGIN_OTP = "https://cdn.masterium.uz/api/v1/auth/login/verify/";
const URL_REFRESH = "https://cdn.masterium.uz/api/v1/auth/refresh/";

let accessToken = "";
let refreshToken = "";
let authType = "";

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;
export const getAuthType = () => authType;

export const saveTokens = ({
  accessToken: newAccessToken,
  refreshToken: newRefreshToken,
  authType: newAuthType,
}: {
  accessToken: string;
  refreshToken: string;
  authType: string;
}) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  authType = newAuthType;
};

const validateLoginData = ({ phone_number, password }: { phone_number: string; password: string }) => {
  if (!phone_number || !phone_number.match(/^\+?[1-9]\d{1,14}$/)) {
    throw new Error("Telefon raqami noto'g'ri formatda (masalan, +998901234567)");
  }

  const OPERATORS = new Set([
    "20", "33", "50", "55", "61", "62", "65", "66", "67", "69",
    "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
    "88", "90", "91", "93", "94", "95", "97", "98", "99",
  ]);

  if (phone_number.startsWith("+998")) {
    const operatorCode = phone_number.substring(4, 6);
    if (!OPERATORS.has(operatorCode)) {
      throw new Error(`Kiritilgan telefon raqami operator kodi O'zbekiston operatorlariga tegishli emas. Kod: ${operatorCode}`);
    }
  }

  if (!password || password.length < 8) {
    throw new Error("Parol kamida 8 belgi bo'lishi kerak");
  }
};

const validateOtpData = ({ phone_number, code }: { phone_number: string; code: string }) => {
  if (!phone_number || !phone_number.match(/^\+?[1-9]\d{1,14}$/)) {
    throw new Error("Telefon raqami noto'g'ri formatda");
  }

  const OPERATORS = new Set([
    "20", "33", "50", "55", "61", "62", "65", "66", "67", "69",
    "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
    "88", "90", "91", "93", "94", "95", "97", "98", "99",
  ]);

  if (phone_number.startsWith("+998")) {
    const operatorCode = phone_number.substring(4, 6);
    if (!OPERATORS.has(operatorCode)) {
      throw new Error(`Kiritilgan telefon raqami operator kodi O'zbekiston operatorlariga tegishli emas. Kod: ${operatorCode}`);
    }
  }

  if (!code || code.length !== 6) {
    throw new Error("OTP kodi 6 raqam bo‘lishi kerak");
  }
};

export const loginApi = async (props: any) => {
  const { req_type } = props;

  if (req_type === "login") {
    const { phone_number, password } = props;
    validateLoginData({ phone_number, password });
    try {
      const response = await axios.post(URL_LOGIN, { phone_number, password });
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.error || e.message || "Kirishda xato yuz berdi";
      throw new Error(errorMessage);
    }
  } else if (req_type === "otp") {
    const { phone_number, code } = props;
    validateOtpData({ phone_number, code });
    try {
      const response = await axios.post(URL_LOGIN_OTP, { phone_number, code });
      const { access_token, refresh_token, token_type } = response.data;
      saveTokens({ accessToken: access_token, refreshToken: refresh_token, authType: token_type });
      return response.data;
    } catch (e: any) {
      const errorMessage = e.response?.data?.error || e.message || "OTP tasdiqlashda xato yuz berdi";
      throw new Error(errorMessage);
    }
  }
};

export const refreshAccessToken = async (token: string) => {
  try {
    const response = await axios.post(URL_REFRESH, { refresh: token });
    const { access, refresh, token_type } = response.data;

    if (access) {
      saveTokens({
        accessToken: access,
        refreshToken: refresh || token, 
        authType: token_type || "Bearer",
      });
      console.log("✅ Tokenlar saqlandi:", { access, refresh: refresh || token, token_type });
    } else {
      console.error("❌ Backend access token qaytarmadi");
    }

    return response.data;
  } catch (e: any) {
    console.error("❌ Refresh token xatosi:", e.response?.data || e.message);
    return null;
  }
};
