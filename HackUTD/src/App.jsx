import Form from "./components/form";
import Submission from "./components/Submission";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    grossMonthlyIncome: 0,
    creditCardPayment: 0,
    carPayment: 0,
    studentLoanPayments: 0,
    appraisedValue: 0,
    downPayment: 0,
    loanAmount: 0,
    monthlyMortgagePayment: 0,
    creditScore: 0,
  });

  return (
    <Router>
      <div>
        <h1 className="text-3xl font-bold text-white p-4 shadow-lg">
          HomeReady Pro
        </h1>

        <Routes>
          <>
            <Route
              path="/"
              element={<Form formData={formData} setFormData={setFormData} />}
            />
            <Route
              exact
              path="/submission"
              element={<Submission formData={formData} />}
            />
          </>
        </Routes>
      </div>
    </Router>
  );
}

export default App;