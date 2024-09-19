import{r as e,v as _,B as u,j as s,bh as R,bi as $,bj as L,bk as Y,bl as q,bm as H,bn as J,bo as K,Y as Q,b4 as V}from"./index-B0Ih1owG.js";const X=()=>{const[p,C]=e.useState({labels:[],datasets:[]}),[Z,k]=e.useState({labels:[],datasets:[]}),[B,D]=e.useState([]),[w,A]=e.useState([]),[S,T]=e.useState(0),[E,M]=e.useState(0),[F,O]=e.useState(0),[I,P]=e.useState(0);return e.useEffect(()=>{const o=async()=>{const n=await J();if(Array.isArray(n)){const c=n.length;T(c)}},a=async()=>{const n=await K();O(n.length)},z=async()=>{try{const c=(await Q("all")).data;console.log("bokings found :",c);const r={},i={},l={};let b=0,j=0;const g=[],f=[];Array.isArray(c)&&c.forEach((t,U)=>{var N,v,y;const m=t.status;r[m]?r[m]++:r[m]=1;const h=((N=t.transaction)==null?void 0:N.amount)??0,d=(v=t.transaction)==null?void 0:v.transactionId;d&&(i[d]?i[d]+=h:i[d]=h);const x=new Date(t.date.start).toISOString().split("T")[0];l[x]?l[x]++:l[x]=1;const G=new Date(t.date.start).getMonth(),W=new Date().getMonth();G===W&&(b++,j+=h),g.push({id:t._id,start:new Date(t.date.start).getTime(),end:new Date(t.date.end).getTime(),name:`Booking ${t._id}`,y:U}),f.push(((y=t.carId)==null?void 0:y.name)??`Booking ${t._id}`)}),M(b),P(j),C({labels:Object.keys(r),datasets:[{label:"Number of Bookings by Status",data:Object.values(r),backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderWidth:1},{label:"Total Booking Amounts",data:Object.values(i),backgroundColor:"rgba(255,99,132,0.4)",borderColor:"rgba(255,99,132,1)",borderWidth:1}]}),k({labels:Object.keys(l),datasets:[{label:"Number of Bookings by Date",data:Object.values(l),backgroundColor:"rgba(153,102,255,0.4)",borderColor:"rgba(153,102,255,1)",borderWidth:1}]}),D(g),A(f)}catch(n){u.error(n.message)}};o(),a(),z()},[]),e.useEffect(()=>{const o=_("https://easyrentacar.shop");return o.on("newBookingAdmin",({message:a})=>{console.log("message got : ",a),u.info(a)}),o.on("adminReport",({message:a})=>{console.log("report success : ",a),u.warning(a)}),()=>{o.disconnect()}},[]),s.jsx("div",{className:"container-fluid",children:s.jsxs("div",{className:"row",children:[s.jsx("h3",{children:"Dashboard"}),s.jsxs("div",{className:"contents d-flex flex-column justify-content-center align-items-center",children:[s.jsx("div",{className:"col-md-6",style:{width:"inherit"},children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-blue",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx(R,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Total Customers"}),s.jsxs("h5",{className:"mt-2",children:[S," Nos"]})]})})}),s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-yellow",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx($,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Bookings (This Month)"}),s.jsxs("h5",{className:"mt-2",children:[E," Nos"]})]})})}),s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-red",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx(L,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Earnings (This Month)"}),s.jsxs("h5",{className:"mt-2",children:["₹ ",I]})]})})}),s.jsx("div",{className:"col-12 col-md-3 mb-3",children:s.jsx("div",{className:"box-contents box-contents-green",children:s.jsxs("div",{className:"box-one d-flex flex-column justify-content-center align-items-center",children:[s.jsx(Y,{className:"mt-2",style:{fontSize:"50px"}}),s.jsx("strong",{className:"mt-2",children:"Total Partners"}),s.jsxs("h5",{className:"mt-2",children:[F," Nos"]})]})})})]})}),s.jsx("div",{className:"col-12 mt-4",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 col-xl-6 chart-container",children:s.jsx("div",{className:"chart",children:s.jsx(q,{data:p})})}),s.jsx("div",{className:"col-12 col-xl-6 chart-container",children:s.jsx("div",{className:"chart",children:s.jsx(H,{tasks:B,categories:w})})})]})})]})]})})},ts=()=>s.jsx(s.Fragment,{children:s.jsx(V,{children:s.jsx(X,{})})});export{ts as default};