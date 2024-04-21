"use client";

import { useState } from "react";
import WordMark from "@/components/WordMark";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import { MdClose, MdMenu } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavbarProps = {
  settings: Content.SettingsDocument;
};

export default function Navbar({ settings }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="md-:py-6 px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <WordMark />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Nav */}

        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          {" "}
          <button
            type="button"
            className="fixed right-4 top-4 mb-4 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>
          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map(
              ({ link, label, cta_button }, index) => {
                if (cta_button) {
                  return (
                    <ButtonLink
                      key={index}
                      href={link ? link : ""}
                      onClick={() => setOpen(false)}
                      // aria-current={
                      //   pathname.includes(asLink(link) as string)
                      //     ? "page"
                      //     : undefined
                      // }
                    >
                      {label}
                    </ButtonLink>
                  );
                }
                return (
                  <PrismicNextLink
                    key={index}
                    href={link ? link : "/"}
                    className="block px-3 text-3xl first:mt-8"
                    onClick={() => setOpen(false)}
                    // aria-current={
                    //   pathname.includes(asLink(link) as string)
                    //     ? "page"
                    //     : undefined
                    // }
                  >
                    {label}
                  </PrismicNextLink>
                );
              },
            )}
          </div>
        </div>

        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item, index) => {
            if (item.cta_button) {
              return (
                <li key={index}>
                  <ButtonLink href={`/${item.link}`}>{item.label}</ButtonLink>
                </li>
              );
            }
            return (
              <li key={index}>
                <PrismicNextLink
                  href={`/${item.link}`}
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
