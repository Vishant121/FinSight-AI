import {
  BarChart2, Receipt, PieChart, CreditCard,
  Globe2, Zap
} from 'lucide-react';

const features = [
  {
    title: "Advanced Analytics",
    description: "Get detailed insights into your spending patterns with AI-powered analytics",
    icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Smart Receipt Scanner",
    description: "Extract data automatically from receipts using advanced AI technology",
    icon: <Receipt className="h-6 w-6 text-blue-600" />,
  },
  {
    title: " Document Type Detection",
    description: "Automatically identify types of financial documents (e.g., income,expense & salary) using machine learning.",
    icon: <PieChart className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Seamless Upload Interface",
    description: "Easily upload images of financial documents through a clean and intuitive UI.",
    icon: <CreditCard className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Data Privacy & Security",
    description: "Your financial data is processed securely using best practices in data privacy.",
    icon: <Globe2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">
          Everything you need to manage your finances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 bg-white shadow-sm text-left hover:shadow-md transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
