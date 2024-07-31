import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Note: Replace these with your actual image imports
import logoMakerImage from "../../assets/images/logomaker.jpg";
import techLeadImage1 from "../../assets/images/tech-lead-1.jpg";
import techLeadImage2 from "../../assets/images/tech-lead-2.jpg";
import softwareEngineeringImage from "../../assets/images/software-engineering.jpg";
import monstersImage from "../../assets/images/monsters.jpg";
import philosophyImage from "../../assets/images/philosophy.jpg";
import researchImage from "../../assets/images/research.jpg";
import swimmingImage from "../../assets/images/swimming.jpg";
import teachingImage from "../../assets/images/teaching.jpg";
import familyTimeImage from "../../assets/images/family-time.jpg";
import myLogo from "../../assets/images/My-logo.jpg";

export const MyServicesItems = {
  professional: [
    {
      id: "logo-maker",
      title: "Logo Maker",
      description:
        "In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials.",
      fullDescription:
        "In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials. They are important because they help in brand recognition, shows professionalism, consistency and emotional support.",
      price: "KES 1,500.00",
      images: [logoMakerImage],
      referral: "Refer clients to me and get ksh500 per client after payment.",
    },
    {
      id: "tech-lead",
      title: "Tech Lead And Tech Sales Representative",
      description:
        "In September of 2023, I started to sell technology products/services to customers. I have the follow",
      fullDescription: `In September of 2023, I started to sell technology products/services to customers. I have the following gadgets for sell:
💻💻💻💻💻💻Laptops 💻💻💻💻💻💻
*1. Lenovo(Highly Recommend if you are a Techy coz its cross platform)*
a) ThinkPad T Series:
T490 i5 touch 8th gen 8ram 256ssd @30000
T480 i5 touch 8th gen 8ram 256ssd 29000
T480 i5 8th gen 8ram 256ssd @27000
T470s i5 6th gen 8ram 256ssd @21500
T460s i5 6th gen 8ram 256ssd @20500
T450s i5 8ram 256ssd @19,499
b) ThinkPad X Series
X270 i5 7th gen 8ram 256ssd @20000
X270 i5 6th gen 8ram 256ssd 19000
X260 i5 6th gen i5 8ram 256ssd@17499
c) Yoga Series (2-in-1 convertibles):
Yoga 11e m3 7th gen 8ram 128ssd @14000
Yoga 11e  4ram 128ssd @12500
*2. HP*
a) HP EliteBook Series
Hp830 G5 i7 8th 8/256 touch @38k
Hp830 G5 i5 8th 8/256 touch @34k
Hp840 g5 i5 8th gen 8ram 256ssd @30k
Hp830 G5 i5 8th 8/256 non touch 30k
Hp840g3 i7 touch 8ram 256ssd @28k
Hp840 g3 i5 8ram 256ssd @22500
Hp840g2 i5 8ram 500hhd@17.5k
⚠⚠⚠
We stopped support and sales for the Dell, Asus,  Acer etc computers. Most of them have issues with our newer systems and makes it harder for us to troubleshoot issues. We believe simple is better than complex
⚠⚠⚠
🗄️🗄️🗄️🗄️🗄️Storage Devices🗄️🗄️🗄️🗄️🗄️
1. Hard Disk: -500GB @2000
2. SSD: -256GB @3000, -500GB @5500
3. RAM: ddr3 8GB @2500
📱📱📱📱📱Smartphones📱📱📱📱📱📱
*1. Xiaomi*
 a) Redmi Note Series
Redmi note 13 4GB ram, 128GB rom @25k
*2. Samsung*
🎧🎧🎧🎧🎧Earphones🎧🎧🎧🎧🎧🎧🎧
Oraimo original @300
Unlike other tech sellers, we offer free basic desktop support after you become our client. They include:
1. Initial setup assistance ie connecting to internet, setting up user account, and basic configuration. 
2. Troubleshooting common issues ie installation errors, basic virus removal, and system performance optimization
3. Basic usage guidance. Advice on how to use the operating system and pre-installed software effectively
🔥Order now🔥`,
      images: [techLeadImage1, techLeadImage2],
    },
    {
      id: "software-engineering",
      title: "Software Engineering & IT",
      description:
        "In September of 2023, I started to focus on software engineering and IT projects.",
      fullDescription:
        "In September of 2023, I started to focus on software engineering and IT projects. This includes web development, mobile app development, and various IT solutions.",
      images: [softwareEngineeringImage],
    },
  ],
  interests: [
    {
      id: "monsters",
      title: "Monsters",
      description: "In January of 2024, I'm creating content about monsters.",
      fullDescription:
        "In January of 2024, I'm creating content about monsters, exploring various mythologies and modern interpretations.",
      images: [monstersImage],
    },
    {
      id: "philosophy",
      title: "Philosophy, Psychology And Spirituality",
      description:
        "In September of 2023, I started to explore philosophy, psychology, and spirituality.",
      fullDescription:
        "In September of 2023, I started to explore philosophy, psychology, and spirituality, delving into various schools of thought and practices.",
      price: "KES 500.00",
      images: [philosophyImage],
    },
    {
      id: "research",
      title: "Research & Did You Know",
      description:
        "In September of 2023, I'm intensifying my research efforts.",
      fullDescription:
        "In September of 2023, I'm intensifying my research efforts, focusing on cutting-edge technologies and scientific discoveries.",
      price: "KES 3,000.00",
      images: [researchImage],
    },
  ],
  hobbies: [
    {
      id: "swimming",
      title: "Swimming, Driving, Cycling",
      description: "This is how I explore the world.",
      fullDescription:
        "Swimming, driving, and cycling are my favorite ways to explore the world and stay active.",
      images: [swimmingImage],
    },
    {
      id: "teaching",
      title: "Teaching & Public speaking",
      description: "I love to spread the knowledge I have.",
      fullDescription:
        "Teaching and public speaking allow me to share my knowledge and experiences with others, fostering growth and learning.",
      images: [teachingImage],
    },
    {
      id: "family-time",
      title: "Spending Time With Family",
      description: "To all my family (My Mom and Dad).",
      fullDescription:
        "Family time is precious to me. I cherish the moments spent with my Mom, Dad, and other family members.",
      images: [familyTimeImage],
    },
  ],
};

const MyServicesPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setShowFullDescription(false);
  }, []);

  const handleImageNavigation = useCallback(
    (direction) => {
      setCurrentImageIndex((prev) => {
        const newIndex =
          direction === "next"
            ? (prev + 1) % selectedItem.images.length
            : (prev - 1 + selectedItem.images.length) %
              selectedItem.images.length;
        return newIndex;
      });
    },
    [selectedItem]
  );

  const toggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  const renderItemList = useCallback(
    (items) => (
      <div className="mt-4 space-y-4">
        {items.map((item) => (
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
    ),
    [handleItemClick]
  );

  const renderDetailView = useCallback(
    () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="relative h-64 bg-gray-100">
            <img
              src={selectedItem.images[currentImageIndex]}
              alt={selectedItem.title}
              className="w-full h-full object-cover"
            />
            {selectedItem.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={() => handleImageNavigation("prev")}
                >
                  <ChevronLeft className="text-gray-600" />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={() => handleImageNavigation("next")}
                >
                  <ChevronRight className="text-gray-600" />
                </button>
              </>
            )}
          </div>
          <div className="p-6 flex-grow overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
            {selectedItem.price && (
              <p className="text-xl font-semibold mb-2 text-blue-600">
                {selectedItem.price}
              </p>
            )}
            <div className="mb-4">
              <p className="text-gray-700">
                {showFullDescription
                  ? selectedItem.fullDescription
                  : selectedItem.description}
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
    ),
    [
      selectedItem,
      currentImageIndex,
      showFullDescription,
      handleImageNavigation,
      toggleDescription,
    ]
  );

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 min-h-screen">
      <div className="bg-white p-4 flex items-center shadow-md">
        <Link to="/" className="text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold ml-4">Bruce's Services</h1>
      </div>

      <div className="p-4">
        <div
          className="text-white p-6 rounded-lg mb-6 flex flex-col justify-center items-center shadow-lg"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${myLogo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "200px",
          }}
        >
          <h2 className="text-2xl font-bold mb-2">
            Welcome to BruceMinanga's World
          </h2>
          <p className="text-center">
            Hi! I'm Bruce, the IT guy & the owner of this digital realm. Let me
            bring your digital dreams to life (He/him)
          </p>
        </div>

        {Object.entries(MyServicesItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <Link
                to={`/category/${category}`}
                className="text-blue-500 text-sm font-medium"
              >
                See all
              </Link>
            </div>
            {renderItemList(items.slice(0, 3))} {/* Show only first 3 items */}
          </div>
        ))}
      </div>

      {selectedItem && renderDetailView()}
    </div>
  );
};

export default MyServicesPage;
