import{aa as l,n as m,r as t,j as s,b as x,U as d}from"./index-D2IJCEmf.js";import{F as h}from"./footer-DgTo4sFv.js";const g=()=>{const{bokingDetail:a}=l(),c=m(),n=new URLSearchParams(c.search).get("bokingDetail"),[e,o]=t.useState(null);return t.useEffect(()=>{(()=>{if(n){const r=decodeURIComponent(n),i=JSON.parse(r);o(i)}})()},[n]),console.log(a),s.jsxs("div",{className:"Container d-flex flex-column justify-content-center align-items-center",style:{minHeight:"100vh",backgroundColor:"#eee",paddingTop:"2rem"},children:[s.jsx("div",{className:"wrapping",children:s.jsxs("svg",{className:"checkmark",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 52 52",children:[s.jsx("circle",{className:"checkmark__circle",cx:"26",cy:"26",r:"25",fill:"none"}),s.jsx("path",{className:"checkmark__check",fill:"none",d:"M14.1 27.2l7.1 7.2 16.7-16.8"})]})}),s.jsx("h3",{className:"text-center mb-3",children:"Booking Successful"}),s.jsx("p",{className:"text-center mb-2",children:"Your booking was successful"}),s.jsxs("p",{className:"text-center mb-2",children:["Transaction completed with ID: ",s.jsx("strong",{children:e==null?void 0:e.transaction._id})]}),s.jsxs("p",{className:"text-center mb-2",children:["Your account has been charged ",s.jsxs("strong",{children:["₹",e==null?void 0:e.transaction.amount]})," for this booking."]}),s.jsx("p",{className:"text-center mb-5",children:"Thank you for choosing our service. You can now view your booking details in your account."}),s.jsx("strong",{className:"text-center mb-2",children:"View Booking Details"}),s.jsx(x,{className:"btn btn-light login-success-button",to:"/BookedCars",children:"View Bookings"})]})},b=()=>s.jsxs(s.Fragment,{children:[s.jsx(d,{}),s.jsx(g,{}),s.jsx(h,{})]});export{b as default};