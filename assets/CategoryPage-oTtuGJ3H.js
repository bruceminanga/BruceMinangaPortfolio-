import{u as b,r as a,j as e,L as g}from"./index-C5LPryNt.js";import{M as f,I as j,C as N,a as v}from"./MyServicesPage-BmnwT2Mi.js";const x=3,w=r=>r.split("*").map((t,i)=>i%2===0?t:e.jsx("strong",{children:t},i)),k=()=>{const{category:r}=b(),t=f[r]||[],[i,m]=a.useState(x),[l,n]=a.useState(null),[c,o]=a.useState(!1),h=a.useCallback(()=>{m(s=>Math.min(s+x,t.length))},[t.length]),u=a.useCallback(s=>{n(s),o(!1)},[]),d=a.useCallback(()=>{o(s=>!s)},[]),p=a.useCallback(()=>l?e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",children:e.jsxs("div",{className:"bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col",children:[e.jsx(j,{images:l.images}),e.jsxs("div",{className:"p-6 flex-grow overflow-y-auto",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:l.title}),l.price&&e.jsx("p",{className:"text-xl font-semibold mb-2 text-blue-600",children:l.price}),e.jsx("div",{className:"mb-4",children:e.jsx("p",{className:"text-gray-700 whitespace-pre-line",children:w(c?l.fullDescription:l.description)})}),l.fullDescription&&e.jsx("button",{className:"text-blue-500 underline",onClick:d,children:c?"Read less":"Read more"}),l.referral&&e.jsx("p",{className:"text-sm text-blue-500 mt-2",children:l.referral})]}),e.jsx("div",{className:"p-4 border-t",children:e.jsx("button",{className:"w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300",onClick:()=>n(null),children:"Close"})})]})}):null,[l,c,d]);return e.jsxs("div",{className:"max-w-4xl mx-auto bg-gray-100 min-h-screen",children:[e.jsxs("div",{className:"bg-white p-4 flex items-center shadow-md",children:[e.jsx(g,{to:"/",className:"text-gray-600",children:e.jsx(N,{className:"w-6 h-6"})}),e.jsx("h1",{className:"text-xl font-semibold ml-4",children:r.charAt(0).toUpperCase()+r.slice(1)})]}),e.jsx("div",{className:"p-4 space-y-8",children:t.slice(0,i).map(s=>e.jsxs("div",{className:"flex items-center p-3 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg",onClick:()=>u(s),children:[e.jsx("img",{src:s.images[0],alt:s.title,className:"w-16 h-16 rounded-lg object-cover"}),e.jsxs("div",{className:"ml-4 flex-grow",children:[e.jsx("h4",{className:"font-semibold text-lg",children:s.title}),e.jsxs("p",{className:"text-sm text-gray-600",children:[s.description.substring(0,50),"..."]}),s.price&&e.jsx("p",{className:"text-sm font-semibold text-blue-600 mt-1",children:s.price})]}),e.jsx(v,{className:"text-gray-400"})]},s.id))}),i<t.length&&e.jsx("div",{className:"flex justify-center pb-8",children:e.jsx("button",{onClick:h,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200",children:"Load More"})}),l&&p()]})};export{k as default};