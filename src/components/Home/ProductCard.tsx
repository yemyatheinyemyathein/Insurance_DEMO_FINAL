import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link, To } from "react-router-dom";

interface Product {
  link: To;
  name: string;
  description: string;
//   link: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white mx-4 shadow-lg rounded-lg overflow-hidden p-6 transition-transform duration-300"
    >
      <div className="text-center mt-4">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-2">{product.description}</p>
        <Link to={product.link} className="mt-6 block">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 w-full">
            Learn More
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

interface ProductCardSliderProps {
  products: Product[];
}

const ProductCardSlider: React.FC<ProductCardSliderProps> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {products.map((product, index) => (
        <div key={index}>
          <ProductCard product={product} />
        </div>
      ))}
    </Slider>
  );
};

export default ProductCardSlider;
