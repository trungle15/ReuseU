import { useState } from 'react';

interface Props {
  onCategorySelect?: (category: string) => void;
}

export const Dropdown: React.FC<Props> = ({ onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const categories = [
    { name: 'Price', items: ["Under $10", "$10 - $50", "$50 - $100", "$100 - $500", "Above $500"] },
    { name: 'Kitchen', items: ["Cookware", "Appliances", "Utensils", "Storage", "Dinnerware"] },
    { name: 'Furniture', items: ["Chairs", "Tables", "Beds", "Desks", "Storage"] },
    { name: 'Electronics', items: ["Laptops", "Phones", "Tablets", "TVs", "Audio"] },
    { name: 'Clothing', items: ["Shirts", "Tops", "Bottoms", "Dresses", "Accessories"] },
    { name: 'Miscellaneous', items: ["Books", "Toys", "Art", "Crafts", "Other"  ] }
  ];

  return (
    <div className="h-full flex flex-col gap-6 py-4">
      {categories.map((category, index) => (
        <div key={index} className="px-4">
          <div 
            onClick={() => toggleCategory(index)}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <span className="text-lg font-medium">{category.name}</span>
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${
                expandedCategories.includes(index) ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div 
            className={`pl-6 mt-2 overflow-hidden transition-all duration-200 ${
              expandedCategories.includes(index) 
                ? 'max-h-[500px] opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            {category.items.map((item, idx) => (
              <div key={idx} className="py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">{item}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}