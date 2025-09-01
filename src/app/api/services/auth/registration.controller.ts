import axios from "axios";

const URL_REGISTER = "https://cdn.masterium.uz/api/v1/auth/register/";
const URL_SEND_OTP = "https://cdn.masterium.uz/api/v1/auth/register/verify/";

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

const OPERATORS = new Set([
  "20", "33", "50", "55", "61", "62", "65", "66", "67", "69",
  "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
  "88", "90", "91", "93", "94", "95", "97", "98", "99",
]);

const validateRegistrationData = ({
  phone_number,
  password,
  first_name,
  last_name,
}: {
  phone_number: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  if (!phone_number || !phone_number.match(/^\+?[1-9]\d{1,14}$/)) {
    throw new Error("Telefon raqami noto'g'ri formatda (masalan, +998901234567)");
  }
  if (phone_number.startsWith("+998")) {
    const operatorCode = phone_number.substring(4, 6);
    if (!OPERATORS.has(operatorCode)) {
      throw new Error(`Kiritilgan telefon raqami operator kodi O'zbekiston operatorlariga tegishli emas. Kod: ${operatorCode}`);
    }
  }
  if (!password || password.length < 8) {
    throw new Error("Parol kamida 8 belgi bo'lishi kerak");
  }
  if (!first_name || first_name.length < 2) {
    throw new Error("Ism kamida 2 belgi bo'lishi kerak");
  }
  if (!last_name || last_name.length < 2) {
    throw new Error("Familiya kamida 2 belgi bo'lishi kerak");
  }
};

const validateOtpData = ({ phone_number, code }: { phone_number: string; code: string }) => {
  if (!phone_number || !phone_number.match(/^\+?[1-9]\d{1,14}$/)) {
    throw new Error("Telefon raqami noto'g'ri formatda");
  }
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

export const setOtpApi = async (props: {
  req_type: "register" | "otp";
  phone_number: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  code?: string;
}) => {
  const { req_type } = props;

  if (req_type === "register") {
    const { phone_number, password, first_name, last_name } = props;
    if (!password || !first_name || !last_name) {
      return {
        success: false,
        error: "missing_fields",
        message: "Barcha maydonlarni to'ldirish kerak",
      };
    }
    validateRegistrationData({ phone_number, password, first_name, last_name });
    try {
      const response = await axios.post(URL_REGISTER, { phone_number, password, first_name, last_name });
      if (response.data.error === "user_exists") {
        return {
          success: false,
          error: "user_exists",
          message: "Bu telefon raqami allaqachon ro‘yxatdan o‘tgan",
        };
      }
      return {
        success: true,
        data: response.data,
      };
    } catch (e: any) {
      const errorMessage = e.response?.data?.error || e.message || "Ro‘yxatdan o‘tishda xato yuz berdi";
      return {
        success: false,
        error: e.response?.data?.error || "server_error",
        message: errorMessage,
      };
    }
  } else if (req_type === "otp") {
    const { phone_number, code } = props;
    if (!code) {
      return {
        success: false,
        error: "missing_code",
        message: "OTP kodi kiritilmagan",
      };
    }
    validateOtpData({ phone_number, code });
    try {
      const response = await axios.post(URL_SEND_OTP, { phone_number, code });
      const { access_token, refresh_token, token_type } = response.data;
      saveTokens({ accessToken: access_token, refreshToken: refresh_token, authType: token_type });
      return {
        success: true,
        data: response.data,
        access_token,
        refresh_token,
        token_type,
      };
    } catch (e: any) {
      const errorMessage = e.response?.data?.error || e.message || "OTP tasdiqlashda xato yuz berdi";
      return {
        success: false,
        error: e.response?.data?.error || "otp_error",
        message: errorMessage,
      };
    }
  }

  return {
    success: false,
    error: "invalid_request",
    message: "Noto‘g‘ri so‘rov turi",
  };
};