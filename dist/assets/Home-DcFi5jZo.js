import{j as e,F as T,f as P,g as q,h as z,i as V,k as W,m as G,r as t,t as K,e as Q,a as X,B as w,U as Y}from"./index-D9WIxGsI.js";import{C as I,a as Z}from"./normalCards-dZydJDXM.js";import{l as B}from"./userAuthentication-BPhmuVcc.js";import{b as ee}from"./bookingValidator-Dh9T9f88.js";import{F as se}from"./footer-S5S46TTq.js";import"./index.esm-DZ5xLy_O.js";const ae=({search:o,PickupPlaces:r,click:c,value:l,DropOffValue:d,DropOffPlaces:u,handleTime:C,pickupTime:p,dropOffTime:f,handleDate:v,pickUpDate:N,dropOffDate:g,handleFormSubmission:D})=>{const k=new Date().toISOString().split("T")[0],y=(s,i)=>{o(s.target.value,i)},b=(s,i)=>{C(s.target.value,i)},S=(s,i)=>{v(new Date(s.target.value),i)},L=()=>{D(l,d,N,g,p,f)};return e.jsx(I,{className:"Banner with-shadow position-relative",interval:3e3,controls:!1,indicators:!1,children:e.jsxs(I.Item,{className:"inset-shadow",children:[e.jsx("div",{className:"text-overlay",children:e.jsxs("div",{className:"banner-text",children:[e.jsx("h1",{children:"Don't Dream Just Drive"}),e.jsx("p",{children:"Find the perfect vehicle for your journey with our convenient booking system."})]})}),e.jsx("img",{className:"bannerImg with-shadow",src:"/assets/admin/banner/242725.jpg",alt:"banner"}),e.jsxs("div",{className:"selection-T position-absolute translate-middle-y",children:[e.jsx("div",{children:e.jsx("p",{className:"mb-4",style:{fontWeight:"bold"},children:"Select Location and Time"})}),e.jsxs("div",{className:"row d-flex flex-column justify-content-center align-items-center",children:[e.jsx("div",{className:"col-9",children:e.jsxs("div",{className:"input-group mb-2",children:[e.jsx(T,{controlId:"floatingInput",label:"Pickup location",className:"mb-3",children:e.jsx(P.Control,{type:"text",className:"input-location",placeholder:"Pickup location",onChange:s=>y(s,"pickup"),value:l})}),e.jsx("span",{className:"input-group-text",children:e.jsx(q,{})}),e.jsx("ul",{className:"suggestion-list",style:{zIndex:"3"},children:l!==""&&Array.isArray(r)&&r.map((s,i)=>e.jsxs("li",{className:"suggestion-item",children:[e.jsxs("span",{className:"suggestion-text",onClick:()=>c(s,"pickup"),children:[e.jsx("strong",{children:s.name}),e.jsx("br",{}),e.jsx("small",{children:s.place_formatted})]}),e.jsx(z,{className:"suggestion-icon"})]},i))})]})}),e.jsx("div",{className:"col-9",children:e.jsxs("div",{className:"input-group mb-3",children:[e.jsx(T,{controlId:"floatingInputDropOff",label:"Drop-Off Location",className:"mb-3",children:e.jsx(P.Control,{type:"text",className:"input-location form-control",placeholder:"Drop-Off location",onChange:s=>y(s,"DropOff"),value:d})}),e.jsx("span",{className:"input-group-text",children:e.jsx(q,{})}),e.jsx("ul",{className:"suggestion-list",style:{zIndex:"3"},children:d!==""&&Array.isArray(u)&&u.map((s,i)=>e.jsxs("li",{className:"suggestion-item",children:[e.jsxs("span",{className:"suggestion-text",onClick:()=>c(s,"DropOff"),children:[e.jsx("strong",{children:s.name}),e.jsx("br",{}),e.jsx("small",{children:s.place_formatted})]}),e.jsx(z,{className:"suggestion-icon"})]},i))})]})})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"contents-data d-flex justify-content-center align-items-center mb-3",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select Pickup Date :"}),e.jsx("input",{type:"date",value:N?N.toISOString().split("T")[0]:"",className:"form-control-input",min:k,onChange:s=>S(s,"pickup")})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select DropOff Date :"}),e.jsx("input",{type:"date",value:g?g.toISOString().split("T")[0]:"",className:"form-control-input",min:k,onChange:s=>S(s,"DropOff")})]})]})}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select Pickup Time :"}),e.jsx("div",{className:"timePickerContainer d-flex justify-content-center",children:e.jsx("input",{type:"time",value:p,onChange:s=>b(s,"pickup"),className:"form-control-input"})})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select DropOff Time :"}),e.jsx("div",{className:"timePickerContainer d-flex justify-content-center",children:e.jsx("input",{type:"time",value:f,onChange:s=>b(s,"dropOff"),className:"form-control-input"})})]})]}),e.jsx("div",{style:{zIndex:"500"},className:"d-flex justify-content-center align-items-center m-3",children:e.jsx(V,{onClick:L,children:"Submit"})})]})]})})},te=()=>{const o=[{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870221/carLogo/Logo-bmw-vector-transparent-PNG_q5l0zn.png",alt:"BMW Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870227/carLogo/pngwing.com_10_t2tdsy.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870225/carLogo/pngwing.com_8_ux3fbi.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870224/carLogo/pngwing.com_2_aiuy8g.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870223/carLogo/pngwing.com_3_giezfq.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870223/carLogo/pngwing.com_11_vxzcmb.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870222/carLogo/pngwing.com_5_jhvsxd.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870222/carLogo/pngwing.com_4_m6rcei.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870220/carLogo/pngwing.com_12_vlwni5.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870219/carLogo/pngwing.com_9_txbnhi.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870220/carLogo/pngwing.com_6_ttaqxc.png",alt:"Car Logo"},{src:"https://res.cloudinary.com/dlkrxem40/image/upload/v1716870218/carLogo/pngwing.com_7_khpl5m.png",alt:"Car Logo"}];return e.jsx("div",{className:"container container-lists",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h1",{className:"text-center",style:{fontFamily:"Orbitron",fontSize:"34px"},children:"Partner Cars"}),e.jsx("div",{className:"logo-list mt-5",children:e.jsx("ul",{children:o.map((r,c)=>e.jsx("li",{className:c<7?"row-1":"row-2",children:e.jsx("img",{src:r.src,className:"list-images",alt:r.alt})},c))})})]})})})},ne=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{className:"head mt-5",style:{fontFamily:"Orbitron",fontSize:"34px"},children:"Customer Talks"}),e.jsxs("div",{className:"row d-flex justify-content-center align-items-center mt-5",children:[e.jsxs("div",{className:"customer col-12 col-md-5",children:[e.jsx(W,{style:{fontSize:"70px"}}),e.jsx("br",{}),e.jsx("strong",{className:"heading",children:"Name"}),e.jsx("p",{className:"paragraph",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]}),e.jsxs("div",{className:"customer col-12 col-md-5 ms-3",children:[e.jsx(G,{style:{fontSize:"70px"}}),e.jsx("br",{}),e.jsx("strong",{className:"heading",children:"Name"}),e.jsx("p",{className:"paragraph",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]})]})}),oe=()=>{const[o,r]=t.useState([]);return t.useEffect(()=>{(async()=>{const l=await K();r(l)})()},[]),e.jsxs("div",{className:"container main-class",children:[e.jsx("h5",{style:{fontFamily:"Orbitron",fontSize:"34px"},children:"Top Cars"}),e.jsx("div",{className:"horizontal-scroll-wrapper mt-4",children:e.jsx("div",{className:"horizontal-scroll-container",children:o.length>0?o.map((c,l)=>e.jsx("div",{className:"card-wrapper",children:e.jsx(Z,{cars:[c],bookings:null})},l)):e.jsx("p",{children:"No cars available"})})})]})};function ie(){t.useState({}),t.useState();const[o,r]=t.useState(null),[c,l]=t.useState([]),[d,u]=t.useState([]),[C,p]=t.useState(""),[f,v]=t.useState(""),[N,g]=t.useState({}),[D,k]=t.useState({}),[y,b]=t.useState(""),[S,L]=t.useState(""),[s,i]=t.useState(new Date),[A,E]=t.useState(new Date),U=Q(a=>a.token.token),_=X(),$=async(a,m)=>{try{if(m==="pickup"){p(a);const n=await B(a);l(n.data)}else{v(a);const n=await B(a);u(n.data)}}catch(n){n.message!=="Cannot read properties of undefined (reading 'message')"&&w.error(n.message)}},M=(a,m)=>{m==="pickup"?(p(a.name),g(a),l([])):(v(a.name),k(a),u([]))},R=(a,m)=>{if(m==="pickup"){const n=a,[x,h]=n.split(":"),j=`${x}:${h||"00"}`;b(j)}else{const n=a,[x,h]=n.split(":"),j=`${x}:${h||"00"}`;L(j)}},H=(a,m)=>{m==="pickup"?i(a):E(a)},J=async(a,m,n,x,h,j)=>{if(!U)return w.warning("Please login for renting a car");const O={pickupLocation:a,dropOffLocation:m,startDate:n,endDate:x,pickupTime:h,dropOffTime:j},F=await ee(O);F!==null?w.error(Object.values(F).join(", ")):(r(O),console.log(o))};return t.useEffect(()=>{if(o){const a=encodeURIComponent(JSON.stringify(o));_(`/Allcars?bookingData=${a}`),r(null)}},[o,_]),e.jsxs("div",{className:"home",children:[e.jsx(ae,{search:$,PickupPlaces:c,DropOffPlaces:d,click:M,value:C,DropOffValue:f,handleTime:R,pickupTime:y,dropOffTime:S,handleDate:H,pickUpDate:s,dropOffDate:A,handleFormSubmission:J}),e.jsx("div",{className:"d-flex justify-content-center align-items-center",children:e.jsx(oe,{})}),e.jsx("div",{className:"customerFavour",children:e.jsx(ne,{})}),e.jsx(te,{}),e.jsx(se,{})]})}function pe(){return e.jsxs(e.Fragment,{children:[e.jsx(Y,{}),e.jsx(ie,{})]})}export{pe as default};