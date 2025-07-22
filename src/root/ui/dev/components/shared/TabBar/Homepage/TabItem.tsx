"use client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import { RegistrationPage } from "../../elements/account/Registration/RegisterMobile";
import { AuthProvider } from "../../elements/account/login/LoginMobile";
import ServerLink from "../../elements/Links/ServerLink";

interface TabItemProps {
  token: string | null;
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}

export const TabItem = ({ token, icon, label, href, isActive }: TabItemProps) => {
  const [openDrawer, setOpenDrawer] = useState<"login" | "register" | null>(null);
  const iconPath = `/svg/tabbar/${icon}${isActive ? "active" : ""}.svg`;

  if (!token && label === "Profil") {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <AuthProvider
          open={openDrawer === "login"}
          onOpenChange={(open) => setOpenDrawer(open ? "login" : null)}
          onRegisterClick={() => setOpenDrawer("register")}
        >
          <div onClick={() => setOpenDrawer("login")}>
            <div className="h-6 flex items-center justify-center">
              <Image src={iconPath} alt={label} width={24} height={24} />
            </div>
            <span className={`text-[12px] mt-1 ${isActive ? "text-[#00174C] font-semibold" : "text-gray-500"}`}>
              {label}
            </span>
          </div>
        </AuthProvider>

        <RegistrationPage
          open={openDrawer === "register"}
          onOpenChange={(open) => setOpenDrawer(open ? "register" : null)}
          onLoginClick={() => setOpenDrawer("login")} // Renamed to onLoginClick for clarity
        />
      </div>
    );
  }

  return (
    <ServerLink path={href} className="flex flex-col items-center justify-center w-full">
      <div className="h-6 flex items-center justify-center">
        <Image src={iconPath} alt={label} width={24} height={24} />
      </div>
      <span className={`text-[12px] mt-1 ${isActive ? "text-[#00174C] font-semibold" : "text-gray-500"}`}>
        {label}
      </span>
    </ServerLink>
  );
};