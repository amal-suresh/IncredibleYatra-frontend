const Footer = () => {
    return (
      <footer className="bg-[#0B0C10] text-[#F8F8FF] py-6 ">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} IncredibleYatra. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-3 text-[#6A5ACD]">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  