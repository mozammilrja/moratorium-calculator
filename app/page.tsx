"use client";

import { useState } from "react";
// import "./slider.css";

export default function Index() {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [totalTenure, setTotalTenure] = useState(150);
  const [interestRate, setInterestRate] = useState(17.0);
  const [emisPaid, setEmisPaid] = useState(30);
  const [compoundOption, setCompoundOption] = useState("after");
  const [moratoriumMonths, setMoratoriumMonths] = useState(3);
  const [interestOverdue, setInterestOverdue] = useState(59133);

  const calculateInterest = () => {
    const principal = loanAmount;
    const rate = interestRate / 100;
    const months = moratoriumMonths === 0 ? 0 : moratoriumMonths;

    let overdue = 0;
    if (months > 0) {
      if (compoundOption === "monthly") {
        overdue = principal * Math.pow(1 + rate / 12, months) - principal;
      } else {
        overdue = (principal * rate * months) / 12;
      }
    }

    setInterestOverdue(Math.round(overdue));
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-700 shadow-xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-400 text-white text-center py-4">
          <h1 className="text-lg sm:text-xl font-medium">
            Moratorium Option Calculator
          </h1>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Loan Amount (in ₹)
            </label>
            <input
              type="text"
              value={formatAmount(loanAmount)}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (!isNaN(Number(value))) {
                  setLoanAmount(Number(value));
                }
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 text-center text-lg font-medium rounded"
            />
            <div className="mt-3">
              <input
                type="range"
                min="100000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Total Tenure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-gray-300 text-sm">
              Total Loan Tenure <br className="sm:hidden" />
              <span className="text-gray-400">(in Months)</span>
            </div>
            <input
              type="number"
              value={totalTenure}
              onChange={(e) => setTotalTenure(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 text-center font-medium rounded"
            />
          </div>

          {/* Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-gray-300 text-sm">Interest Rate (%)</div>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 text-center font-medium rounded"
            />
          </div>

          {/* EMIs Paid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-gray-300 text-sm">
              EMIs Paid till date <br className="sm:hidden" />
              <span className="text-gray-400">(in Months)</span>
            </div>
            <input
              type="number"
              value={emisPaid}
              onChange={(e) => setEmisPaid(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 text-center font-medium rounded"
            />
          </div>

          {/* Compound Interest Option */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">
              Compound Interest Option
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setCompoundOption("after")}
                className={`flex-1 py-2 text-sm font-medium rounded ${
                  compoundOption === "after"
                    ? "bg-cyan-400 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}>
                After Moratorium Period
              </button>
              <button
                onClick={() => setCompoundOption("monthly")}
                className={`flex-1 py-2 text-sm font-medium rounded ${
                  compoundOption === "monthly"
                    ? "bg-cyan-400 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}>
                Monthly (Like Credit Cards)
              </button>
            </div>
          </div>

          {/* Moratorium Months */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">
              Moratorium Months
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((months) => (
                <button
                  key={months}
                  onClick={() => setMoratoriumMonths(months)}
                  className={`h-8 w-full text-sm font-medium rounded-[6px] transition-colors duration-200 ${
                    moratoriumMonths === months
                      ? "bg-cyan-400 text-white"
                      : "bg-white text-gray-800"
                  }`}>
                  {months === 0 ? "Not Availed" : months}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Overdue */}
          <div className="border border-gray-600 rounded p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-gray-300 text-sm mb-1">
                  Interest Overdue
                </div>
                <div className="text-gray-300 text-sm mb-2">
                  after {moratoriumMonths} months
                </div>
              </div>
              <div className="text-white text-2xl font-bold whitespace-nowrap">
                ₹ {formatAmount(interestOverdue)}
              </div>
            </div>
          </div>

          {/* Calculate Button + Footer */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={calculateInterest}
              className="w-full sm:w-[250px] h-10 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-[12px] text-sm transition-colors">
              CALCULATE
            </button>
            <div className="text-center text-gray-400 text-xs sm:text-sm">
              COVID 19 - Stay Inside Stay Safe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
