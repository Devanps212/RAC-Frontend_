import{a as g,r as m,j as e,aQ as u,f as a,i as x,B as o,b2 as p,b1 as y}from"./index-CSNcg-Tf.js";const h=()=>{const i=g(),[r,n]=m.useState({name:"",description:""}),l=s=>{s.preventDefault();const{name:c,description:d}=r;c.trim()==""?o.error("Enter a valid category"):p(c,d).then(t=>{console.log(t),t.status==="success"?(o.success(t.message),n({name:"",description:""}),i("/admin/manageCategory")):(console.log("else :",t.message),o.error(t.message||"Unexpected error occured"))}).catch(t=>{console.log(t),o.error(t.message)})};return e.jsxs(u,{className:"container-body",children:[e.jsx("h2",{className:"mt-3",children:"Add Category"}),e.jsxs(a,{onSubmit:l,children:[e.jsxs(a.Group,{controlId:"categoryName",children:[e.jsx(a.Label,{children:"Category Name"}),e.jsx(a.Control,{type:"text",placeholder:"Enter category name",value:r.name,required:!0,onChange:s=>n({...r,name:s.target.value}),className:"input-text"})]}),e.jsxs(a.Group,{controlId:"categoryDescription",children:[e.jsx(a.Label,{children:"Description"}),e.jsx(a.Control,{as:"textarea",rows:3,placeholder:"write a description about the category",value:r.description,onChange:s=>n({...r,description:s.target.value}),className:"input-text"})]}),e.jsx(x,{variant:"primary",type:"submit",children:"Add Category"})]})]})},C=()=>e.jsx(y,{children:e.jsx(h,{})});export{C as default};