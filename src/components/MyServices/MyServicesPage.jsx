import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ImageCarousel from "./ImageCarousel";

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

const formatDescription = (text) => {
  return text
    .split("*")
    .map((part, index) =>
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
};

const BlogLink = ({ href, children }) => (
  <Link
    to={href}
    className="text-blue-600 hover:text-blue-800 hover:underline block mb-2"
  >
    {children}
  </Link>
);

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
      title: "Tech Lead & Tech Sales Representative",
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
      title: "Software Engineering & IT Operations",
      description:
        "In September of 2023, I started to focus on software engineering and IT Operation.",
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
    },
    {
      id: "Photos-professionale",
      title: "Photos Professionale",
      description:
        "In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials.",
      fullDescription:
        "In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials. They are important because they help in brand recognition, shows professionalism, consistency and emotional support.",
      price: "KES 1,500.00",
      images: [logoMakerImage],
      referral: "Refer clients to me and get ksh500 per client after payment.",
    },
  ],
  interests: [
    {
      id: "Blogging",
      title: "Blogging, Stories & Mindset Education",
      description: "Available on linkedin:",
      fullDescription: () => (
        <>
          <p>Blogs available on linkedin</p>
          <div className="mt-4 space-y-2">
            <BlogLink href="https://www.linkedin.com/pulse/saying-techy-words-doesnt-make-us-bruce-minanga-zsj5f/?trackingId=sjjykjZUQKSivOPF0VKurg%3D%3D">
              1. Saying techy words doesn't make us techy
            </BlogLink>
            <BlogLink href="https://www.linkedin.com/pulse/understanding-computer-programming-languages-bruce-minanga-sy47f/?trackingId=sjjykjZUQKSivOPF0VKurg%3D%3D">
              2. Understanding Computer Programming Languages (Part 1,2,3)
            </BlogLink>
            <BlogLink href="https://www.linkedin.com/pulse/linux-philosophy-bruce-minanga-dqevf/">
              3. Linux philosophy (Part 1,2)
            </BlogLink>
            <BlogLink href="https://www.linkedin.com/pulse/game-theory-bruce-minanga-73anf/">
              4. The game theory
            </BlogLink>
          </div>

          <h3 className="font-bold mt-4 mb-2">My Stories include:</h3>
          <p>1. My tech journey</p>

          <h3 className="font-bold mt-4 mb-2">Mindset Education</h3>
          <p>
            Mindset is like a way of thinking. It's what you believe about
            yourself and what you can do.
          </p>

          <h4 className="font-semibold mt-3 mb-2">Types of mindset</h4>
          <ol className="list-decimal list-inside">
            <li>
              Fixed mindset. It's when you believe you can't get better at
              something, no matter how hard you try
            </li>
            <li>
              Growth mindset. It's when you believe you can get better at
              something if you keep trying and practising. Those who cannot
              change their minds, cannot change anything
            </li>
          </ol>

          <h4 className="font-semibold mt-3 mb-2">
            Applying mindset principles
          </h4>
          <ol className="list-decimal list-inside">
            <li>At work. Encourage innovation & learning from mistakes</li>
            <li>
              In relationship. Build stronger connections and resolve conflicts
            </li>
            <li>Health and wellness. Adopt and maintain healthy habits</li>
          </ol>
        </>
      ),
      images: [blogging1, blogging2, blogging3],
    },
    {
      id: "philosophy",
      title: "Philosophy, Psychology & History",
      description:
        "In September of 2023, I started to learn philosophy, psychology",
      fullDescription: `In September of 2023, I started to learn philosophy. It is helping me rewire my brain and help me get out of inappropriate social constructs. On the other hand, psychology makes human lives better and history makes us know where we came from and where we are heading to.
*Here are my true findings:*
1. Philosophers can be wrong; they present to you their thoughts 🤷🏽‍♂️
2. It's easier to understand people's thoughts when you are a philosopher.
3. Philosophers run the world. 

*My best philosophical concepts:*
1. Solipsism: You and only you exist.
2. Empiricism: The source of human knowledge is experience.
3. Rationalism: Reason and logic are the primary sources of knowledge and truth.
4. Resilience & Stoicism. Ability to endure Destructions

*My best psychological concepts:*
1. Halo effect. Judgment based on looks 
2. Habituation. Disliking repetitive tasks. 

*Psychological concepts I can't entirely agree fully with:*
1. Synchronicity. Coincidences

*Horror history:*
1. Dark ages. A period between 5th-15th century.

I am selling each package of a successful philosophical solution (Intellectual property) at ksh500.`,
      price: "KES 500.00",
      images: [philosophyImage],
    },
    {
      id: "research",
      title: "Research & Did You Know Phrase",
      description:
        "In September of 2023, I'm intensly starting to get involced in reasearch.",
      fullDescription: `In September of 2023, i'm intensively starting to get involved in the following research
1️⃣Life pattern recognition, pattern utilisation and pattern creation. 
My project called Life Framework has 3 sections: 
-| Health and Awareness
-| Relationships=Pleasures
-| Work=Contribution To Society
2️⃣Technological research

🎒Personal🎒
Did you know:
1️⃣I regularly update my Portfolio

Subscribe to BruceMinangas.world to learn more of my research`,
      price: "KES 3,000.00",
      images: [researchImage],
    },
  ],
  hobbies: [
    {
      id: "swimming",
      title: "Swimming & Adventure",
      description: "This is how I explore the world.",
      fullDescription: `This is how i explore the world with like minded individuals to understand how everything within it was made.

As a child, my parents gently bathed me in a warm basin. It was fun. As a grown-up, I upgraded to a heated swimming pool. It's fun. 
`,
      images: [swimmingImage],
    },
    {
      id: "teaching",
      title: "Teaching & Public speaking",
      description: "I love to spread the knowledge I have.",
      fullDescription: `I love to spread the knowledge i gained throughout my work to the world. Currently, i do teach and charge ksh100 per hour. I do teach the following:
1️⃣Programming
You can also Hire me as a public speaker to talk about science, technology and engineering.
I charge ksh3000 per hour. Transport Cost Not Included.`,
      images: [teachingImage],
    },
    {
      id: "family-time",
      title: "Spending Time With Family & Friends",
      description: "To all my family (My Mom and Dad).",
      fullDescription: `To all my family (My Mom and Dad in particular) and friends who gave me support and care throughout my dream endeavours, I am highly grateful. I would be nothing without you. Peace ✌️

Don't forget to subscribe @BruceMinangas.world to get free support system`,
      images: [familyTimeImage],
    },
  ],
};

