import{r as t,aa as M,e as k,aj as P,aE as U,aF as j,j as e,aG as E,aH as C,aI as T,w as R,x as A,B as F,aJ as H,U as O}from"./index-CQpAvUt_.js";const B=()=>{const[u,g]=t.useState([]),[d,h]=t.useState(""),[G,p]=t.useState(null),[i,v]=t.useState(null),[a,S]=t.useState(null),f=t.useRef(null),[c,N]=t.useState(null),{userId:m,partnerId:r,carId:x}=M(),[y,J]=t.useState(!1),w=k(s=>s.token.token)??"",l=P(w).payload,[V,I]=t.useState(null);t.useEffect(()=>{(async()=>{try{const[n,o,b]=await Promise.all([T(r),R(m),A(x,"user")]);v(n),p(o.data),S(b)}catch(n){F.error(n.message)}})()},[m,r,x]),t.useEffect(()=>{console.log("car details : ",a)},[a]),t.useEffect(()=>{const s=U("http://localhost:5000/");return N(s),()=>{s.disconnect()}},[]),t.useEffect(()=>{c&&(c.emit("addUser",l),c.on("getUsers",s=>{I(s)}),c.on("getMessage",async s=>{const n={...s,createdAt:new Date().toISOString()},o=await j(r,l,"partner");g([...o,n])}))},[c,r,l]),t.useEffect(()=>{(async()=>{const n=await j(r,l,"partner");g(n)})()},[r,l]),t.useEffect(()=>{var s;(s=f.current)==null||s.scrollIntoView({behavior:"smooth"})},[u]);const D=async s=>{if(s.preventDefault(),!d)return;c==null||c.emit("sendMessage",{senderId:l,receiverId:r,message:d});const n=await H(r,m,d);h(""),g(o=>[...o,n])};return e.jsx("div",{className:"container-fluid content-container",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-12 col-md-5 left-col",children:e.jsxs("div",{className:"car-item mt-3 d-flex flex-column align-items-center",children:[e.jsx("div",{className:"image-container d-flex justify-content-center align-items-center",children:e.jsx("img",{src:a==null?void 0:a.thumbnailImg,style:{width:"50%",height:"auto"},alt:a==null?void 0:a.name})}),e.jsx("strong",{className:"car-name mt-3",children:a==null?void 0:a.name}),e.jsxs("div",{className:"price-details text-center mt-3",children:[e.jsx("h4",{children:"Price per Day"}),e.jsxs("h5",{children:["Price: ",a==null?void 0:a.rentPricePerDay]})]})]})}),e.jsx("div",{className:"col-7 right-col",children:e.jsxs("div",{className:"chat-box me-3",children:[e.jsx("div",{className:"d-flex justify-content-center align-items-center bg-dark text-light py-3 mb-1",style:{height:"12px"},children:e.jsx("h4",{className:"ms-5 mb-0",children:`Connected to: ${(i==null?void 0:i.name)||"Unknown"}`})}),e.jsx("div",{className:"message-list",children:u.map((s,n)=>e.jsx("div",{ref:n===u.length-1?f:null,children:e.jsx(E,{message:s,own:s.senderId===m,profileImage:(i==null?void 0:i.profilePic)||"",loading:y})},n))}),e.jsxs("form",{className:"message-input",onSubmit:D,children:[e.jsx("input",{type:"text",className:"form-control",value:d,onChange:s=>h(s.target.value)}),e.jsx("button",{type:"submit",className:"btn btn-primary",children:e.jsx(C,{})})]})]})})]})})},$=()=>e.jsxs(e.Fragment,{children:[e.jsx(O,{}),e.jsx(B,{})]});export{$ as default};
