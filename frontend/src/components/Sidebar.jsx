const Sidebar = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className=" fixed w-60 h-screen bg-[#003049] shadow-lg pt-7  flex flex-col">
      <div className="flex items-center align-center mb-10 pl-2">
        <img src="/logo1.png" alt="FinSight Logo" className="h-17 w-auto" />
        
      </div>

      <nav className=" pb-30 flex flex-col justify-center min-h-screen gap-4">
        <button
          onClick={() => scrollToSection("dashboard")}
          className="cursor-pointer bg-white text-orange-400 font-bold text-center w-full px-4 py-2 hover:bg-orange-500 hover:text-white "
        >
          Dashboard
        </button>
        <button
          onClick={() => scrollToSection("transactions")}
          className="cursor-pointer bg-white text-orange-400 font-bold w-full text-center bg-blue-300 active:bg-violet-300 px-4 py-2 hover:bg-orange-500 hover:text-white"
        >
          Transactions
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
