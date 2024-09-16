import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link, To } from "react-router-dom";

interface Product {
  link: To;
  name: string;
  description: string;
  img : string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white mx-4 shadow-md rounded-xl overflow-hidden p-4 border border-gray-200 hover:shadow-xl transition-transform duration-300"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
        />
      </div>
      <div className="text-center mt-4 px-4">
        <h3 className="text-xl font-serif font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-2 italic">{product.description}</p>
        <Link to={product.link} className="mt-6 block">
          <button className="bg-gradient-to-r from-blue-200 to-sky-500 hover:bg-gradient-to-l text-white py-2 px-4 rounded-md transition-colors duration-300 w-full text-sm mt-4 font-serif">
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
