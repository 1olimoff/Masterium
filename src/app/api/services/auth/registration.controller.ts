// src/services/auth/registration.service.ts
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

const validateRegistrationData = ({ phone_number, password, name }: { phone_number: string; password: string; name: string }) => {
  if (!phone_number || !phone_number.match(/^\+?[1-9]\d{1,14}$/)) {
    throw new Error("Telefon raqami noto'g'ri formatda (masalan, +998901234567)");
  }
  if (phone_number.startsWith("+998")) {
    const operatorCode = phone_number.substring(4, 6);
    if (!OPERATORS.has(operatorCode)) {
      throw new Error(`Kiritilgan telefon raqami operator kodi O'zbekiston operatorlariga tegishli emas. Kod: ${operatorCode}`);
    }
  }
  if (!password || password.length < 6) {
    throw new Error("Parol kamida 6 belgi bo'lishi kerak");
  }
  if (!name || name.length < 2) {
    throw new Error("Ism kamida 2 belgi bo'lishi kerak");
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

export const setOtpApi = async (props: any) => {
  console.log("reg contr props: ", props);
  const { req_type } = props;

  if (req_type === "register") {
    const { phone_number, password, name } = props;
    validateRegistrationData({ phone_number, password, name });
    try {
      const response = await axios.post(URL_REGISTER, { phone_number, password, name });
      console.log("Register response:", response.data);
      if (response.data.error === "user_exists") {
        return {
          success: false,
          error: "user_exists",
          message: "Bu telefon raqami allaqachon ro‘yxatdan o‘tgan",
        };
      }
      return response.data;
    } catch (e: any) {
      console.log("reg cont register error", e);
      const errorMessage = e.response?.data?.error || e.message || "Ro‘yxatdan o‘tishda xato yuz berdi";
      return {
        success: false,
        error: e.response?.data?.error || "server_error",
        message: errorMessage,
      };
    }
  } else if (req_type === "otp") {
    const { phone_number, code } = props;
    validateOtpData({ phone_number, code });
    try {
      // Foydalanuvchi mavjudligini tekshirish uchun qo‘shimcha so‘rov
      const checkUserResponse = await axios.post(URL_REGISTER, { phone_number });
      if (checkUserResponse.data.error === "user_exists") {
        return {
          success: false,
          error: "user_exists",
          message: "Bu telefon raqami allaqachon ro‘yxatdan o‘tgan",
        };
      }

      const response = await axios.post(URL_SEND_OTP, { phone_number, code });
      console.log("OTP verify response:", response.data);
      const { access_token, refresh_token, token_type } = response.data;
      saveTokens({ accessToken: access_token, refreshToken: refresh_token, authType: token_type });
      return response.data;
    } catch (e: any) {
      console.log("reg cont otp error", e);
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