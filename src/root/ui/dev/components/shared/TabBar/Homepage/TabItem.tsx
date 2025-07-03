import Image from "next/image";
import Link from "next/link";

interface TabItemProps {
  icon: string;   
  label: string; 
  href: string;
  isActive: boolean;
}

export const TabItem = ({ icon, label, href, isActive }: TabItemProps) => {
  const iconPath = `/svg/tabbar/${icon}${isActive ? "active" : ""}.svg`;

  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="h-6 flex items-center justify-center">
        <Image src={iconPath} alt={label} width={24} height={24} />
      </div>
      <span
        className={`text-[12px] mt-1 ${
          isActive ? "text-[#00174C] font-semibold" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

