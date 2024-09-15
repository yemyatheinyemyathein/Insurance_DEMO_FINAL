import ProductCardSlider from "../components/Home/ProductCard";

const HomePage = () => {
  const products = [
    {
      name: 'Product 1',
      description: 'This is a brief description of product 1.',
      link: '/product/1'
    },
    {
      name: 'Product 2',
      description: 'This is a brief description of product 2.',
      link: '/product/2'
    },
    {
      name: 'Product 3',
      description: 'This is a brief description of product 3.',
      link: '/product/3'
    },
    {
      name: 'Product 4',
      description: 'This is a brief description of product 3.',
      link: '/product/3'
    },
  ];


  return (
    <div className="min-h-[70vh] flex flex-col justify-center ">
      <ProductCardSlider products={products} />
    </div>
  )
}

export default HomePage