import React from "react";
import FeaturesGrid from "./FeatureGrid";
import { CreditCard, BarChart2, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
    icon: <CreditCard className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
    icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Get Insights",
    description:
      "Receive AI-powered insights to optimize your finances",
    icon: <PieChart className="h-6 w-6 text-blue-600" />,
  },
];

export default function LandingPage() {
  const scrollToFeatures = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    const section = document.getElementById("working");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start", // Aligns to top of section
      });
    }
  };

  return (
    <>
    <div className="font-['Inter']  min-h-screen bg-white text-black ">
      {/* Navbar */}
      <header className="  border-b border-black-200 sticky top-0 shadow-xl font-['Poppins'] bg-[#003049] flex justify-between items-center px-6 py-4 shadow-md">
        <img src="/logo1.png" alt="FinSight Logo" className="h-17 w-auto" />
        <nav className="space-x-6 text-xl  text-white font-medium " >
          <a
            href="#features"
            onClick={scrollToFeatures}
            className="text-sm  hover:text-black transition-colors  "
          >
            Features
          </a>
          <a
            href="#working"
            onClick={handleClick}
            className="text-sm  hover:text-black transition-colors duration-200"
          >
            How It Works?
          </a>
          <Link
            to="/sign-in"
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200 inline-block text-black text-center"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Manage Your Finances <br /> with Intelligence
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <Link
          to="/sign-in"
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 inline-block text-center transition-colors"
        >
          Get Started
        </Link>
      </section>

      {/* Hero Image */}
      <section className="flex justify-center px-4">
        <img
          src="/landing.jpg"
          alt="AI with business person"
          className="max-w-full rounded-xl shadow-lg"
        />
      </section>

      <section className="bg-blue-50 w-full py-12 shadow-inner mt-7" >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">4K+</p>
            <p className="text-gray-600 mt-1">Trained On(Document)</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">98.7%</p>
            <p className="text-gray-600 mt-1">Processing Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">100+</p>
            <p className="text-gray-600 mt-1">Analyzed Documents</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">&lt;2</p>
            <p className="text-gray-600 mt-1">Response Time</p>
          </div>
        </div>
      </section>

      <section id="features" >
        <FeaturesGrid />
      </section>

      <section id="working" className="w-full bg-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center px-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#ff6600] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg mb-8">
            Join the journey to smarter financial management with FinSight <br></br>— powered by AI.
          </p>
          <Link
            to="/sign-in" // if using react-router
            className="inline-block bg-white text-[#ff6600] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 animate-bounce transition-all duration-300"
          >
            Start Now
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
