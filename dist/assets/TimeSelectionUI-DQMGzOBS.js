import{n as E,r as i,e as A,j as e,y as U,z as R,A as W,C as z,i as w,x as L,B as j,v as D,D as J,E as M,U as _}from"./index-B1mh-_A2.js";import{l as H}from"./index-C2oXYAX5.js";import{F as V}from"./footer-DIjnHZgA.js";const Z=()=>{const C=E(),[r,P]=i.useState({}),[u,S]=i.useState(),[s,p]=i.useState(null),[o,T]=i.useState(null),[v,F]=i.useState(null),y=new URLSearchParams(C.search),f=y.get("carId"),N=y.get("bookingDetail");let c=null;const I=A(t=>t.token.token);if(N)try{c=JSON.parse(N),console.log(c)}catch(t){console.error("Error parsing booking detail:",t)}console.log(f),i.useEffect(()=>{(async()=>{if(f!==null){const n=await L(f,"user");if(P(n),S(n.category),c!=null&&c.startDate&&c.endDate&&n.rentPricePerDay){const d=new Date(c.startDate),m=new Date(c.endDate),x=Math.ceil((m.getTime()-d.getTime())/(1e3*60*60*24));if(x===0){let a=n.rentPricePerDay,l=0,h=parseFloat(a.toFixed(2));const g={...c,amount:a,total:h,discount:l};p(g)}else{let a,l,h;n.offer.price&&n.offer.discount?(console.log("Offer found"),a=x*n.offer.price,l=n.offer.discount,h=parseFloat(a.toFixed(2)),console.log(a,l,h)):(console.log("Offer not found"),a=x*n.rentPricePerDay,l=0,h=parseFloat(a.toFixed(2)));const g={...c,amount:a,total:h,discount:l};p(g)}}else j.error("No start date or end date found")}})()},[]),i.useEffect(()=>{console.log("booking: ",s)});const k=async()=>{console.log("entered booking");const t=await H("pk_test_51PDiVJSFg3h3pm8hFZ9xw2Duq8djIUTp0t5I6M5yMguU8KpIdUnUt0epBFvTkOx0jWV3NWOQkE402iZat4c2JX8P00Hl0S8Igy"),n=localStorage.getItem("token")??"",d=await D(n).payload,m=await J(s,r._id,d);console.log("bookingdetail : ",m),await(t==null?void 0:t.redirectToCheckout({sessionId:m}))},B=async()=>{try{const n=await D(I).payload;if(console.log(n),o&&o.coupon){const d=await M(o.coupon,n);if(d.status==="failed")j.error(d.data.message);else{const m=d.data;if(m.length>0){const x=m[0];F(x);const a=s!=null&&s.amount?s.amount*(x.discountData.percentage/100):0,l=s!=null&&s.amount?s.amount-a:0;p({...s,discount:x.discountData.percentage,total:l})}else j.error("No data found in apply.data")}}}catch(t){console.log(t.message),j.error(t.message)}};i.useEffect(()=>{console.log(v)},[v]);const O=t=>{T({...o,coupon:t.target.value})};return e.jsx("div",{className:"container-fluid main-container",style:{padding:"0px"},children:e.jsx("div",{className:"main-content-parts",children:e.jsxs("div",{className:"row d-flex flex-column justify-content-center align-items-center",children:[e.jsxs("div",{className:"col-12 position-relative",style:{padding:"0"},children:[e.jsx("img",{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1714982583/Assets/page%20banners/wlgead61omjt2dx37xdz.png",style:{width:"100%",height:"34rem"},alt:"Booking Banner"}),e.jsx("div",{className:"overlay"}),e.jsxs("div",{className:"text-overlay",children:[e.jsx("h1",{className:"car-heading",children:"Book Your Car"}),e.jsx("p",{className:"car-text",children:"Explore our wide range of cars and find the perfect one for your next adventure."})]})]}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"contents",children:e.jsxs("div",{className:"row d-flex justify-content-center align-items-center",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"left-contents",children:[e.jsx("div",{className:"d-flex justify-content-center align-items-center",children:e.jsx("h4",{children:"Booking Details"})}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-6",children:e.jsx("div",{className:"image-content mt-4",children:e.jsx("img",{src:r.thumbnailImg,style:{width:"100%",height:"auto"},alt:"Car"})})}),e.jsxs("div",{className:"col-6",children:[e.jsx("div",{className:"right-detail-content",children:e.jsx("p",{className:"text-center",style:{fontFamily:"Archivo",fontWeight:"bolder"},children:r.name})}),e.jsxs("div",{className:"cars-details d-flex align-items-center",children:[e.jsxs("div",{className:"div-cars",children:[e.jsx(U,{})," ",e.jsxs("strong",{children:[r.seats," seater"]})]}),e.jsxs("div",{className:"div-cars",children:[e.jsx(R,{})," ",e.jsx("strong",{children:u==null?void 0:u.name})]})]}),e.jsxs("div",{className:"cars-details d-flex align-items-center mt-3",children:[e.jsxs("div",{className:"div-cars",children:[e.jsx(W,{})," ",e.jsxs("strong",{children:[r.mileage," per ltr"]})]}),e.jsxs("div",{className:"div-cars",children:[e.jsx(z,{}),e.jsx("strong",{children:r.fuelType})]})]})]}),e.jsxs("div",{className:"row mt-4",children:[e.jsx("h5",{children:"Details"}),e.jsxs("div",{className:"col-md-12",children:[e.jsxs("div",{className:"d-flex justify-content-start align-items-start",children:[e.jsx("p",{children:"Rating"}),": ",e.jsx("strong",{children:r.rating})]}),e.jsxs("div",{className:"d-flex justify-content-center align-items-start",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("strong",{children:"From"}),e.jsx("p",{children:s==null?void 0:s.pickupLocation}),e.jsxs("small",{children:[s!=null&&s.startDate?new Date(s.startDate).toISOString().split("T")[0]:"",", ",s==null?void 0:s.pickupTime]})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("strong",{children:"To"}),e.jsxs("p",{children:[s==null?void 0:s.dropOffLocation,"n"]}),e.jsxs("small",{children:[s!=null&&s.endDate?new Date(s.endDate).toISOString().split("T")[0]:"",", ",s==null?void 0:s.dropOffTime]})]})]})]})]})]})]})}),e.jsx("div",{className:"col-3",children:e.jsx("div",{className:"right-contents",children:e.jsx("div",{className:"d-flex justify-content-center align-items-center",children:e.jsxs("div",{className:"rightside-contents",children:[e.jsx("div",{children:e.jsx("h4",{children:"Payment Details"})}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"contents d-flex flex-column align-items-center justify-content-center",children:[e.jsx("strong",{children:"Price Summary"}),e.jsxs("div",{className:"col-12 d-flex justify-content-between align-items-center mt-4",children:[e.jsx("strong",{children:"Rent price:"})," ",e.jsxs("span",{children:["₹ ",s==null?void 0:s.amount]})]}),e.jsxs("div",{className:"col-12 d-flex justify-content-between align-items-center mt-4",children:[e.jsx("strong",{children:"Discount:"})," ",e.jsxs("span",{children:[s==null?void 0:s.discount," %"]})]}),e.jsx("hr",{className:"col-12 mt-1"}),e.jsxs("div",{className:"col-12 d-flex justify-content-between align-items-center mt-4",children:[e.jsx("strong",{children:"Total :"})," ",e.jsxs("span",{children:["₹ ",s==null?void 0:s.total]})]}),e.jsxs("div",{className:"col-12 mt-4",children:[e.jsx("input",{type:"text",placeholder:"Enter coupon code",value:o==null?void 0:o.coupon,onChange:O,className:"form-control"}),e.jsx(w,{onClick:B,style:{width:"100%",marginTop:"10px"},children:"Apply Coupon"})]})]})})]})})})}),e.jsx("div",{className:"col-3",children:e.jsx("div",{className:"right-contents",children:e.jsx("div",{className:"d-flex justify-content-center align-items-center",children:e.jsxs("div",{className:"rightside-contents",children:[e.jsx("div",{children:e.jsx("h4",{children:"Online Payment"})}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"contents-parts d-flex flex-column align-items-center justify-content-center",children:[e.jsx("div",{className:"col-12",children:e.jsx("img",{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1715002718/others/t4tzk737jgilgpbb53mt.png",style:{width:"100%"}})}),e.jsx("div",{className:"col-12 mt-4",children:e.jsx("p",{style:{fontSize:"12px",fontWeight:"500"},children:"At RAC, we offer a seamless and secure online payment process to make booking your rental car hassle-free. With our encrypted payment gateway, you can confidently complete your transaction knowing that your personal and financial information is protected."})}),e.jsx("div",{className:"col-12 mt-2",children:e.jsx(w,{onClick:k,style:{width:"100%"},children:"Pay now"})})]})})]})})})})]})})})]})})})},Q=()=>e.jsxs(e.Fragment,{children:[e.jsx(_,{}),e.jsx(Z,{}),e.jsx(V,{})]});export{Q as default};