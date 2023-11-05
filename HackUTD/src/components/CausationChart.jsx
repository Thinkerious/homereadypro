/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CausationChart({ jsonData }) {
  // State variables to store the counts
  const [credit, setCredit] = useState(0);
  const [ltv, setLtv] = useState(0);
  const [dti, setDti] = useState(0);

  useEffect(() => {  
    jsonData.forEach((item) => {
      const {
        loanAmount,
        appraisedValue,
        creditScore,
        grossMonthlyIncome,
        monthlyMortgagePayment,
      } = item;

      const LTV = (item.LoanAmount / item.AppraisedValue) * 100;
      const DTI =
        ((item.CreditCardPayment + item.CarPayment + item.StudentLoanPayments) /
          item.GrossMonthlyIncome) *
        100;
      const FEDTI = (item.MonthlyMortgagePayment / item.GrossMonthlyIncome) * 100;

      if (
        item.CreditScore < 640
      ) {
        setCredit((count) => count + 1);
      } if (
        LTV >= 80 &&
        LTV <= 95
      ) {
        setLtv((count) => count + 1);
      } if (
        DTI > 43 ||
        DTI < 28
      ) {
        setDti((count) => count + 1);
      }
    });
  }, [jsonData]);


  const data = {
    labels: ["Credit Rating", "Loan-To-Value (LTV)", "Debt To Income (DTI)"],
    datasets: [
      {
        label: "Percentage Caused",
        data: [credit/4, ltv/4, dti/4],
        backgroundColor: [
          "rgba(0, 255, 0, 0.2)",
          "rgba(255, 255, 0, 0.2)",
          "rgba(255, 0, 0, 0.2)",
        ],
        borderColor: [
          "rgba(0, 255, 0, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(255, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}