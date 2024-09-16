const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-sky-300 via-blue-500 to-sky-300 text-gray-200 py-2 flex justify-center">
      <p className="mx-auto text-sm text-gray-350 font-semibold">
        {currentYear} © All rights reserved | insurance.com
      </p>
    </footer>
  );
};

export default Footer;
