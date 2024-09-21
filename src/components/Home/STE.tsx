import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import STEShowUpTbl from "./STEShowUpTbl";

const formatNumber = (value: string): string => {
  const numberValue = value.replace(/,/g, "");
  if (isNaN(Number(numberValue))) return value;

  return new Intl.NumberFormat("en-US").format(Number(numberValue));
};

interface FormData {
  agentName: string;
  customerName: string;
  dob: string;
  age: string;
  product: string;
  term: string;
  paymentMode: string;
  calculationMode: string;
  yearPlan: string;
  amount: string;
}

interface CalculatedValues {
  annual: number | null;
  monthly: number | null;
  quarterly: number | null;
  semi: number | null;
}

interface Option {
  value: string;
  text: string;
}

interface Field {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  options?: Option[];
}

const STE = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    agentName: "",
    customerName: "",
    dob: "",
    age: "",
    product: "",
    term: "",
    paymentMode: "",
    calculationMode: "",
    yearPlan: "",
    amount: formatNumber("1000000"),
  });
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    annual: null,
    monthly: null,
    quarterly: null,
    semi: null,
  });
  const [yearPlanOptions, setYearPlanOptions] = useState<Option[]>([]);
  const [productModeOptions, setProductModeOptions] = useState<Option[]>([]);

  const productModeOptionsType1 = [
    { value: "", text: "Select Calculation Mode" },
    { value: "sa", text: "SA" },
    { value: "ap", text: "AP" },
  ];
  const productModeOptionsType2 = [
    { value: "", text: "Select Calculation Mode" },
    { value: "sa", text: "SA" },
  ];

  useEffect(() => {
    const routeToProductMap: { [key: string]: string } = {
      "/doubleFlexi": "0",
      "/flexiHealth": "1",
      "/ste": "2",
      "/studentLife": "3",
    };

    const currentPath = location.pathname;
    const productValue = routeToProductMap[currentPath] || "";

    setFormData((prevData) => ({
      ...prevData,
      product: productValue,
    }));
  }, [location.pathname]);

  useEffect(() => {
    const getYearPlanAndProductOptions = () => {
      const age = parseInt(formData.age);

      switch (formData.product) {
        case "2": {
          let yearPlans;
          if (age >= 56 && age <= 58) {
            yearPlans = [
              { value: "", text: "Select Year Plan" },
              { value: "7", text: "7" },
            ];
          } else if (age >= 59 && age <= 60) {
            yearPlans = [
              { value: "", text: "Select Year Plan" },
              { value: "5", text: "5" },
            ];
          } else {
            yearPlans = [
              { value: "", text: "Select Year Plan" },
              { value: "5", text: "5" },
              { value: "7", text: "7" },
              { value: "10", text: "10" },
            ];
          }
          setYearPlanOptions(yearPlans);
          setProductModeOptions(productModeOptionsType2);
          break;
        }
        default:
          setYearPlanOptions([{ value: "", text: "Select plan" }]);
          setProductModeOptions(productModeOptionsType1);
          break;
      }
    };
    getYearPlanAndProductOptions();
  }, [formData.product, formData.age]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "amount" ? formatNumber(value) : value,
    }));

    if (name === "dob") {
      calculateAge(value);
    }

    if (name === "amount") {
      validateSIAmount(value);
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference > 0 || (monthDifference === 0 && dayDifference > 0)) {
      age++;
    }
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age < 10 || age > 60) {
      toast.error("Age must be between 10 and 60");
    }

    setFormData((prevData) => ({
      ...prevData,
      age: age.toString(),
    }));
  };

  const validateSIAmount = (value: string) => {
    const amount = parseInt(value.replace(/,/g, ""));
    if (amount < 1000000 || amount > 50000000) {
      toast.error("Amount must be between 10 lakh to 500 lakh");
    }
  };

  const calculateSIAmounts = (): { [key: string]: number | null } => {
    const { amount, yearPlan } = formData;
    if (!amount || !yearPlan) {
      return { annual: null, monthly: null, quarterly: null, semi: null };
    }
  
    const siAmount = parseInt(amount.replace(/,/g, ""), 10);
    const planValue = parseInt(yearPlan, 10);
    if (isNaN(siAmount) || isNaN(planValue)) {
      return { annual: null, monthly: null, quarterly: null, semi: null };
    }
  
    const factors: { [key: string]: number } = {
      annual: 1,
      monthly: 12,
      quarterly: 3,
      semi: 6,
    };
  
    return {
      annual: Math.round(siAmount / (planValue * factors.annual)),
      monthly:
        formData.paymentMode === "1"
          ? Math.round(siAmount / (planValue * factors.monthly))
          : null,
      quarterly:
        formData.paymentMode === "2"
          ? Math.round(siAmount / (planValue * factors.quarterly))
          : null,
      semi:
        formData.paymentMode === "3"
          ? Math.round(siAmount / (planValue * factors.semi))
          : null,
    };
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const calculatedAmounts = calculateSIAmounts();
    const { annual, monthly, quarterly, semi } = calculatedAmounts;
  
    if (annual === null) {
      toast.error("Please ensure all fields are filled correctly.");
      return;
    }
  
    if (formData.paymentMode === "0") {
      // For annual calculation, show the annual value
      toast.success(
        `Annual Calculated Value: ${new Intl.NumberFormat("en-US").format(annual)}`
      );
    } else {
      // For monthly, quarterly, and semi
      const selectedMode =
        formData.paymentMode === "1"
          ? monthly
          : formData.paymentMode === "2"
          ? quarterly
          : semi;
  
      if (selectedMode !== null) {
        toast.success(
          `Selected Mode Calculated Value: ${new Intl.NumberFormat("en-US").format(selectedMode)}`
        );
      }
    }
  
    setCalculatedValues({
      annual,
      monthly,
      quarterly,
      semi,
    });
  };
  

  const inputVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const fields: Field[] = [
    {
      label: "Agent Name",
      type: "text",
      name: "agentName",
      placeholder: "Type Your Name",
    },
    {
      label: "Customer Name",
      type: "text",
      name: "customerName",
      placeholder: "Type Your Name",
    },
    { label: "DOB", type: "date", name: "dob" },
    {
      label: "Age",
      type: "text",
      name: "age",
      value: formData.age,
      readOnly: true,
    },
    ...(formData.product === "3"
      ? [
          {
            label: "Term",
            type: "select",
            name: "term",
            options: [
              { value: "0", text: "Premium Term" },
              { value: "1", text: "Policy Term" },
            ],
          },
        ]
      : []),
    {
      label: "Payment Mode",
      type: "select",
      name: "paymentMode",
      options: [
        { value: "", text: "Select Payment Mode" },
        { value: "0", text: "Annual" },
        { value: "1", text: "Monthly" },
        { value: "2", text: "Quarterly" },
        { value: "3", text: "Semi" },
      ],
    },
    {
      label: "Calculation Mode",
      type: "select",
      name: "calculationMode",
      options: productModeOptions,
    },
    {
      label: "Year Plan",
      type: "select",
      name: "yearPlan",
      options: yearPlanOptions,
    },
    {
      label: "SI Amount",
      type: "text",
      name: "amount",
      placeholder: "Enter SI Amount",
    },
  ];

  const renderFields = (fields: Field[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <motion.div
            key={index}
            className="my-2 w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={inputVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <label className="block mb-1 text-sm font-medium">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name as keyof FormData]}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                {field.options?.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof FormData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                readOnly={field.readOnly}
                className="block w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="p-4"
    >
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {renderFields(fields)}
        <motion.button
          type="submit"
          className="block w-full px-4 py-2 text-white bg-sky-500 rounded hover:bg-sky-600"
          whileHover={{ scale: 1.05 }}
        >
          Calculate
        </motion.button>
      </form>
      <ToastContainer />

      <STEShowUpTbl selectedData={formData} calculatedValues={calculatedValues} />
      </motion.div>
  );
};

export default STE;
