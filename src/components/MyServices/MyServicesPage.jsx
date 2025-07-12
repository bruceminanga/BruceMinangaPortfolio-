import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  BrowserRouter as Router, // Note: Using HashRouter in App.jsx, keep consistent if needed elsewhere
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
import blogging1 from "../../assets/images/blogging1.jpg";
import blogging2 from "../../assets/images/blogging2.jpg";
import blogging3 from "../../assets/images/blogging3.jpg";
import myLogo from "../../assets/images/My-logo.png";

// ImageCarousel Component (Fixed - was missing)
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        No images
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt="Service"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src =
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50" y="50" text-anchor="middle" dy=".3em">No Image</text></svg>';
        }}
      />
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full">
      <img
        src={images[currentIndex]}
        alt={`Service ${currentIndex + 1}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src =
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50" y="50" text-anchor="middle" dy=".3em">No Image</text></svg>';
        }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Helper to format description with bold text
const formatDescription = (text) => {
  if (typeof text !== "string") {
    console.warn("formatDescription received non-string input:", text);
    return text;
  }

  // Split by markdown links first
  const parts = text.split(/(\[.*?\]\(.*?\))/g);

  return parts.map((part, index) => {
    // Check if this part is a markdown link
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      const [_, linkText, linkUrl] = linkMatch;
      return (
        <BlogLink key={index} href={linkUrl}>
          {linkText}
        </BlogLink>
      );
    }

    // Handle bold text with asterisks
    return part
      .split("*")
      .map((subPart, subIndex) =>
        subIndex % 2 === 0 ? (
          subPart
        ) : (
          <strong key={`${index}-${subIndex}`}>{subPart}</strong>
        )
      );
  });
};

// Reusable Blog Link component
const BlogLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 hover:underline inline"
  >
    {children}
  </a>
);

// --- DATA STRUCTURE ---
export const MyServicesItems = {
  professional: [
    {
      id: "tech-lead",
      title: "Tech Lead & Tech Sales Representative",
      description:
        "Selling quality tech products (laptops, storage) with basic desktop support included.",
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
      // No 'whatsIncluded' array here, so the section won't render for this item
    },
    {
      id: "software-engineering",
      title: "Software Engineering & IT Operations",
      description:
        "Web development, software installation/maintenance, and computer troubleshooting/repair.",
      fullDescription: `In September of 2023, I started to provide the following services:

*Web Development Services:* I charge according to your website's complexity.
-Order now and get free access to my services @BruceMinangas.world
*My achievements as a web developer*
1. Designed 2 websites achieving 95% client satisfaction rate.

*IT Operations.* They include:
1. Software Installations and maintenance.
-Latest Windows software (windows 10,11, office 2021,Antivirus)=ksh700 each
-Windows and office activation=ksh500 each
2. Troubleshooting your computer.
-Fixing software issue=ksh500
-Computer repair=The price will vary based on the extent of damage to your device.

Unlike other local people who fix clients machines:
-I explain honestly whats wrong with clients machine and fix them permanently which in the long term saves clients money.`,
      images: [softwareEngineeringImage],
      // --- ADDED What's Included ---
      whatsIncluded: {
        "Web Development (Example)": [
          // Example of using objects for sub-sections
          "Custom Website Design & Development",
          "Responsive Design (Mobile, Tablet, Desktop)",
          "Content Management System (Optional)",
          "Basic SEO Optimization",
          "Contact Form Integration",
          "Deployment Assistance",
        ],
        "IT Operations": [
          "Windows/Office Installation & Activation (as per listed prices)",
          "Antivirus Installation (as per listed prices)",
          "Software Troubleshooting (as per listed price)",
          "Hardware Repair (Price varies)",
          "Honest Diagnosis & Long-Term Fixes",
        ],
      },
      // --- END ---
    },
  ],
  interests: [
    {
      id: "philosophy",
      title: "Philosophy, Philanthropy And History",
      description:
        "Exploring philosophical concepts, philanthropy, and historical context.",
      fullDescription: `In September of 2023, I started to learn relevant  philosophical concepts which helps in rewiring my brain to get me out of inappropriate social constructs, logical fallacies & embracing conspiracy theories created by some corporates & our ancestors.
- Learning philosophy of psychology makes my life better & learning history makes me know where i came from & predict where I'm heading to.
*Key Findings:*
1. Philosophers can be wrong; they present to you their thoughts 🤷🏽‍♂️ 
2. It's easier to understand people's thoughts when you are a philosopher.
3. Philosophers run the world.

*My best philosophy of epistemology concepts:*
1. Solipsism: You & only you exist, therefore Compete with yourself, not others. 
2. Empiricism: The source of human knowledge is experience.
3. Rationalism: Reason & logic are the primary sources of knowledge & truth.
*My best philosophy of ethics concepts*
1. Resilience & Stoicism. Ability to endure Destructions
*My best philosophy of Decison theory/Strategic Interaction concepts*
1. The game theory. Life is a challenging fun game, Learn how to play it.(Jumanji)
*My best philosophy of psychology concepts:*
1. Halo effect. One good aspect of a product/person making people create a general opinion
2. Habituation. Decrease in response to repetitive stimuli
*Psychological concepts I can't entirely agree fully with:*
1. Synchronicity. Coincidences

*Fun history:*
1. Revolutions eg Agrarian revolutions, political revolutions, Cultural/social revolution, Sexual revolution etc
*Horror history*
1. Dark ages. A period between 5th-15th century.

I am selling each package of a successful philosophical concept (Intellectual property) at ksh500`,
      images: [philosophyImage],
    },
    {
      id: "research",
      title: "Research & Did You Know Phrase",
      description:
        "Focusing on life pattern analysis (Life Framework) and technological research.",
      fullDescription: `Actively engaged in research since September 2023:
1️⃣ *Life Pattern Analysis:* Developing the "Life Framework" project focusing on pattern recognition, utilization, and creation across key areas:
    -| Health and Awareness
    -| Relationships & Pleasures
    -| Work & Contribution To Society
2️⃣ *Technological Research:* Exploring advancements and trends in technology.

🎒*Personal Insights & Updates (Did You Know):*🎒
1️⃣ My portfolio is regularly updated with new projects and insights.
2️⃣ Subscribing to BruceMinangas.world provides access to more detailed research and systems.`,
      images: [researchImage],
    },
  ],
  hobbies: [
    {
      id: "swimming",
      title: "Swimming & Adventure",
      description: "Exploring the world physically and metaphorically.",
      fullDescription: `Exploring the world with like-minded individuals to understand its wonders. Swimming provides both physical activity and a meditative experience, evolving from childhood baths to enjoying heated pools. Adventure seeking broadens perspectives.`,
      images: [swimmingImage],
    },
    {
      id: "teaching",
      title: "Teaching & Public speaking",
      description: "Sharing knowledge in programming and technology.",
      fullDescription: `I love to spread the knowledge i gained throughout my work to the world. I do teach the following:
1. Programming & Tech with some Philosophical Concepts
2. Mindset Education. Mindset is like a way of thinking. It's what you believe about yourself and what you can do.

*Types of mindset*
1. Fixed mindset. It's when you believe you can't get better at something, no matter how hard you try
2. Growth mindset. It's when you believe you can get better at something if you keep trying and practising. Those who cannot change their minds, cannot change anything
3. False growth mindset. Having surface level belief in improvement without engaging in the actual behaviour that lead to growth 

*Applying mindset principles*
1. At work. Encourage innovation & learning from mistakes 
2. In relationship. Build stronger connections and resolve conflicts
3. Health and wellness. Adopt and maintain healthy habits

I teach in form of blogging & story telling

*Featured Blogs:*
[1. Saying Techy Words Doesn't Make Us Techy](https://www.linkedin.com/pulse/saying-techy-words-doesnt-make-us-bruce-minanga-zsj5f/?trackingId=sjjykjZUQKSivOPF0VKurg%3D%3D)
[2. Understanding Computer Programming Languages (Series)](https://www.linkedin.com/pulse/understanding-computer-programming-languages-bruce-minanga-sy47f/?trackingId=sjjykjZUQKSivOPF0VKurg%3D%3D)
[3. Linux Philosophy (Series)](https://www.linkedin.com/pulse/linux-philosophy-bruce-minanga-dqevf/)
[4. The Game Theory](https://www.linkedin.com/pulse/game-theory-bruce-minanga-73anf/)

*My Stories include:*
1. My tech journey

You can also Hire me as a public speaker to talk about my projects`,
      images: [teachingImage],
      price: "KES 100/hr (Teaching), KES 3000/hr (Speaking)",
    },
    {
      id: "family-time",
      title: "Spending Time With Family & Friends",
      description: "Appreciating the support system.",
      fullDescription: `Deeply grateful to my family (especially Mom and Dad) and friends for their unwavering support and care throughout my endeavors. Meaningful relationships are fundamental. Peace ✌️

Consider subscribing @BruceMinangas.world for insights on building support systems. (Clarify subscription benefits).`,
      images: [familyTimeImage],
    },
  ],
};

// --- ITEM DETAIL VIEW COMPONENT (Already exported via 'export const') ---
export const ItemDetailView = () => {
  const { category, id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const detailViewRef = useRef(null);

  // Find the item safely
  const categoryItems = MyServicesItems[category] || [];
  const selectedItem = categoryItems.find((item) => item.id === id);

  const toggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  // Handle scrolling for effects
  useEffect(() => {
    const handleScroll = () => {
      if (detailViewRef.current) {
        setScrollPosition(detailViewRef.current.scrollTop);
      }
    };
    const detailView = detailViewRef.current;
    if (detailView) {
      detailView.addEventListener("scroll", handleScroll);
      return () => detailView.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Handle item not found
  if (!selectedItem) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold text-red-600">Item not found</h2>
        <Link
          to="/MyServices"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Go back to Services
        </Link>
      </div>
    );
  }

  // Image parallax effect styles
  const imageHeight = 250; // Adjusted height
  const scrollThreshold = 150; // When effect becomes prominent
  const imageStyle = {
    height: `${Math.max(50, imageHeight - scrollPosition * 0.8)}px`, // Ensure min height
    opacity: Math.max(0.1, 1 - scrollPosition / scrollThreshold), // Ensure min opacity
    transition: "height 0.1s linear, opacity 0.1s linear", // Faster transition
  };

  // Render description based on type (string or function)
  const renderDescriptionContent = () => {
    const descriptionToShow = showFullDescription
      ? selectedItem.fullDescription
      : selectedItem.description;
    if (typeof descriptionToShow === "function") {
      return descriptionToShow(); // Call the function if it's JSX
    } else {
      // Handle string descriptions with formatting
      return (
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {formatDescription(descriptionToShow || "")}{" "}
          {/* Ensure it's a string */}
        </p>
      );
    }
  };

  // Render "What's Included" section data
  const renderWhatsIncluded = () => {
    if (!selectedItem.whatsIncluded) return null; // No data

    // Handle array of strings
    if (Array.isArray(selectedItem.whatsIncluded)) {
      return (
        <ul className="list-disc list-inside pl-2 space-y-1 text-gray-700">
          {selectedItem.whatsIncluded.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }

    // Handle object (for sub-sections)
    if (
      typeof selectedItem.whatsIncluded === "object" &&
      !Array.isArray(selectedItem.whatsIncluded)
    ) {
      return (
        <div className="space-y-3">
          {Object.entries(selectedItem.whatsIncluded).map(
            ([subHeading, items]) => (
              <div key={subHeading}>
                <h4 className="font-semibold text-gray-700 mb-1">
                  {subHeading}:
                </h4>
                <ul className="list-disc list-inside pl-4 space-y-1 text-gray-600">
                  {Array.isArray(items) ? (
                    items.map((item, index) => (
                      <li key={`${subHeading}-${index}`}>{item}</li>
                    ))
                  ) : (
                    <li>Invalid data format for items</li>
                  )}
                </ul>
              </div>
            )
          )}
        </div>
      );
    }

    return (
      <p className="text-red-500">
        Error: Invalid format for "What's Included".
      </p>
    ); // Handle unexpected format
  };

  return (
    // Modal-like container
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-auto my-4 shadow-xl relative border border-gray-200">
      {/* Scrollable Content Area */}
      <div
        ref={detailViewRef}
        className="flex-grow overflow-y-auto"
        // style={{ maxHeight: "calc(90vh - 60px)" }} // Max height for scroll area if needed
      >
        {/* Image Carousel with Parallax */}
        {selectedItem.images && selectedItem.images.length > 0 && (
          <div
            style={imageStyle}
            className="overflow-hidden w-full sticky top-0 z-0"
          >
            {" "}
            {/* Sticky image */}
            <ImageCarousel images={selectedItem.images} />
          </div>
        )}

        {/* Text Content */}
        <div className="p-5 md:p-8 relative z-10 bg-white">
          {" "}
          {/* Ensure text is above sticky image */}
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            {selectedItem.title}
          </h2>
          {selectedItem.price && (
            <p className="text-xl font-semibold mb-4 text-blue-600">
              {selectedItem.price}
            </p>
          )}
          {/* Description Area */}
          <div className="mb-4 prose max-w-none prose-strong:font-semibold">
            {" "}
            {/* Using prose for better text styling */}
            {renderDescriptionContent()}
          </div>
          {/* Read More/Less Button */}
          {(typeof selectedItem.fullDescription === "function" ||
            (selectedItem.fullDescription &&
              selectedItem.fullDescription !== selectedItem.description)) && (
            <button
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium mb-4"
              onClick={toggleDescription}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          )}
          {/* --- WHAT'S INCLUDED SECTION --- */}
          {selectedItem.whatsIncluded && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What's Included:
              </h3>
              {renderWhatsIncluded()}
            </div>
          )}
          {/* --- END WHAT'S INCLUDED --- */}
          {/* Referral Info */}
          {selectedItem.referral && (
            <p className="text-sm text-green-600 mt-5 p-3 bg-green-50 border border-green-200 rounded-md">
              💰 {selectedItem.referral}
            </p>
          )}
        </div>
      </div>

      {/* Back Button - Positioned at the bottom */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 sticky bottom-0 z-20 flex justify-start">
        <Link
          to="/MyServices" // Ensure this path matches your routing setup
          className={`bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center text-sm shadow`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Services
        </Link>
      </div>
    </div>
  );
};

// --- MAIN SERVICES LIST PAGE ---
const MyServicesPage = () => {
  const renderItemList = useCallback(
    (items, category) => (
      <div className="mt-4 grid grid-cols-1 gap-4">
        {items.map((item) => (
          // Make sure the path here matches your Route definition in App.jsx
          <Link key={item.id} to={`/services/${category}/${item.id}`}>
            <div className="flex items-start p-4 bg-white rounded-lg shadow transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-200">
              <img
                src={item.images[0]} // Use first image as thumbnail
                alt={item.title}
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0 mr-4 mt-1" // Added margin-top
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50" y="50" text-anchor="middle" dy=".3em">No Image</text></svg>';
                }}
              />
              <div className="flex-grow min-w-0">
                {" "}
                {/* Added min-w-0 for proper text wrapping */}
                <h4 className="font-semibold text-base md:text-lg text-gray-800 truncate">
                  {item.title}
                </h4>{" "}
                {/* Added truncate */}
                <p
                  className="text-sm text-gray-600 mt-1 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {" "}
                  {/* Fixed line-clamp-2 issue */}
                  {typeof item.description === "string"
                    ? item.description
                    : "View details"}
                </p>
                {item.price && (
                  <p className="text-sm font-semibold text-blue-600 mt-2">
                    {item.price}
                  </p>
                )}
              </div>
              <ChevronRight className="text-gray-400 ml-2 flex-shrink-0 self-center" />
            </div>
          </Link>
        ))}
      </div>
    ),
    []
  );

  // Component Render
  return (
    // Using a simpler background, letting the parent handle overall background
    <div className="max-w-3xl mx-auto px-2 sm:px-4 pb-10">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-30 rounded-b-lg mb-4 border-b border-gray-200">
        <Link to="/" className="text-gray-600 hover:text-gray-900 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-800">
          Bruce's Services
        </h1>
      </div>

      {/* Welcome Banner */}
      <div
        className="text-white p-6 rounded-lg mb-8 flex flex-col justify-center items-center shadow-lg text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${myLogo})`, // Assuming myLogo is appropriate, otherwise use a generic banner image
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "180px",
        }}
      >
        <h2 className="text-2xl font-bold mb-2">
          Welcome to BruceMinanga's World
        </h2>
        <p className="max-w-xl">
          Hi! I'm Bruce, the IT guy & the owner of this digital realm. Exploring
          technology, philosophy, and more. Let me bring your digital dreams to
          life (He/him).
        </p>
      </div>

      {/* Service Categories */}
      {Object.entries(MyServicesItems).map(([category, items]) => (
        <div key={category} className="mb-8">
          <div className="flex justify-between items-center mb-2 px-1">
            <h3 className="text-xl font-semibold text-gray-800">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            {/* Link to Category Page (if you implement one) */}
            {/* <Link to={`/category/${category}`} className="text-blue-600 hover:underline text-sm font-medium">See all</Link> */}
          </div>
          {/* Render first few items */}
          {renderItemList(items.slice(0, 4), category)}{" "}
          {/* Show up to 4 items initially */}
          {/* Add a "See More" if applicable */}
          {/* {items.length > 4 && <Link to={`/category/${category}`} className="...">See all {category}</Link>} */}
        </div>
      ))}
    </div>
  );
};

// --- CORRECTED EXPORT ---
// Only the default export is needed here.
// ItemDetailView is already exported above using 'export const'.
export default MyServicesPage;
