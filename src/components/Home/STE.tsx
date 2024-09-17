import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Notifications } from "@mantine/notifications";

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
    const getYearPlanAndProductOptions = () => {
      const age = parseInt(formData.age);

      switch (formData.product) {
        case "0":
        case "1":
        case "2":
          setYearPlanOptions([
            { value: "5", text: "5" },
            { value: "7", text: "7" },
            { value: "10", text: "10" },
          ]);
          setProductModeOptions(productModeOptionsType1);
          break;
        case "3":
          { let yearPlans;
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
          setProductModeOptions(productModeOptionsType2);
          break; }
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

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Calculate age if DOB changes
    if (name === "dob") {
      calculateAge(value);
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    // If age below 10 or above 60, show notification
    if (age < 10 || age > 60) {
      alert("Age musg be between 10 and 60")
      Notifications.show({
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
      return false;
    }
    return true;
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
      Notifications.show({
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
    { label: "Product", type: "select", name: "product", options: [
      { value: "", text: "Select Product" },
      { value: "0", text: "Double Flexi" },
      { value: "1", text: "Flexi Health" },
      { value: "2", text: "STE" },
      { value: "3", text: "Student Life" },
    ]},
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
            className="w-full md:w-2/3 border rounded px-3 py-2"
            value={formData[field.name as keyof FormData] || ""}
            onChange={handleChange}
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
            placeholder={field.placeholder}
            className="w-full md:w-2/3 border rounded px-3 py-2"
            readOnly={field.readOnly}
            onChange={handleChange}
          />
        )}
      </motion.div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {renderFields(fields)}
      <motion.button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Submit
      </motion.button>
    </form>
  );
};

export default STE;
