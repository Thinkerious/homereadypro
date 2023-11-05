/* eslint-disable no-unused-vars */
import React from "react";
import Chat from "./Chat.jsx";
import Chart from "./Chart.jsx";
import CausationChart from "./CausationChart.jsx";
import jsonData from "../backend/csvjson.json"; // Import your JSON data file
import { useNavigate } from "react-router-dom";
import checkHomeApproval from "./checkHomeApproval.jsx";

export default function Submission({ formData }) {
  const navigate = useNavigate();

  function handleEdit() {
    navigate("/")
  }

  console.log(formData);
  console.log(checkHomeApproval(formData));
  return (
    <>
      <div className="flex  justify-center w-3/5">
        <div className="p-4 bg-transparent justify-center">
          <h3 className="text-white">Percentage of Approvals</h3>
          <Chart jsonData={jsonData} />
          <h3 className="text-white mt-20">Percentage Deciding Factors</h3>
          <CausationChart jsonData={jsonData}/>
          <div className="text-center mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Edit
            </button>
          </div>
        </div>

          <Chat />
      </div>
    </>
  )
}
