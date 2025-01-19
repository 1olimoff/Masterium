// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
// import fetch from 'node-fetch'; // если надо

export const authOptions: NextAuthOptions = {
    providers: [
        // 1) Классический телефон/пароль через credentials
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    // Здесь можно сделать запрос к вашему бэкенду
                    // для валидации телефона/пароля:
                    const { phone, password } = credentials as {
                        phone: string;
                        password: string;
                    };

                    // Например:
                    const res = await fetch("https://example.com/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ phone, password }),
                    });

                    if (!res.ok) {
                        throw new Error("Invalid credentials");
                    }

                    const user = await res.json();

                    // В user желательно хранить хотя бы id или что-то уникальное
                    if (user) {
                        return user;
                    }

                    return null;
                } catch (error) {
                    console.error("Authorize error", error);
                    return null;
                }
            }
        }),

        // 2) Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),

        // 3) Apple OAuth
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID ?? "",
            clientSecret: process.env.APPLE_CLIENT_SECRET ?? ""
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        // Если требуется дообогатить токен – например, положить туда role
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                // Можно сохранить и другие поля, если возвращает ваш бэкенд
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                // Также можно передать role, permissions и т.д.
            }
            return session;
        }
    },
    // при желании можно указать нужные страницы логина/ошибок, либо настроить ручные редиректы
    pages: {
        signIn: "/login" // Если нужен кастомный UI
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