const ItemDetailView = () => {
  const { category, id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const detailViewRef = useRef(null);

  const selectedItem = MyServicesItems[category].find((item) => item.id === id);

  const toggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (detailViewRef.current) {
        setScrollPosition(detailViewRef.current.scrollTop);
      }
    };

    const detailView = detailViewRef.current;
    if (detailView) {
      detailView.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (detailView) {
        detailView.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (!selectedItem) return <div>Item not found</div>;

  const imageHeight = 300;
  const scrollThreshold = 100;

  const imageStyle = {
    height: `${Math.max(0, imageHeight - scrollPosition)}px`,
    opacity: Math.max(0, 1 - scrollPosition / scrollThreshold),
    transition: "height 0.3s ease-out, opacity 0.3s ease-out",
  };

  const renderDescription = () => {
    if (typeof selectedItem.fullDescription === "function") {
      return showFullDescription ? (
        selectedItem.fullDescription()
      ) : (
        <p>{selectedItem.description}</p>
      );
    } else {
      return (
        <p className="text-gray-700 whitespace-pre-line">
          {formatDescription(
            showFullDescription
              ? selectedItem.fullDescription
              : selectedItem.description
          )}
        </p>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col mx-auto mt-4 relative">
      <div
        ref={detailViewRef}
        className="flex-grow overflow-y-auto"
        style={{ maxHeight: "calc(90vh - 60px)" }}
      >
        <div style={imageStyle} className="overflow-hidden">
          <ImageCarousel images={selectedItem.images} />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
          {selectedItem.price && (
            <p className="text-xl font-semibold mb-2 text-blue-600">
              {selectedItem.price}
            </p>
          )}
          <div className="mb-4">{renderDescription()}</div>
          {selectedItem.fullDescription &&
            selectedItem.fullDescription !== selectedItem.description && (
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
      </div>
      <Link
        to="/MyServices"
        className={`fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center ${
          scrollPosition > 50 ? "opacity-75 hover:opacity-100" : "opacity-100"
        }`}
        style={{
          transform: `translateY(${Math.min(scrollPosition / 2, 20)}px)`,
        }}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </Link>
    </div>
  );
};

const MyServicesPage = () => {
  const renderItemList = useCallback(
    (items, category) => (
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <Link key={item.id} to={`/${category}/${item.id}`}>
            <div className="flex items-center p-3 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
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
          </Link>
        ))}
      </div>
    ),
    []
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
            {renderItemList(items.slice(0, 3), category)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServicesPage;
export { ItemDetailView };
