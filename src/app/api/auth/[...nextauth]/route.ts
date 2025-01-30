// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

// Типовое решение для Credentials (телефон/пароль)
const credentialsProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
        console.log("ROUTES.TS REQ",req);
        try {
            if (!credentials) {
                // если вдруг credentials пустые
                throw new Error("Missing credentials");
            }
            const { phone, password } = credentials;

            // Здесь любой ваш запрос к бэкенду:
            const res = await fetch("https://example.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, password }),
            });

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }

            // Ожидаем, что вернётся объект user
            const user = await res.json();

            // Если user существует, вернём его; иначе null
            if (user) {
                return user;
            }
            return null;
        } catch (err) {
            console.error("Authorize error:", err);
            return null;
        }
    },
});

const authOptions: NextAuthOptions = {
    providers: [
        // 1) Наш credentials-провайдер
        credentialsProvider,

        // 2) Google OAuth (используйте свои env)
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),

        // 3) Apple OAuth
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID ?? "",
            clientSecret: process.env.APPLE_CLIENT_SECRET ?? "",
        }),
    ],

    // Храним сессии в JWT (вместо cookie-сессий)
    session: {
        strategy: "jwt",
    },

    callbacks: {
        /**
         * Колбэк срабатывает при создании/обновлении JWT токена
         * Обычно используют, чтобы положить в токен user.id, role и т.д.
         */
        async jwt({ token, user, account }) {

            if (user) {
                // Если бэкенд вернул user.id
                // (token as any).id = user.id;
                // Можно добавить и другие поля
                console.log("ROUTE.ts ACCOUNT", account)
            }
            return token;
        },

        /**
         * Колбэк срабатывает на каждом "получении" session.
         * Вы можете дополнительно прокинуть поля из token в session.user
         */
        async session({ session, token }) {
            if (token) {
                // session.user.id = (token as any).id;
                // session.user.role = (token as any).role;
            }
            return session;
        },
    },

    /**
     * Если у вас есть собственная страница логина:
     * pages: {
     *   signIn: "/login",
     *   // error: "/login-error", // и т.д.
     * },
     */
};

const handler = NextAuth(authOptions);

// В App Router экспортируем только нужные методы
export const GET = handler;
export const POST = handler;
