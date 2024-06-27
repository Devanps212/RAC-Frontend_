import{r as e,j as s,bf as W,bg as _,bh as $,bi as L,bj as Q,bk as R,bl as q,bm as H,Q as J,B as K,b1 as V}from"./index-D2IJCEmf.js";const X=()=>{const[N,v]=e.useState({labels:[],datasets:[]}),[Y,y]=e.useState({labels:[],datasets:[]}),[C,D]=e.useState([]),[B,p]=e.useState([]),[S,k]=e.useState(0),[A,w]=e.useState(0),[T,M]=e.useState(0),[E,F]=e.useState(0);return e.useEffect(()=>{const O=async()=>{const a=await q();if(Array.isArray(a)){const n=a.length;k(n)}},I=async()=>{const a=await H();M(a.length)},P=async()=>{try{const n=(await J("all")).data;console.log("bokings found :",n);const o={},r={},c={};let h=0,x=0;const u=[],b=[];Array.isArray(n)&&n.forEach((t,z)=>{var j,f,g;const i=t.status;o[i]?o[i]++:o[i]=1;const d=((j=t.transaction)==null?void 0:j.amount)??0,l=(f=t.transaction)==null?void 0:f.transactionId;l&&(r[l]?r[l]+=d:r[l]=d);const m=new Date(t.date.start).toISOString().split("T")[0];c[m]?c[m]++:c[m]=1;const U=new Date(t.date.start).getMonth(),G=new Date().getMonth();U===G&&(h++,x+=d),u.push({id:t._id,start:new Date(t.date.start).getTime(),end:new Date(t.date.end).getTime(),name:`Booking ${t._id}`,y:z}),b.push(((g=t.carId)==null?void 0:g.name)??`Booking ${t._id}`)}),w(h),F(x),v({labels:Object.keys(o),datasets:[{label:"Number of Bookings by Status",data:Object.values(o),backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderWidth:1},{label:"Total Booking Amounts",data:Object.values(r),backgroundColor:"rgba(255,99,132,0.4)",borderColor:"rgba(255,99,132,1)",borderWidth:1}]}),y({labels:Object.keys(c),datasets:[{label:"Number of Bookings by Date",data:Object.values(c),backgroundColor:"rgba(153,102,255,0.4)",borderColor:"rgba(153,102,255,1)",borderWidth:1}]}),D(u),p(b)}catch(a){K.error(a.message)}};O(),I(),P()},[]),s.jsx("div",{className:"container-fluid",children:s.jsxs("div",{className:"row",children:[s.jsx("h3",{children:"Dashboard"}),s.jsxs("div",{className:"contents d-flex flex-column justify-content-center align-items-center",children:[s.jsx("div",{className:"col-md-6",style:{width:"inherit"},children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-blue",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx(W,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Total Customers"}),s.jsxs("h5",{className:"mt-2",children:[S," Nos"]})]})})}),s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-yellow",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx(_,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Bookings (This Month)"}),s.jsxs("h5",{className:"mt-2",children:[A," Nos"]})]})})}),s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-red",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx($,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Earnings (This Month)"}),s.jsxs("h5",{className:"mt-2",children:["₹ ",E]})]})})}),s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-green",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx(L,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Total Partners"}),s.jsxs("h5",{className:"mt-2",children:[T," Nos"]})]})})})]})}),s.jsx("div",{className:"col-12 mt-4",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 col-xl-6 chart-container",children:s.jsx("div",{className:"chart",children:s.jsx(Q,{data:N})})}),s.jsx("div",{className:"col-12 col-xl-6 chart-container",children:s.jsx("div",{className:"chart",children:s.jsx(R,{tasks:C,categories:B})})})]})})]})]})})},ss=()=>s.jsx(s.Fragment,{children:s.jsx(V,{children:s.jsx(X,{})})});export{ss as default};