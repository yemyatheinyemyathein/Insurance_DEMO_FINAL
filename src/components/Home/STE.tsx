import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { notifications } from "@mantine/notifications";

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
  const location = useLocation();  // Get current route location
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
    amount: "",
  });

  const [yearPlanOptions, setYearPlanOptions] = useState<Option[]>([]);
  const [productModeOptions, setProductModeOptions] = useState<Option[]>([]);

  const productModeOptionsType1 = [
    { value: "sa", text: "SA" },
    { value: "ap", text: "AP" },
  ];
  const productModeOptionsType2 = [{ value: "sa", text: "SA" }];

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
            yearPlans = [{ value: "7", text: "7" }];
          } else if (age >= 59 && age <= 60) {
            yearPlans = [{ value: "5", text: "5" }];
          } else {
            yearPlans = [
              { value: "5", text: "5" },
              { value: "7", text: "7" },
              { value: "10", text: "10" },
            ];
          }
          setYearPlanOptions(yearPlans);
          setProductModeOptions(productModeOptionsType1);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      alert("Age must be between 10 and 60");
      notifications.show({
        title: "Age Restriction",
        message: "Age must be between 10 and 60",
        color: "red",
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      age: age.toString(),
    }));
  };

  const validateSIAmount = (value: string) => {
    const amount = parseInt(value);
    if (amount < 1000000 || amount > 50000000) {
      alert("Amount must be between 10 lakh to 500 lakh");
      notifications.show({
        title: "Amount Restriction",
        message: "Amount must be between 10 lakh to 500 lakh",
        color: "red",
      });
    }
  };

  const calculateSIAmount = (): number | null => {
    const { amount, paymentMode, yearPlan } = formData;
    const siAmount = parseInt(amount);
    const planValue = parseInt(yearPlan);

    if (!siAmount || !planValue) return null;

    const factorMap = {
      "0": 1,
      "1": 12,
      "2": 3,
      "3": 6,
    };

    return Math.round(siAmount / (planValue * (factorMap[paymentMode] || 1)));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = calculateSIAmount();
    if (result === null) {
      notifications.show({
        title: "Calculation Error",
        message: "Please ensure all fields are filled correctly.",
        color: "red",
      });
    } else {
      console.log("Calculated Value:", result);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const fields: Field[] = [
    { label: "Agent Name", type: "text", name: "agentName", placeholder: "Type Your Name" },
    { label: "Customer Name", type: "text", name: "customerName", placeholder: "Type Your Name" },
    { label: "DOB", type: "date", name: "dob" },
    { label: "Age", type: "text", name: "age", value: formData.age, readOnly: true },
    ...(formData.product === "3" ? [
      { label: "Term", type: "select", name: "term", options: [
        { value: "0", text: "Premium Term" },
        { value: "1", text: "Policy Term" },
      ]},
    ] : []),
    { label: "Payment Mode", type: "select", name: "paymentMode", options: [
      { value: "", text: "Select Payment Mode" },
      { value: "0", text: "Annual" },
      { value: "1", text: "Monthly" },
      { value: "2", text: "Quarterly" },
      { value: "3", text: "Semi" },
    ]},
    { label: "Calculation Mode", type: "select", name: "calculationMode", options: productModeOptions },
    { label: "Year Plan", type: "select", name: "yearPlan", options: yearPlanOptions },
    { label: "SI Amount", type: "number", name: "amount" },
  ];

  const renderFields = (fields: Field[]) => {
    return fields.map((field, index) => (
      <motion.div
        key={index}
        className="my-4 w-full"
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5, delay: index * 0.2 }}
        variants={inputVariants}
      >
        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
        {field.type === "select" ? (
          <select
            name={field.name}
            value={formData[field.name as keyof FormData]}
            onChange={handleChange}
            className="block w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={field.value || formData[field.name as keyof FormData]}
            onChange={handleChange}
            readOnly={field.readOnly}
            placeholder={field.placeholder}
            className="block w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        )}
      </motion.div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">STE Insurance Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFields(fields)}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-primary hover:bg-primary-dark rounded-md shadow-lg"
          >
            Calculate
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default STE;
