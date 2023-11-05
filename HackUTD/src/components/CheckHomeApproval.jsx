import React from "react";

function checkHomeApproval(formData) {
  const {
    creditScore,
    grossMonthlyIncome,
    creditCardPayment,
    carPayment,
    studentLoanPayments,
    appraisedValue,
    downPayment,
    monthlyMortgagePayment,
  } = formData;

  // Create an array to store rejection messages
  const rejectionMessages = [];

  // Calculate LTV (Loan-to-Value) ratio
  const loanAmount = appraisedValue - downPayment;
  const LTV = (loanAmount / appraisedValue) * 100;
  console.log(loanAmount + "/" + appraisedValue + " = " + LTV);

  // Calculate DTI (Debt-to-Income) ratio
  const MonthlyDebt =
    parseInt(carPayment) +
    parseInt(creditCardPayment) +
    parseInt(monthlyMortgagePayment) +
    parseInt(studentLoanPayments);
    const DTI = (MonthlyDebt / grossMonthlyIncome) * 100;
    console.log(MonthlyDebt + "/" + grossMonthlyIncome + " = " + DTI);

  // Calculate FEDTI (Front-end Debt-to-Income) ratio (monthly mortgage payment)
  const FEDTI = (monthlyMortgagePayment / grossMonthlyIncome) * 100;
  console.log(monthlyMortgagePayment + "/" + grossMonthlyIncome + " = " + FEDTI);

  // Check if user meets approval criteria
  if (creditScore >= 640 && LTV < 80 && DTI <= 43 && FEDTI <= 28) {
    return "Y";
  } else {
    if (creditScore < 640) {
      rejectionMessages.push(
        `Your current credit score is ${creditScore}. It must be above 640.`
      );
    }

    if (LTV >= 80) {
      rejectionMessages.push(
        `Your LTV ratio is ${LTV}%. It must be less than 80%.`
      );
    }

    if (DTI > 43) {
      rejectionMessages.push(
        `Your DTI ratio is ${DTI}%. It must be 43% or lower.`
      );
    }

    if (FEDTI > 28) {
      rejectionMessages.push(
        `Your FEDTI ratio is ${FEDTI}%. It must be 28% or lower.`
      );
    }

    const rejectionMessage =
      "N. Suggestions:\n" +
      rejectionMessages.join("\n");

    return rejectionMessage;
  }
}

// Export the function
export default checkHomeApproval;
