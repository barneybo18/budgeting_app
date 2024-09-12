"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from "../../../../../../utils/dbConfig"; // Adjust the path based on your structure
import { Incomes, Expenses } from "../../../../../../utils/schema";
import { sql, eq, desc, getTableColumns } from "drizzle-orm";

// import CreateIncomes from "./CreateIncomes";
// import IncomeItem from "./IncomeItem";
// import IncomeList from "./IncomeList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import CreateIncomes from "../_components/CreateIncomes";
import IncomeItem from "../_components/IncomeItem";
import IncomeList from "../_components/IncomeList";

function IncomeScreen({ params }) {
  const { user } = useUser();
  const [incomeInfo, setIncomeInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    user && getIncomeInfo();
  }, [user]);

  /**
   * Get Income Information
   */
  const getIncomeInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Incomes),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Incomes)
      .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
      .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Incomes.id, params.id))
      .groupBy(Incomes.id);

    setIncomeInfo(result[0]);
    getExpensesList(); // Fetch associated expenses list
  };

  /**
   * Get Latest Expenses Related to Income
   */
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  };

  /**
   * Used to Delete Income
   */
  const deleteIncome = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Incomes)
        .where(eq(Incomes.id, params.id))
        .returning();
      toast("Income Source Deleted!");
      route.replace("/dashboard/incomes");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
          My Income Sources
        </span>
        <div className="flex gap-2 items-center">
          {/* Optionally, add an edit income component similar to EditBudget */}
          <Button
            className="flex gap-2 rounded-full"
            variant="destructive"
            onClick={() => deleteIncome()}
          >
            Delete Income Source
          </Button>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {incomeInfo ? (
          <IncomeItem budget={incomeInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <CreateIncomes refreshData={() => getIncomeInfo()} />
      </div>

      <div className="mt-4">
        <IncomeList refreshData={() => getIncomeInfo()} />
      </div>
    </div>
  );
}

export default IncomeScreen;
