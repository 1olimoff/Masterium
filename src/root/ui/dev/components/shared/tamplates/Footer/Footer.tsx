import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";
import { FooterProvider } from './FooterProvider';
import { useTranslations } from "next-intl";
import Link from "next/link";
import ServerLink from '../../elements/Links/ServerLink';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  const t = useTranslations("Footer");

  return (
    <FooterProvider>
      <div className={cn(
        className,
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
      )}>
        {/* Logo & Title */}
        <div className={"flex flex-col gap-6 items-center md:items-start text-center md:text-left"}>
          <ServerLink path="/public">
            <Image
              src={"/svg/footer/logo.svg"}
              alt={"Footer logo of Masterium"}
              width={500}
              height={100}
              className={"w-full max-w-[250px] h-auto"}
              quality={100}
            />
          </ServerLink>
          <h3 className={"text-maket-gold text-lg md:text-xl font-semibold"}>
            {t("logo.title")}
          </h3>
        </div>

        {/* Info */}
        <div className={"flex justify-center md:justify-start"}>
          <div className={"flex flex-col gap-4 items-center md:items-start text-center md:text-left"}>
            <h4 className={"text-maket-gold text-xl font-semibold"}>
              {t('info.title')}
            </h4>
            <ul className={"flex flex-col gap-2"}>
              {t.raw("info.list").map((item: string, i: number) => (
                <li className={"text-maket-gold"} key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download Buttons */}
        <div className={"flex justify-center md:justify-start"}>
          <div className={"flex flex-col gap-4 items-center md:items-start"}>
            <h4 className={"text-maket-gold text-xl font-semibold"}>
              {t('download.title')}
            </h4>
            <div className={"flex flex-col gap-4"}>
              <Image
                src={"/svg/footer/Apple.svg"}
                alt={"Apple Store"}
                width={200}
                height={100}
                quality={100}
                className={"h-10 w-auto"}
              />
              <Image
                src={"/svg/footer/GooglePlay.svg"}
                alt={"Google Play"}
                width={200}
                height={100}
                quality={100}
                className={"h-10 w-auto"}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className={"flex justify-center md:justify-start"}>
          <div className={"flex flex-col gap-4 items-center md:items-start text-center md:text-left"}>
            <h4 className={"text-maket-gold text-xl font-semibold"}>
              {t('contact.title')}
            </h4>
            <div className={"flex flex-col gap-2"}>
              <a href="tel:+998991234578" className={"text-maket-gold text-lg"}>+998 99 123 45 78</a>
              <a href="tel:+998991234578" className={"text-maket-gold text-lg"}>+998 99 123 45 78</a>
              <a href="mailto:info@mastershub.uz" className={"text-maket-gold text-lg"}>info@mastershub.uz</a>
              <div className={"flex gap-4 justify-center md:justify-start"}>
                {[
                  { href: "/", src: "Telegram_white.svg" },
                  { href: "/", src: "Instagram.svg" },
                  { href: "/", src: "Facebook.svg" },
                  { href: "/", src: "Youtube.svg" },
                ].map(({ href, src }, i) => (
                  <a key={i} href={href} className={"h-10 w-10 rounded-full relative"}>
                    <Image
                      src={`/svg/footer/social/${src}`}
                      alt={`${src.replace('.svg', '')} icon`}
                      fill
                      style={{ objectFit: "contain" }} // objectFit ni style ichida ishlatish
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={"text-white w-full max-w-[1300px] bg-maket-primary mt-8"}>
        <hr className='w-full' />
        <div className={"flex w-full justify-center items-center pt-4 text-lg text-center"}>
          <p>{t('security')}</p>
        </div>
      </div>
    </FooterProvider>
  );
};