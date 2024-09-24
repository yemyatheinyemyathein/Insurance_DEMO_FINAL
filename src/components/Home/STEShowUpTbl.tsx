interface Props {
  selectedData: {
    agentName: string;
    customerName: string;
    dob: string;
    age: string;
    product: string | number;
    term?: string;
    paymentMode: string; // 0: annual, 1: monthly, 2: quarterly, 3: semi
    calculationMode: string;
    yearPlan: string;
    amount: string;
  };
  calculatedValues: {
    annual: number | null;
    monthly: number | null;
    quarterly: number | null;
    semi: number | null;
  };
}

const STEShowUpTbl = ({ selectedData, calculatedValues }: Props) => {
  const { customerName, dob, age, paymentMode, yearPlan, amount } = selectedData;
  const paymentModeMap: { [key: string]: { label: string; value: number | null } } = {
    "0": { label: "Annual Premium", value: calculatedValues.annual },
    "1": { label: "Monthly Premium", value: calculatedValues.monthly },
    "2": { label: "Quarterly Premium", value: calculatedValues.quarterly },
    "3": { label: "Semi-Annual Premium", value: calculatedValues.semi },
  };

  const { label: mainLabel, value: mainValue } = paymentModeMap[paymentMode] || {
    label: "Premium Amount",
    value: null,
  };
  const cleanAmount = amount.replace(/[^\d]/g, "");
  const showAnnualAsSubtext = paymentMode !== "0" && calculatedValues.annual !== null;
  const annualValue = calculatedValues.annual ?? 0;
  const totalPremiumPaid = annualValue * +yearPlan
  const refundRate = ((+cleanAmount/totalPremiumPaid)*100).toFixed(1);
  return (
    <div className="mt-8 w-full p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">Selected Data</h2>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
        {/* Group 1: Name, Age, DOB */}
        <div className="border border-gray-300 p-4 rounded-lg w-full sm:w-1/2">
          <h3 className="font-medium mb-2">Personal Information</h3>
          <div className="h-[0.5px] w-full bg-black mb-2" />
          <div className="flex justify-between mb-2">
            <span>Name:</span>
            <span>{customerName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Date of Birth:</span>
            <span className="text-sm">{dob}</span>
          </div>
          <div className="flex justify-between">
            <span>Age:</span>
            <span>{age}</span>
          </div>
        </div>

        {/* Group 2: Year Plan, Payment Mode */}
        <div className="border border-gray-300 p-4 rounded-lg w-full sm:w-1/2">
          <h3 className="font-medium mb-2">Plan Details</h3>
          <div className="h-[0.5px] w-full bg-black mb-2" />
          <div className="flex justify-between mb-2">
            <span>Year Plan:</span>
            <span>{yearPlan}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Payment Mode:</span>
            <span>{paymentMode}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span>{amount}</span>
          </div>
        </div>

        {/* Premium Display */}
        <div className="text-center bg-blue-50 border border-blue-200 p-2 rounded-lg w-full sm:w-1/3 flex items-center justify-center">
          <div>
            <h3 className="text-lg font-medium mb-2">{mainLabel}</h3>
            <span className="text-4xl font-bold text-blue-700">{mainValue}</span>
            {showAnnualAsSubtext && (
              <div className="text-sm text-gray-500 mt-2">
                (Annual Amount: {calculatedValues.annual})
              </div>
            )}
          </div>
        </div>

        {/* Premium Payment Period */}
        <div className="bg-sky-100 border border-gray-300 p-4 rounded-lg w-full sm:w-1/2">
          <h3 className="font-medium mb-2">Premium Payment Period {yearPlan} years</h3>
          <div className="h-[0.5px] w-full bg-black mb-2" />
          <div className="flex justify-between mb-2">
            <span>Premium Paid Per year:</span>
            <span>{annualValue}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Premium Paid:</span>
            <span>{totalPremiumPaid}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Refund Rate: </span>
            <span>{refundRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STEShowUpTbl;
