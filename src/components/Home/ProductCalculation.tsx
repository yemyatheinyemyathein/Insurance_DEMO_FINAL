import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";

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
  name: string;  // Ensure this is keyof FormData
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  options?: Option[];
}

const ProductCalculation = () => {
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
    switch (formData.product) {
      case "0":
        setYearPlanOptions([
          { value: "5", text: "5" },
          { value: "10", text: "10" },
          { value: "15", text: "15" },
        ]);
        setProductModeOptions(productModeOptionsType1);
        break;
      case "1":
        setYearPlanOptions(
          Array.from({ length: 20 }, (_, i) => ({
            value: (i + 1).toString(),
            text: (i + 1).toString(),
          }))
        );
        setProductModeOptions(productModeOptionsType1);
        break;
      case "2":
        setYearPlanOptions([
          { value: "5", text: "5" },
          { value: "7", text: "7" },
          { value: "10", text: "10" },
        ]);
        setProductModeOptions(productModeOptionsType2);
        break;
      case "3":
        if (formData.term === "0") {
          setYearPlanOptions(
            Array.from({ length: 12 }, (_, i) => ({
              value: (i + 8).toString(),
              text: (i + 8).toString(),
            }))
          );
        } else {
          setYearPlanOptions(
            Array.from({ length: 12 }, (_, i) => ({
              value: (i + 5).toString(),
              text: (i + 5).toString(),
            }))
          );
        }
        setProductModeOptions(productModeOptionsType2);
        break;
      default:
        setYearPlanOptions([{ value: "", text: "Select plan" }]);
        setProductModeOptions(productModeOptionsType1);
        break;
    }
  }, [formData.product, formData.term]);

  useEffect(() => {
    if (formData.product === "3") {
      switch (formData.term) {
        case "0":
          setYearPlanOptions(
            Array.from({ length: 12 }, (_, i) => ({
              value: (i + 8).toString(),
              text: (i + 8).toString(),
            }))
          );
          break;
        case "1":
          setYearPlanOptions(
            Array.from({ length: 12 }, (_, i) => ({
              value: (i + 5).toString(),
              text: (i + 5).toString(),
            }))
          );
          break;
        default:
          break;
      }
    }
  }, [formData.term]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

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
    setFormData((prevData) => ({
      ...prevData,
      age: age.toString(),
    }));
  };

  const calculateSIAmount = (): number | null => {
    const { amount, paymentMode, yearPlan } = formData;
    const siAmount = parseInt(amount);
    const planValue = parseInt(yearPlan);

    if (!siAmount || !planValue) return null;

    let calculatedValue: number;

    switch (paymentMode) {
      case "0":
        calculatedValue = Math.round(siAmount / planValue);
        break;
      case "1":
        calculatedValue = Math.round(siAmount / (planValue * 12));
        break;
      case "2":
        calculatedValue = Math.round(siAmount / (planValue * 4));
        break;
      case "3":
        calculatedValue = Math.round(siAmount / (planValue * 6));
        break;
      default:
        calculatedValue = 0;
    }

    return calculatedValue;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = calculateSIAmount();
    console.log("Calculated Value:", result);
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
      { value: "1", text: "Flexi health" },
      { value: "2", text: "STE" },
      { value: "3", text: "Student life" },
    ]},
    ...(formData.product === "3" ? [
      { label: "Term", type: "select", name: "term", options: [
        { value: "0", text: "Premium Term" },
        { value: "1", text: "Policy Term" }
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
        className={`my-4 w-full flex ${field.type === "select" ? "flex -mx-2" : "flex"}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5, delay: index * 0.2 }}
        variants={inputVariants}
      >
        <label className="block text-sm font-medium text-gray-700 w-1/3">{field.label}</label>
        {field.type === "select" ? (
          <select
            name={field.name}
            className="w-2/3 border rounded px-3 py-2"
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
            placeholder={field.placeholder}
            value={formData[field.name as keyof FormData] || ""}
            onChange={handleChange}
            readOnly={field.readOnly}
            className="w-2/3 border rounded px-3 py-2"
          />
        )}
      </motion.div>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFields(fields)}
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Calculate
      </button>
    </form>
  );
};

export default ProductCalculation;
