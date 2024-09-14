const Hero = () => (
    <section className="relative h-screen bg-cover bg-center text-center" style={{ backgroundImage: "url('/path/to/your-image.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-white flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl font-bold">Welcome to Our Website</h1>
        <p className="text-xl mt-4">Discover our services and offerings.</p>
        <button className="mt-8 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
  
  export default Hero;
  