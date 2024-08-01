import { useEffect, useState } from "react";

interface ExpenseType {
    year: string;
    month: string;
    expense: {
        consumption: number;
        bonus: number;
        labo: number;
    },
    other: {
        salary: number;
        electricity: number;
        water: number;
        sanitation: number;
        internet: number;
    }
    totalExpense: number;
    totalRevenue: number;
}

export const useExpense = () => {
    const [ data, setData ] = useState<ExpenseType[]>([])

    useEffect(()=> {

    }, [data])

    return {
        data
    }
}