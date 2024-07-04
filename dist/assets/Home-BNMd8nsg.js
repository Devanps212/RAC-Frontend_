import{j as e,F as z,f as B,g as M,h as U,i as $,k as te,m as ae,r as a,t as ne,e as ie,a as oe,n as ce,M as S,A as re,B as P,U as le}from"./index-BtpaeQCF.js";import{C as E,a as de}from"./normalCards-DlqjaxEC.js";import{l as H}from"./userAuthentication-e-o53GMI.js";import{b as ue}from"./bookingValidator-iQ4gynFT.js";import{F as me}from"./footer-D-SQvejV.js";import"./index.esm-BqmvHgBW.js";const pe=({search:r,PickupPlaces:l,click:d,value:c,DropOffValue:p,DropOffPlaces:h,handleTime:C,pickupTime:x,dropOffTime:k,handleDate:m,pickUpDate:j,dropOffDate:u,handleFormSubmission:D})=>{const f=new Date().toISOString().split("T")[0],w=(s,o)=>{r(s.target.value,o)},b=(s,o)=>{C(s.target.value,o)},O=(s,o)=>{m(new Date(s.target.value),o)},T=()=>{D(c,p,j,u,x,k)};return e.jsx(E,{className:"Banner with-shadow position-relative",interval:3e3,controls:!1,indicators:!1,children:e.jsxs(E.Item,{className:"inset-shadow",children:[e.jsx("div",{className:"text-overlay",children:e.jsxs("div",{className:"banner-text",children:[e.jsx("h1",{children:"Don't Dream Just Drive"}),e.jsx("p",{children:"Find the perfect vehicle for your journey with our convenient booking system."})]})}),e.jsx("img",{className:"bannerImg with-shadow",src:"/assets/admin/banner/242725.jpg",alt:"banner"}),e.jsxs("div",{className:"selection-T position-absolute translate-middle-y",children:[e.jsx("div",{children:e.jsx("p",{className:"mb-4",style:{fontWeight:"bold"},children:"Select Location and Time"})}),e.jsxs("div",{className:"row d-flex flex-column justify-content-center align-items-center",children:[e.jsx("div",{className:"col-9",children:e.jsxs("div",{className:"input-group mb-2",children:[e.jsx(z,{controlId:"floatingInput",label:"Pickup location",className:"mb-3",children:e.jsx(B.Control,{type:"text",className:"input-location",placeholder:"Pickup location",onChange:s=>w(s,"pickup"),value:c})}),e.jsx("span",{className:"input-group-text",children:e.jsx(M,{})}),e.jsx("ul",{className:"suggestion-list",style:{zIndex:"3"},children:c!==""&&Array.isArray(l)&&l.map((s,o)=>e.jsxs("li",{className:"suggestion-item",children:[e.jsxs("span",{className:"suggestion-text",onClick:()=>d(s,"pickup"),children:[e.jsx("strong",{children:s.name}),e.jsx("br",{}),e.jsx("small",{children:s.place_formatted})]}),e.jsx(U,{className:"suggestion-icon"})]},o))})]})}),e.jsx("div",{className:"col-9",children:e.jsxs("div",{className:"input-group mb-3",children:[e.jsx(z,{controlId:"floatingInputDropOff",label:"Drop-Off Location",className:"mb-3",children:e.jsx(B.Control,{type:"text",className:"input-location form-control",placeholder:"Drop-Off location",onChange:s=>w(s,"DropOff"),value:p})}),e.jsx("span",{className:"input-group-text",children:e.jsx(M,{})}),e.jsx("ul",{className:"suggestion-list",style:{zIndex:"3"},children:p!==""&&Array.isArray(h)&&h.map((s,o)=>e.jsxs("li",{className:"suggestion-item",children:[e.jsxs("span",{className:"suggestion-text",onClick:()=>d(s,"DropOff"),children:[e.jsx("strong",{children:s.name}),e.jsx("br",{}),e.jsx("small",{children:s.place_formatted})]}),e.jsx(U,{className:"suggestion-icon"})]},o))})]})})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"contents-data d-flex justify-content-center align-items-center mb-3",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select Pickup Date :"}),e.jsx("input",{type:"date",value:j?j.toISOString().split("T")[0]:"",className:"form-control-input",min:f,onChange:s=>O(s,"pickup")})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select DropOff Date :"}),e.jsx("input",{type:"date",value:u?u.toISOString().split("T")[0]:"",className:"form-control-input",min:f,onChange:s=>O(s,"DropOff")})]})]})}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select Pickup Time :"}),e.jsx("div",{className:"timePickerContainer d-flex justify-content-center",children:e.jsx("input",{type:"time",value:x,onChange:s=>b(s,"pickup"),className:"form-control-input"})})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("p",{children:"Select DropOff Time :"}),e.jsx("div",{className:"timePickerContainer d-flex justify-content-center",children:e.jsx("input",{type:"time",value:k,onChange:s=>b(s,"dropOff"),className:"form-control-input"})})]})]}),e.jsx("div",{style:{zIndex:"500"},className:"d-flex justify-content-center align-items-center m-3",children:e.jsx($,{onClick:T,children:"Submit"})})]})]})})},he=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{className:"head mt-5",style:{fontFamily:"Orbitron",fontSize:"34px"},children:"Customer Talks"}),e.jsxs("div",{className:"row d-flex justify-content-center align-items-center mt-5",children:[e.jsxs("div",{className:"customer col-12 col-md-5",children:[e.jsx(te,{style:{fontSize:"70px"}}),e.jsx("br",{}),e.jsx("strong",{className:"heading",children:"Name"}),e.jsx("p",{className:"paragraph",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]}),e.jsxs("div",{className:"customer col-12 col-md-5 ms-3",children:[e.jsx(ae,{style:{fontSize:"70px"}}),e.jsx("br",{}),e.jsx("strong",{className:"heading",children:"Name"}),e.jsx("p",{className:"paragraph",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]})]})}),xe=()=>{const[r,l]=a.useState([]);return a.useEffect(()=>{(async()=>{const c=await ne();l(c)})()},[]),e.jsxs("div",{className:"container main-class",children:[e.jsx("h5",{style:{fontFamily:"Orbitron",fontSize:"34px"},children:"Top Cars"}),e.jsx("div",{className:"horizontal-scroll-wrapper mt-4",children:e.jsx("div",{className:"horizontal-scroll-container",children:r.length>0?r.map((d,c)=>e.jsx("div",{className:"card-wrapper",children:e.jsx(de,{cars:[d],bookings:null})},c)):e.jsx("p",{children:"No cars available"})})})]})};function je(){a.useState({}),a.useState();const[r,l]=a.useState(null),[d,c]=a.useState([]),[p,h]=a.useState([]),[C,x]=a.useState(""),[k,m]=a.useState(""),[j,u]=a.useState(!1),[D,f]=a.useState(""),[w,b]=a.useState({}),[O,T]=a.useState({}),[s,o]=a.useState(""),[F,L]=a.useState(""),[R,y]=a.useState(""),[J,V]=a.useState(""),[W,_]=a.useState(new Date),[G,K]=a.useState(new Date),Q=ie(t=>t.token.token),I=oe(),X=async(t,n)=>{try{if(n==="pickup"){x(t);const i=await H(t);c(i.data)}else{f(t);const i=await H(t);h(i.data)}}catch(i){i.message!=="Cannot read properties of undefined (reading 'message')"&&P.error(i.message)}},Y=(t,n)=>{n==="pickup"?(x(t.name),b(t),c([])):(f(t.name),T(t),h([]))},Z=(t,n)=>{if(n==="pickup"){const i=t,[g,N]=i.split(":"),v=`${g}:${N||"00"}`;o(v)}else{const i=t,[g,N]=i.split(":"),v=`${g}:${N||"00"}`;V(v)}},ee=(t,n)=>{n==="pickup"?_(t):K(t)};a.useEffect(()=>{const t=ce("https://easyrentacar.shop");t.on("carCreation",n=>{m(n.message),y(n.picture),u(!0)}),t.on("offerUpdate",n=>{m(n.message),y(n.carImage),L(n.car)})},[]);const se=async(t,n,i,g,N,v)=>{if(!Q)return P.warning("Please login for renting a car");const q={pickupLocation:t,dropOffLocation:n,startDate:i,endDate:g,pickupTime:N,dropOffTime:v},A=await ue(q);A!==null?P.error(Object.values(A).join(", ")):(l(q),console.log(r))};return a.useEffect(()=>{if(r){const t=encodeURIComponent(JSON.stringify(r));I(`/Allcars?bookingData=${t}`),l(null)}},[r,I]),e.jsxs("div",{className:"home",children:[e.jsx(pe,{search:X,PickupPlaces:d,DropOffPlaces:p,click:Y,value:C,DropOffValue:D,handleTime:Z,pickupTime:s,dropOffTime:J,handleDate:ee,pickUpDate:W,dropOffDate:G,handleFormSubmission:se}),e.jsx("div",{className:"d-flex justify-content-center align-items-center",children:e.jsx(xe,{})}),e.jsx("div",{className:"customerFavour",children:e.jsx(he,{})}),e.jsx(me,{}),e.jsxs(S,{show:j,onHide:()=>{u(!1),y(""),m(""),L("")},centered:!0,children:[e.jsx(S.Header,{closeButton:!0,children:e.jsx(S.Title,{children:F?"Offer Update":"New Car Added!"})}),e.jsxs(S.Body,{children:[F&&e.jsx("h4",{children:F}),e.jsx(re,{variant:"success",children:e.jsx("p",{children:k})}),e.jsx("img",{src:R,alt:"Car Thumbnail",style:{maxWidth:"100%",height:"auto"}})]}),e.jsx(S.Footer,{children:e.jsx($,{variant:"secondary",onClick:()=>{u(!1),y(""),m(""),L("")},children:"Close"})})]})]})}function be(){return e.jsxs(e.Fragment,{children:[e.jsx(le,{}),e.jsx(je,{})]})}export{be as default};
