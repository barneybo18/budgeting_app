"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, CircleDollarSign, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Importing Sheet components

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    // {
    //   id: 5,
    //   name: "Upgrade",
    //   icon: ShieldCheck,
    //   path: "/dashboard/upgrade",
    // },
  ];

  const path = usePathname();
  const [open, setOpen] = useState(false); // State for controlling the sheet

  return (
    <>
      {/* Desktop Side Navigation */}
      <div className="hidden sm:block h-screen p-5 border shadow-sm">
        <div className="flex flex-row items-center">
          <Image src={"/BBL.svg"} alt="logo" width={60} height={25} />
          <span className="text-gray-800 font-bold text-xl">BudgetBuddy</span>
        </div>
        <div className="mt-5">
          {menuList.map((menu) => (
            <Link href={menu.path} key={menu.id}>
              <h2
                className={`flex gap-2 items-center
                  text-gray-500 font-medium
                  mb-2
                  p-4 cursor-pointer rounded-full
                  hover:text-primary hover:bg-yellow-100
                  ${path == menu.path && "text-primary bg-yellow-100"}`}
              >
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="fixed bottom-10 p-5 flex gap-2 items-center">
          <UserButton />
          Profile
        </div>
        {/* <div className="fixed bottom-2 p-5 flex gap-2 items-center">
          <Link href='https://barnabasoboh.netlify.app'>
          ©️ Barnabas Oboh 2024
          </Link>
        </div> */}
      </div>
    </>
  );
}

export default SideNav;
