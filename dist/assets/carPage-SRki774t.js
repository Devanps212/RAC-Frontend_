import{r as o,n as W,j as e,i as k,H as K,I as M,J as Q,K as C,h as L,N as z,P as G,x as X,Q as Y,B as O,R as Z,U as ee}from"./index-5d5XzMmN.js";import{a as te}from"./normalCards-CEAJBAK5.js";import{l as se}from"./userAuthentication-CvNMJzDN.js";const ae=(h,v,a)=>{try{const d=new Set,g=new Set;v.forEach(f=>{const c=new Date(f.date.start).getTime(),l=new Date(f.date.end).getTime();if(h.startDate&&h.endDate){const u=new Date(h.startDate).getTime(),x=new Date(h.endDate).getTime();u<c&&x>l||u>c&&u<l&&x>l||x<l&&x>c&&u<=c||u<=l&&x>=c?g.add(f.carId.toString()):d.add(f.carId.toString())}});const p=[...a.filter(f=>f._id!==void 0&&!g.has(f._id.toString())&&!d.has(f._id.toString()))];return d.forEach(f=>{const c=a.find(l=>l._id!==void 0&&l._id.toString()===f);c&&p.push(c)}),p}catch(d){console.log(d)}},ne=()=>{const[h,v]=o.useState(null),[a,d]=o.useState(null),[g,w]=o.useState(null),[p,f]=o.useState(null),[c,l]=o.useState([]),[u,x]=o.useState([]),[y,E]=o.useState([]),[I,A]=o.useState(new Set),[R,_]=o.useState(""),[F,T]=o.useState(""),N=new Date().toISOString().split("T")[0];o.useState([]);const H=W(),D=new URLSearchParams(H.search).get("bookingData");o.useEffect(()=>{(async()=>{const s=await X("all","user");l(s);const n=new Set;if(s.forEach(i=>{var r;const m=i.seats?(r=i.seats)==null?void 0:r.toString():"",S=parseInt(m);isNaN(S)||n.add(S)}),A(n),D){const i=JSON.parse(D);d(i)}})()},[D]),o.useEffect(()=>{(async()=>{try{const s=await Y("all"),i=s.data.filter(m=>m.status!=="Cancelled");i.length===0?w(null):(console.log("valid bookings : ",i),w(s.data))}catch(s){O.error(s.messsage)}})()},[]),o.useEffect(()=>{(async()=>{try{const s=await Z(),n=c.map(r=>{var j;return(j=r.category)==null?void 0:j._id}).filter(r=>r!==null).map(r=>r),i=s.filter(r=>r._id&&n.includes(r._id)),m=[...y,...i],S=Array.from(new Set(m.map(r=>r==null?void 0:r._id))).map(r=>m.find(j=>(j==null?void 0:j._id)===r)).filter(r=>r!==void 0);E(S)}catch(s){O.error(s.message)}})()},[c]),o.useEffect(()=>{(async()=>{if(a&&g){const s=await ae(a,g,c);s&&(l(s),x(s))}else x(c)})()},[a,g]);const P=async(t,s)=>{const i=(await se(t)).data;v(i),s==="pickup"?(d(m=>({...m,pickupLocation:t})),_(t)):(d(m=>({...m,dropOffLocation:t})),T(t))},U=t=>{f(s=>s===t?null:t)},b=()=>{if(p===null)l(u);else{const t=u.filter(s=>{const n=s.rating;return n?n>=p:!1});l(t)}};o.useEffect(()=>{b()},[p]);const B=(t,s)=>{s==="pickup"?(d(n=>({...n,pickupLocation:t})),_(""),v([])):(d(n=>({...n,dropOffLocation:t})),T(""),v([]))},V=t=>{const s=u.filter(n=>{var i;return!!(n.category&&typeof n.category=="object"&&"_id"in n.category&&((i=n.category._id)==null?void 0:i.toString())===t)});l(s)},$=t=>{const s=u.filter(n=>n.seats===t);l(s)},q=()=>{const t=[...c].sort((s,n)=>(s.rentPricePerDay??0)-(n.rentPricePerDay??0));l(t)},J=()=>{const t=[...c].sort((s,n)=>(n.rentPricePerDay??0)-(s.rentPricePerDay??0));l(t)};return e.jsx("div",{className:"container-fluid full-container",children:e.jsx("div",{className:"contents",children:e.jsxs("div",{className:"row",style:{marginTop:"4rem"},children:[e.jsx("div",{className:"col-4",style:{padding:"12px"},children:e.jsx("div",{className:"left-contents",children:e.jsxs("div",{className:"row d-flex flex-column justify-content-center align-items-center",children:[e.jsxs("div",{className:"col-12",children:[e.jsx("p",{className:"font-text",children:"Sort by Price :"}),e.jsxs("div",{className:"d-flex justify-content-start align-items-start",children:[e.jsxs(k,{onClick:q,style:{height:"36px",width:"10rem"},children:[e.jsx(K,{className:"me-1"})," Low to High"]}),e.jsxs(k,{onClick:J,className:"ms-2",children:["High to Low ",e.jsx(M,{className:"ms-1"})]})]})]}),e.jsxs("div",{className:"col-12 mt-2",children:[e.jsx("p",{className:"font-text",children:"Sort by Rating :"}),e.jsx("div",{className:"d-flex flex-column justify-content-start align-items-start",children:[1,2,3,4,5].map((t,s)=>e.jsxs("div",{className:"d-flex align-items-center mb-2",children:[e.jsx("input",{type:"radio",className:"me-2",checked:p===t,onChange:()=>U(t)}),[...Array(t)].map((n,i)=>e.jsx(Q,{},i))]},s))})]}),e.jsxs("div",{className:"col-12 mt-2",children:[e.jsx("p",{className:"font-text",children:"sort by Category :"}),e.jsx("div",{className:"d-flex justify-content-start align-items-start",children:y&&y!==null&&y.map((t,s)=>e.jsx("div",{children:e.jsx(k,{onClick:()=>V(t._id?t._id:""),value:t._id,variant:"link",children:t.name})},s))})]}),e.jsxs("div",{className:"col-12 mt-2",children:[e.jsx("p",{className:"font-text",children:"Sort by Seats :"}),e.jsx("div",{className:"d-flex justify-content-start align-items-start",children:e.jsx("div",{children:e.jsxs(C,{children:[e.jsx(C.Toggle,{variant:"light",id:"dropdown-basic",children:"Select Seats"}),e.jsx(C.Menu,{children:[...I].map(t=>e.jsxs(C.Item,{onClick:()=>$(t),children:[t," Seater"]},t))})]})})})]})]})})}),e.jsx("div",{className:"col-8",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"rightSide-content",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"right-top-contents d-flex justify-content-center align-items-center",children:[e.jsx("div",{className:"col-2 d-flex justify-content-center",children:e.jsx("input",{type:"date",value:a!=null&&a.startDate?new Date(a.startDate).toISOString().split("T")[0]:N,min:N,onChange:t=>{const s=new Date(t.target.value);d({...a,startDate:s})}})}),e.jsx("div",{className:"col-2 d-flex justify-content-center",children:e.jsx("input",{type:"date",value:a!=null&&a.endDate?new Date(a.endDate).toISOString().split("T")[0]:N,min:N,onChange:t=>{const s=new Date(t.target.value);d({...a,endDate:s})}})}),e.jsx("div",{className:"col-1 d-flex justify-content-center",children:e.jsx("input",{type:"time",value:a==null?void 0:a.pickupTime,onChange:t=>{const s=t.target.value,[n,i]=s.split(":"),m=`${n}:${i||"00"}`;d({...a,pickupTime:m})}})}),e.jsx("div",{className:"col-1 d-flex justify-content-center",children:e.jsx("input",{type:"time",value:a==null?void 0:a.dropOffTime,onChange:t=>{const s=t.target.value,[n,i]=s.split(":"),m=`${n}:${i||"00"}`;d({...a,dropOffTime:m})}})}),e.jsxs("div",{className:"col-3 d-flex justify-content-center position-relative",children:[e.jsx("input",{type:"text",style:{width:"120px"},placeholder:"select Starting",value:a==null?void 0:a.pickupLocation,onChange:t=>P(t.target.value,"pickup")}),R&&e.jsx("ul",{className:"suggestion-list",children:Array.isArray(h)&&h.map((t,s)=>e.jsxs("li",{className:"suggestion-item",onClick:()=>B(t.name,"pickup"),children:[e.jsxs("span",{className:"suggestion-text",children:[t.name,e.jsx("strong",{children:t.name}),e.jsx("br",{}),e.jsx("small",{children:t.place_formatted})]}),e.jsx(L,{className:"suggestion-icon"})]},s))})]}),e.jsxs("div",{className:"col-1 d-flex justify-content-center position-relative",children:[e.jsx("input",{type:"text",style:{width:"120px"},placeholder:"select ending",value:a==null?void 0:a.dropOffLocation,onChange:t=>P(t.target.value,"dropoff")}),F&&e.jsx("ul",{className:"suggestion-list",children:Array.isArray(h)&&h.map((t,s)=>e.jsxs("li",{className:"suggestion-item",onClick:()=>B(t.name,"dropoff"),children:[e.jsxs("span",{className:"suggestion-text",children:[t.name,e.jsx("strong",{children:t.name}),e.jsx("br",{}),e.jsx("small",{children:t.place_formatted})]}),e.jsx(L,{className:"suggestion-icon"})]},s))})]})]})}),e.jsxs("div",{className:"col-12 mt-4",children:[e.jsx("h5",{children:"Cars"}),e.jsx("div",{className:"right-bottom-contents",children:c.length>0?e.jsx(te,{cars:c,bookings:a}):e.jsxs("div",{className:"alert-container d-flex flex-column justify-content-center align-items-center mt-5",children:[e.jsx(z,{className:"exclamation-icon",style:{width:"30%",height:"auto"}}),e.jsx(G,{variant:"warning",className:"alert-message",children:"No cars found. But don't worry, we're still looking!"})]})})]})]})})})]})})})},oe=()=>e.jsxs(e.Fragment,{children:[e.jsx(ee,{}),e.jsx(ne,{})]});export{oe as default};
