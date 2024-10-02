import{r,j as e,u as S,L as h,m as N}from"./index-CmJGL5dn.js";/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=(...t)=>t.filter((s,i,o)=>!!s&&o.indexOf(s)===i).join(" ");/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var M={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=r.forwardRef(({color:t="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:c,iconNode:a,...n},u)=>r.createElement("svg",{ref:u,...M,width:s,height:s,stroke:t,strokeWidth:o?Number(i)*24/Number(s):i,className:x("lucide",l),...n},[...a.map(([b,y])=>r.createElement(b,y)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(t,s)=>{const i=r.forwardRef(({className:o,...l},c)=>r.createElement(T,{ref:c,iconNode:s,className:x(`lucide-${P(t)}`,o),...l}));return i.displayName=`${t}`,i};/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=v("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=v("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),D=({images:t})=>{const[s,i]=r.useState(0),o=()=>{const a=s===0?t.length-1:s-1;i(a)},l=()=>{const a=s===t.length-1?0:s+1;i(a)};return e.jsxs("div",{className:"relative w-full h-64 md:h-96",children:[e.jsx("img",{src:t[s],alt:`Slide ${s+1}`,className:"w-full h-full object-cover rounded-lg"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:o,className:"absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all",children:e.jsx(p,{className:"w-6 h-6 text-gray-800"})}),e.jsx("button",{onClick:l,className:"absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all",children:e.jsx(j,{className:"w-6 h-6 text-gray-800"})}),e.jsx("div",{className:"absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2",children:t.map((c,a)=>e.jsx("div",{className:`w-2 h-2 rounded-full ${a===s?"bg-white":"bg-gray-300"}`},a))})]})]})},w="/BruceMinangaPortfolio-/assets/logomaker-CzhAeukl.jpg",B="/BruceMinangaPortfolio-/assets/tech-lead-1-Skk2Nfo7.jpg",L="/BruceMinangaPortfolio-/assets/tech-lead-2-62lSMxoX.jpg",C="/BruceMinangaPortfolio-/assets/software-engineering-DE0XqEwh.jpg",H="/BruceMinangaPortfolio-/assets/philosophy-2gCOfMb9.jpg",E="/BruceMinangaPortfolio-/assets/research-B61rP87u.jpg",A="/BruceMinangaPortfolio-/assets/swimming-DmyZ2kp0.jpg",R="/BruceMinangaPortfolio-/assets/teaching-BdjQcdFi.jpg",O="/BruceMinangaPortfolio-/assets/family-time-COQvH5wn.jpg",F="/BruceMinangaPortfolio-/assets/blogging1-tkcsGaTX.jpg",$="/BruceMinangaPortfolio-/assets/blogging2-59vjBMmf.jpg",G="/BruceMinangaPortfolio-/assets/blogging3-BCZuePm5.jpg",K=t=>t.split("*").map((s,i)=>i%2===0?s:e.jsx("strong",{children:s},i)),g=({href:t,children:s})=>e.jsx(h,{to:t,className:"text-blue-600 hover:text-blue-800 hover:underline block mb-2",children:s}),f={professional:[{id:"logo-maker",title:"Logo Maker",description:"In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials.",fullDescription:"In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials. They are important because they help in brand recognition, shows professionalism, consistency and emotional support.",price:"KES 1,500.00",images:[w],referral:"Refer clients to me and get ksh500 per client after payment."},{id:"tech-lead",title:"Tech Lead & Tech Sales Representative",description:"In September of 2023, I started to sell technology products/services to customers. I have the follow",fullDescription:`In September of 2023, I started to sell technology products/services to customers. I have the following gadgets for sell:
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
🔥Order now🔥`,images:[B,L]},{id:"software-engineering",title:"Software Engineering & IT Operations",description:"In September of 2023, I started to focus on software engineering and IT Operation.",fullDescription:`In September of 2023, I started to provide the following services:

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
-I explain honestly whats wrong with clients machine and fix them permanently which in the long term saves clients money.`,images:[C]},{id:"Photos-professionale",title:"Photos Professionale",description:"In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials.",fullDescription:"In September of 2023, I started to design logos for personal and business use. Logo can be used on business cards, websites, social media profiles, and other marketing materials. They are important because they help in brand recognition, shows professionalism, consistency and emotional support.",price:"KES 1,500.00",images:[w],referral:"Refer clients to me and get ksh500 per client after payment."}],interests:[{id:"Blogging",title:"Blogging, Stories & Mindset Education",description:"Available on linkedin:",fullDescription:()=>e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Blogs available on linkedin"}),e.jsxs("div",{className:"mt-4 space-y-2",children:[e.jsx(g,{href:"https://www.linkedin.com/pulse/saying-techy-words-doesnt-make-us-bruce-minanga-zsj5f/?trackingId=sjjykjZUQKSivOPF0VKurg%3D%3D",children:"1. Saying techy words doesn't make us techy"}),e.jsx(g,{href:"https://www.linkedin.com/pulse/understanding-computer-programming-languages-bruce-minanga-sy47f/?trackingId=sjjykjZUQKSivOPF0VKurg%3D%3D",children:"2. Understanding Computer Programming Languages (Part 1,2,3)"}),e.jsx(g,{href:"https://www.linkedin.com/pulse/linux-philosophy-bruce-minanga-dqevf/",children:"3. Linux philosophy (Part 1,2)"}),e.jsx(g,{href:"https://www.linkedin.com/pulse/game-theory-bruce-minanga-73anf/",children:"4. The game theory"})]}),e.jsx("h3",{className:"font-bold mt-4 mb-2",children:"My Stories include:"}),e.jsx("p",{children:"1. My tech journey"}),e.jsx("h3",{className:"font-bold mt-4 mb-2",children:"Mindset Education"}),e.jsx("p",{children:"Mindset is like a way of thinking. It's what you believe about yourself and what you can do."}),e.jsx("h4",{className:"font-semibold mt-3 mb-2",children:"Types of mindset"}),e.jsxs("ol",{className:"list-decimal list-inside",children:[e.jsx("li",{children:"Fixed mindset. It's when you believe you can't get better at something, no matter how hard you try"}),e.jsx("li",{children:"Growth mindset. It's when you believe you can get better at something if you keep trying and practising. Those who cannot change their minds, cannot change anything"})]}),e.jsx("h4",{className:"font-semibold mt-3 mb-2",children:"Applying mindset principles"}),e.jsxs("ol",{className:"list-decimal list-inside",children:[e.jsx("li",{children:"At work. Encourage innovation & learning from mistakes"}),e.jsx("li",{children:"In relationship. Build stronger connections and resolve conflicts"}),e.jsx("li",{children:"Health and wellness. Adopt and maintain healthy habits"})]})]}),images:[F,$,G]},{id:"philosophy",title:"Philosophy, Psychology & History",description:"In September of 2023, I started to learn philosophy, psychology",fullDescription:`In September of 2023, I started to learn philosophy. It is helping me rewire my brain and help me get out of inappropriate social constructs. On the other hand, psychology makes human lives better and history makes us know where we came from and where we are heading to.
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

I am selling each package of a successful philosophical solution (Intellectual property) at ksh500.`,price:"KES 500.00",images:[H]},{id:"research",title:"Research & Did You Know Phrase",description:"In September of 2023, I'm intensly starting to get involced in reasearch.",fullDescription:`In September of 2023, i'm intensively starting to get involved in the following research
1️⃣Life pattern recognition, pattern utilisation and pattern creation. 
My project called Life Framework has 3 sections: 
-| Health and Awareness
-| Relationships=Pleasures
-| Work=Contribution To Society
2️⃣Technological research

🎒Personal🎒
Did you know:
1️⃣I regularly update my Portfolio

Subscribe to BruceMinangas.world to learn more of my research`,price:"KES 3,000.00",images:[E]}],hobbies:[{id:"swimming",title:"Swimming & Adventure",description:"This is how I explore the world.",fullDescription:`This is how i explore the world with like minded individuals to understand how everything within it was made.

As a child, my parents gently bathed me in a warm basin. It was fun. As a grown-up, I upgraded to a heated swimming pool. It's fun. 
`,images:[A]},{id:"teaching",title:"Teaching & Public speaking",description:"I love to spread the knowledge I have.",fullDescription:`I love to spread the knowledge i gained throughout my work to the world. Currently, i do teach and charge ksh100 per hour. I do teach the following:
1️⃣Programming
You can also Hire me as a public speaker to talk about science, technology and engineering.
I charge ksh3000 per hour. Transport Cost Not Included.`,images:[R]},{id:"family-time",title:"Spending Time With Family & Friends",description:"To all my family (My Mom and Dad).",fullDescription:`To all my family (My Mom and Dad in particular) and friends who gave me support and care throughout my dream endeavours, I am highly grateful. I would be nothing without you. Peace ✌️

Don't forget to subscribe @BruceMinangas.world to get free support system`,images:[O]}]},W=()=>{const{category:t,id:s}=S(),[i,o]=r.useState(!1),[l,c]=r.useState(0),a=r.useRef(null),n=f[t].find(d=>d.id===s),u=r.useCallback(()=>{o(d=>!d)},[]);if(r.useEffect(()=>{const d=()=>{a.current&&c(a.current.scrollTop)},m=a.current;return m&&m.addEventListener("scroll",d),()=>{m&&m.removeEventListener("scroll",d)}},[]),!n)return e.jsx("div",{children:"Item not found"});const k={height:`${Math.max(0,300-l)}px`,opacity:Math.max(0,1-l/100),transition:"height 0.3s ease-out, opacity 0.3s ease-out"},I=()=>typeof n.fullDescription=="function"?i?n.fullDescription():e.jsx("p",{children:n.description}):e.jsx("p",{className:"text-gray-700 whitespace-pre-line",children:K(i?n.fullDescription:n.description)});return e.jsxs("div",{className:"bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col mx-auto mt-4 relative",children:[e.jsxs("div",{ref:a,className:"flex-grow overflow-y-auto",style:{maxHeight:"calc(90vh - 60px)"},children:[e.jsx("div",{style:k,className:"overflow-hidden",children:e.jsx(D,{images:n.images})}),e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:n.title}),n.price&&e.jsx("p",{className:"text-xl font-semibold mb-2 text-blue-600",children:n.price}),e.jsx("div",{className:"mb-4",children:I()}),n.fullDescription&&n.fullDescription!==n.description&&e.jsx("button",{className:"text-blue-500 underline",onClick:u,children:i?"Read less":"Read more"}),n.referral&&e.jsx("p",{className:"text-sm text-blue-500 mt-2",children:n.referral})]})]}),e.jsxs(h,{to:"/MyServices",className:`fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center ${l>50?"opacity-75 hover:opacity-100":"opacity-100"}`,style:{transform:`translateY(${Math.min(l/2,20)}px)`},children:[e.jsx(p,{className:"w-5 h-5 mr-2"}),"Back"]})]})},X=()=>{const t=r.useCallback((s,i)=>e.jsx("div",{className:"mt-4 space-y-4",children:s.map(o=>e.jsx(h,{to:`/${i}/${o.id}`,children:e.jsxs("div",{className:"flex items-center p-3 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg",children:[e.jsx("img",{src:o.images[0],alt:o.title,className:"w-16 h-16 rounded-lg object-cover"}),e.jsxs("div",{className:"ml-4 flex-grow",children:[e.jsx("h4",{className:"font-semibold text-lg",children:o.title}),e.jsxs("p",{className:"text-sm text-gray-600",children:[o.description.substring(0,50),"..."]}),o.price&&e.jsx("p",{className:"text-sm font-semibold text-blue-600 mt-1",children:o.price})]}),e.jsx(j,{className:"text-gray-400"})]})},o.id))}),[]);return e.jsxs("div",{className:"max-w-2xl mx-auto bg-gray-100 min-h-screen",children:[e.jsxs("div",{className:"bg-white p-4 flex items-center shadow-md",children:[e.jsx(h,{to:"/",className:"text-gray-600",children:e.jsx(p,{className:"w-6 h-6"})}),e.jsx("h1",{className:"text-xl font-semibold ml-4",children:"Bruce's Services"})]}),e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"text-white p-6 rounded-lg mb-6 flex flex-col justify-center items-center shadow-lg",style:{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${N})`,backgroundSize:"cover",backgroundPosition:"center",minHeight:"200px"},children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Welcome to BruceMinanga's World"}),e.jsx("p",{className:"text-center",children:"Hi! I'm Bruce, the IT guy & the owner of this digital realm. Let me bring your digital dreams to life (He/him)"})]}),Object.entries(f).map(([s,i])=>e.jsxs("div",{className:"mb-8",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold",children:s.charAt(0).toUpperCase()+s.slice(1)}),e.jsx(h,{to:`/category/${s}`,className:"text-blue-500 text-sm font-medium",children:"See all"})]}),t(i.slice(0,3),s)]},s))]})]})},U=Object.freeze(Object.defineProperty({__proto__:null,ItemDetailView:W,MyServicesItems:f,default:X},Symbol.toStringTag,{value:"Module"}));export{p as C,D as I,f as M,j as a,U as b};
