import{u as b,e as y,a as S,r as t,j as s,L as v,aZ as L,a_ as N,a$ as u,B as h,b0 as k}from"./index-DsKD_D4l.js";import{a as A}from"./adminAuthentication-DwGvlSbX.js";const D=()=>{const r=localStorage.getItem("admintoken");console.log(r);const i=b(),c=y(e=>e.adminAuth.isLoggedIn),p=S(),[x,d]=t.useState(!1);t.useEffect(()=>{(async()=>{if(r)try{await i(u()),c&&(console.log("Admin is not logged out"),window.location.href="/admin/Dashboard")}catch(o){console.error("Error checking admin login status:",o)}})()},[r,i,c,p]);const[l,w]=t.useState(!1),[a,m]=t.useState({email:"",password:""}),j=()=>{w(!l)},f=async e=>{try{e.preventDefault();const{email:o,password:g}=a;if(console.log(g,o),o==""||g.trim()=="")h.warning("please fill the form");else{d(!0);const n=await A(a);console.log("admin Response : ",n),n.status=="success"&&(console.log(n.message),console.log(n.token),i(k(n.token)),i(u()),h.success(n.message),d(!1),window.location.href="/admin/Dashboard")}}catch(o){console.log("errors ocurred :",o)}};return s.jsxs("div",{className:"box bg-img",style:{width:"100%"},children:[x&&s.jsx(v,{}),s.jsxs("div",{className:"content",children:[s.jsxs("h2",{children:["Sign",s.jsx("span",{children:" In"})]}),s.jsxs("form",{onSubmit:f,children:[s.jsxs("div",{className:"forms",children:[s.jsxs("div",{className:"user-input",children:[s.jsx("input",{type:"email",className:"login-input",placeholder:"admin email",id:"name",value:a.email,onChange:e=>m({...a,email:e.target.value}),required:!0}),s.jsx("span",{role:"img","aria-label":"user-icon",children:"👤"})]}),s.jsxs("div",{className:"pass-input",children:[s.jsx("input",{type:l?"text":"password",className:"login-input",placeholder:"password",id:"my-password",value:a.password,onChange:e=>m({...a,password:e.target.value}),required:!0}),s.jsx("span",{className:"eye",onClick:j,children:l?s.jsx("span",{role:"img",className:"ms-2","aria-label":"hide-password",children:s.jsx(L,{})}):s.jsx("span",{role:"img",className:"ms-2","aria-label":"show-password",children:s.jsx(N,{})})})]})]}),s.jsx("button",{type:"submit",className:"login-btn",children:"Sign In"}),s.jsx("br",{})]})]})]})},R=()=>s.jsx(D,{});export{R as default};