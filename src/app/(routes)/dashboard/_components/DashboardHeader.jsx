import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Import Sheet components
import { Button } from "@/components/ui/button"; // Import Button component
import { LayoutGrid, PiggyBank, CircleDollarSign, ReceiptText, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function DashboardHeader() {
  const [open, setOpen] = useState(false); // State to control sheet visibility
  const path = usePathname(); // Get current path to highlight active menu

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

  return (
    <div className="p-5 shadow-sm border-b flex justify-between items-center">
      {/* Mobile Navigation Trigger */}
      <div className="sm:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full">
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="p-5">
              <div className="flex flex-row items-center mb-5">
                <span className="text-gray-600 font-bold text-xl">BudgetBuddy</span>
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
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Empty div for spacing/alignment */}
      <div></div>

      {/* User button for sign-out */}
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default DashboardHeader;
