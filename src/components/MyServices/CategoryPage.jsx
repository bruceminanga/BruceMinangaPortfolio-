import React, { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageCarousel from "./ImageCarousel"; // Make sure this path is correct
import { MyServicesItems } from "./MyServicesPage";

const ITEMS_PER_PAGE = 3;

const formatDescription = (text) => {
  return text
    .split("*")
    .map((part, index) =>
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
};

const CategoryPage = () => {
  const { category } = useParams();
  const items = MyServicesItems[category] || [];
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const loadMore = useCallback(() => {
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + ITEMS_PER_PAGE, items.length)
    );
  }, [items.length]);

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    setShowFullDescription(false);
  }, []);

  const toggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  const renderDetailView = useCallback(() => {
    if (!selectedItem) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
          <ImageCarousel images={selectedItem.images} />
          <div className="p-6 flex-grow overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
            {selectedItem.price && (
              <p className="text-xl font-semibold mb-2 text-blue-600">
                {selectedItem.price}
              </p>
            )}
            <div className="mb-4">
              <p className="text-gray-700 whitespace-pre-line">
                {formatDescription(
                  showFullDescription
                    ? selectedItem.fullDescription
                    : selectedItem.description
                )}
              </p>
            </div>
            {selectedItem.fullDescription && (
              <button
                className="text-blue-500 underline"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read less" : "Read more"}
              </button>
            )}
            {selectedItem.referral && (
              <p className="text-sm text-blue-500 mt-2">
                {selectedItem.referral}
              </p>
            )}
          </div>
          <div className="p-4 border-t">
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }, [selectedItem, showFullDescription, toggleDescription]);

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <div className="bg-white p-4 flex items-center shadow-md">
        <Link to="/" className="text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold ml-4">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="p-4 space-y-8">
        {items.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className="flex items-center p-3 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => handleItemClick(item)}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="ml-4 flex-grow">
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-sm text-gray-600">
                {item.description.substring(0, 50)}...
              </p>
              {item.price && (
                <p className="text-sm font-semibold text-blue-600 mt-1">
                  {item.price}
                </p>
              )}
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
      {visibleItems < items.length && (
        <div className="flex justify-center pb-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}
      {selectedItem && renderDetailView()}
    </div>
  );
};

export default CategoryPage;
