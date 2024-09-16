import ProductCardSlider from "../components/Home/ProductCard";
import Product from "../assets/Home/product.jpg"

const HomePage = () => {
  const products = [
    {
      name: "Double Flexi",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, officiis. Magnam dolorem officiis exercitationem incidunt, perspiciatis ducimus eaque! Voluptate voluptatum dicta enim magnam sapiente fuga facere impedit id aliquid itaque? ",
      link: "/doubleFlexi",
      img: Product
    },
    {
      name: "Flexi Health",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, officiis. Magnam dolorem officiis exercitationem incidunt, perspiciatis ducimus eaque! Voluptate voluptatum dicta enim magnam sapiente fuga facere impedit id aliquid itaque?",
      link: "/flexiHealth",
      img: Product
    },
    {
      name: "STE",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, officiis. Magnam dolorem officiis exercitationem incidunt, perspiciatis ducimus eaque! Voluptate voluptatum dicta enim magnam sapiente fuga facere impedit id aliquid itaque?",
      link: "/ste",
      img: Product
    },
    {
      name: "Student Life",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, officiis. Magnam dolorem officiis exercitationem incidunt, perspiciatis ducimus eaque! Voluptate voluptatum dicta enim magnam sapiente fuga facere impedit id aliquid itaque?",
      link: "/studentLife",
      img: Product
    },
  ];

  return (
    <div className="flex flex-col justify-center my-4">
      <ProductCardSlider products={products} />
    </div>
  );
};

export default HomePage;
