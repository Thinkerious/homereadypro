/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import BarChart from "./BarChart.png";

function Form({ formData, setFormData }) {


  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();

  const [inputErrors, setInputErrors] = useState({
    grossMonthlyIncome: "",
    creditCardPayment: "",
    // Add other input fields here
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };
  const validateInput = (name, value) => {
    const minMaxValues = {
      grossMonthlyIncome: { min: 0, max: 10000 },
      creditCardPayment: { min: 0, max: 850 },
      // Add min and max values for other input fields here
    };

    if (value < minMaxValues[name].min || value > minMaxValues[name].max) {
      setInputErrors({
        ...inputErrors,
        [name]: `Value must be between ${minMaxValues[name].min} and ${minMaxValues[name].max}`,
      });
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  };

  const hasErrors = Object.values(inputErrors).some((error) => error !== "");

  const scrollToFirstError = () => {
    const firstErrorInput = document.querySelector(
      ".input-error" // Define a class for inputs with errors
    );

    if (firstErrorInput) {
      firstErrorInput.scrollIntoView({ behavior: "smooth" });
    }
  };

const [data, setData] = useState([
  { name: "CS", full_name: "Credit Score", Value: "", DesireRange: ">640", color: "" },
  { name: "LTV", full_name: "Loan-To-Value Ratio", Value: "", DesireRange: "<80%", color: "" },
  { name: "DTI", full_name: "Debt To Income Ratio", Value: "", DesireRange: "<43%", color: "" },
  { name: "FEDTI", full_name: "Front-End-Debt To Income Ratio", Value: "", DesireRange: "<=28%", color: "" },
]);
  const handleCompareClick = (e) => {
    e.preventDefault();
    navigate("/submission");
  }       

  // Handle form submission
  const handleSubmit = (e) => {

    e.preventDefault();
    if (hasErrors) {
      // Scroll to the form element when there are errors
      scrollToFirstError();
    } else {
    setData(prevData => [
      {
        ...prevData[0],
        Value: formData.creditScore,
        color: formData.creditScore > 640 ? "green" : "red",
      },
      {
        ...prevData[1],
        Value: (((formData.appraisedValue - formData.downPayment)/formData.appraisedValue) * 100).toFixed(2),
        color: ((formData.appraisedValue - formData.downPayment)/formData.appraisedValue) < .8 ? "green" : "red", // You can set color based on your logic here
      },
      {
        ...prevData[2],
        Value: (((formData.carPayment + formData.creditCardPayment + formData.monthlyMortgagePayment + formData.studentLoanPayments) / formData.grossMonthlyIncome) * 10).toFixed(2),
        color: ((formData.carPayment + formData.creditCardPayment + formData.monthlyMortgagePayment + formData.studentLoanPayments) / formData.grossMonthlyIncome) <= 4.3  ? "green" : "red", // You can set color based on your logic here
      },
      {
        ...prevData[3],
        Value: ((formData.monthlyMortgagePayment / formData.grossMonthlyIncome) * 100).toFixed(2),
        color: formData.monthlyMortgagePayment / formData.grossMonthlyIncome <= .28 ? "green" : "red", // You can set color based on your logic here
      },
    ]);      
      const approvalStatus = checkHomeApproval(formData);
      if (approvalStatus == 'Y') {
        document.querySelector('.approval').innerText = 'You are approved';
        document.querySelector('.approval').style.color = "green";
      }
      else{
        document.querySelector('.approval').innerText = 'You are not approved';
        document.querySelector('.approval').style.color = "red";
      }
      console.log("Approval Status:", approvalStatus);

            // navigate("/submission");
      // You can process the form data here
    }
  };

  const handleQuestionMarkHover = (num) => {
    const popup = document.querySelector(".popup"+num);
    popup.style.display = "block";
  };

  const handleQuestionMarkLeave = (num) => {
    const popup = document.querySelector(".popup"+num);
    popup.style.display = "none";
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 bg-opacity-10 p-6 rounded-md shadow-md mb-10">
      <h1 className="text-1xl italic text-white mb-4">
        Complete the following fields to receive your homeownership eligibility
        status.
      </h1>

      <form onSubmit={handleSubmit} className="text-white">
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold">
            Email Address
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white mb-10"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="grossMonthlyIncome" className="block font-semibold">
            Gross Monthly Income {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(1)}
          onMouseLeave={(e) => handleQuestionMarkLeave(1)}
        >
          ?
        </span>
        {' )'}
        <div className="popup1 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
        The total earnings before any deductions, used for financial assessment and budgeting.
        </div>
          </label>
          <input
            type="number"
            name="grossMonthlyIncome"
            value={formData.grossMonthlyIncome}
            onChange={handleInputChange}
            className={`bg-gray-900 border p-2 w-full rounded-md text-white ${
              inputErrors.grossMonthlyIncome ? "input-error" : ""
            }`}
          />
          {inputErrors.grossMonthlyIncome && (
            <p className="text-red-500">{inputErrors.grossMonthlyIncome}</p>
          )}
          <Slider
            min={0}
            max={10000}
            step={100}
            value={formData.grossMonthlyIncome}
            onValueChange={(value) =>
              handleSliderChange("grossMonthlyIncome", value)
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="creditCardPayment" className="block font-semibold">
            Credit Card Payment {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(2)}
          onMouseLeave={(e) => handleQuestionMarkLeave(2)}
        >
          ?
        </span>
        {' )'}
        <div className="popup2 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
        A financial transaction in which a cardholder repays borrowed money or charges made on their credit card, helping to maintain a good credit history and avoid interest fees.
        </div>
          </label>
          <input
            type="number"
            name="creditCardPayment"
            value={formData.creditCardPayment}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={850}
            step={10}
            value={formData.creditCardPayment}
            onValueChange={(value) =>
              handleSliderChange("creditCardPayment", value)
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="downPayment" className="block font-semibold">
            Car Payment {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(3)}
          onMouseLeave={(e) => handleQuestionMarkLeave(3)}
        >
          ?
        </span>
        {' )'}
        <div className="popup3 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
        A monthly amount paid to a lender or dealership as part of an auto loan, allowing individuals to finance the purchase of a vehicle over time.
        </div>
          </label>
          <input
            type="number"
            name="carPayment"
            value={formData.carPayment}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={1000}
            step={10}
            value={formData.carPayment}
            onValueChange={(value) => handleSliderChange("carPayment", value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="studentLoanPayments" className="block font-semibold">
            Student Loan Payment {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(4)}
          onMouseLeave={(e) => handleQuestionMarkLeave(4)}
        >
          ?
        </span>
        {' )'}
        <div className="popup4 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
        A regular monthly amount paid by a borrower to repay the money borrowed for education, typically after completing studies or during a grace period.
        </div>
          </label>
          <input
            type="number"
            name="studentLoanPayments"
            value={formData.studentLoanPayments}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={20000}
            step={10}
            value={formData.studentLoanPayments}
            onValueChange={(value) =>
              handleSliderChange("studentLoanPayments", value)
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="appraisedValue" className="block font-semibold">
            Appraised Value {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(5)}
          onMouseLeave={(e) => handleQuestionMarkLeave(5)}
        >
          ?
        </span>
        {' )'}
        <div className="popup5 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
          The estimated worth of a property or item determined by a professional appraiser, often used for real estate, insurance, or taxation purposes.
        </div>
          </label>
          <input
            type="number"
            name="appraisedValue"
            value={formData.appraisedValue}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={1000000}
            step={10}
            value={formData.appraisedValue}
            onValueChange={(value) =>
              handleSliderChange("appraisedValue", value)
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="downPayment" className="block font-semibold">
            Down Payment {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(6)}
          onMouseLeave={(e) => handleQuestionMarkLeave(6)}
        >
          ?
        </span>
        {' )'}
        <div className="popup6 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
        An initial payment made when purchasing an item, typically a percentage of the total cost, especially common in real estate, to secure a loan or purchase agreement.
        </div>
          </label>
          <input
            type="number"
            name="downPayment"
            value={formData.downPayment}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={100000}
            step={10}
            value={formData.downPayment}
            onValueChange={(value) => handleSliderChange("downPayment", value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="loanAmount" className="block font-semibold">
            Loan Amount {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(7)}
          onMouseLeave={(e) => handleQuestionMarkLeave(7)}
        >
          ?
        </span>
        {' )'}
        <div className="popup7 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
          The total sum borrowed from a lender, which a borrower is obligated to repay with interest according to the terms of a loan agreement.
        </div>
          </label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={20000}
            step={10}
            value={formData.loanAmount}
            onValueChange={(value) => handleSliderChange("loanAmount", value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="monthlyMortgagePayment"
            className="block font-semibold"
          >
            Monthly Mortgage Payment {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(8)}
          onMouseLeave={(e) => handleQuestionMarkLeave(8)}
        >
          ?
        </span>
        {' )'}
        <div className="popup8 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
          The regular installment paid by a homeowner to a lender to repay a home loan, typically consisting of both principal and interest.
        </div>
          </label>
          <input
            type="number"
            name="monthlyMortgagePayment"
            value={formData.monthlyMortgagePayment}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={20000}
            step={10}
            value={formData.monthlyMortgagePayment}
            onValueChange={(value) =>
              handleSliderChange("monthlyMortgagePayment", value)
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="creditScore" className="block font-semibold">
            Credit Score {'('}
            <span
          className="question-mark text-blue-500 ml-1 cursor-pointer"
          onMouseEnter={(e) => handleQuestionMarkHover(9)}
          onMouseLeave={(e) => handleQuestionMarkLeave(9)}
        >
        ?
        </span>
        {' )'}
        <div className="popup9 absolute bg-white border p-2 rounded-md text-sm shadow-md hidden text-black">
          A numerical representation of a person's creditworthiness, calculated based on their credit history, which is used by lenders to assess the risk of lending money to that individual.
        </div>
          </label>
          <input
            type="number"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleInputChange}
            className="bg-gray-900 border p-2 w-full rounded-md text-white"
          />
          <Slider
            min={0}
            max={850}
            step={5}
            value={formData.creditScore}
            onValueChange={(value) => handleSliderChange("creditScore", value)}
          />
        </div>

        <div className="flex flex-col items-center">
        <button
          type="submit"
          className="relative bg-transparent text-white border border-white py-2 px-4 rounded-md hover:bg-gray-400 hover:border-gray-400 transition-colors duration-300 transform hover:scale-105 mt-2"  // Reduce the top margin to mt-2
        >
          Submit
        </button>
      </div>
      </form>
      <button
        type="Compare"
        onClick={handleCompareClick}
        className="fixed right-20 top-1/2 transform -translate-y-1/2 bg-cyan-500 hover:bg-cyan-600 outline rounded-full w-40 h-40 text-white flex items-center justify-center transition-transform duration-300"
      >
        <img src={BarChart} />
      </button>
        

      <br/>
      <h1 className="approval"></h1>
      <br/>
      <table className="w-full bg-opacity-50 bg-black border-white border rounded p-4 mx-auto text-white">
  <thead>
    <tr>
      <th className="text-white">Name</th>
      <th className="text-white">Full Name</th>
      <th className="text-white">Value</th>
      <th className="text-white">Desired Range</th>
    </tr>
  </thead>
  <tbody>
    {data.map((val, key) => (
      <tr key={key}>
        <td className="text-center text-white">{val.name}</td>
        <td className="text-center text-white">{val.full_name}</td>
        <td className="text-center" style={{color: val.color}}>{val.Value}</td>
        <td className="text-center text-white">{val.DesireRange}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default Form;
