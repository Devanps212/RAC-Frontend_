import{r as n,aa as i,j as e,f as t,i as m,b9 as d,ba as g,B as y,b1 as h}from"./index-CQpAvUt_.js";const u=()=>{const[o,s]=n.useState({_id:"",name:"",description:""}),{categoryId:c}=i();console.log(c),n.useEffect(()=>{(async()=>{try{const a=await d(void 0,c);console.log("category data :",a.categoryExist),s(a.categoryExist)}catch(a){console.error("Error fetching category data:",a)}})()},[c]);const l=r=>{r.preventDefault(),console.log("data: ",o),g(o).then(a=>{console.log("response taken: ",a.message),y.success(a.message)}).catch(a=>{console.log(a)})};return e.jsx("div",{children:e.jsxs(t,{className:"edit-category-form",onSubmit:l,children:[e.jsx("h3",{className:"mb-5",children:"Edit Category"}),e.jsxs(t.Group,{controlId:"formCategoryName",children:[e.jsx(t.Label,{className:"form-label",children:"Category Name"}),e.jsx(t.Control,{type:"text",placeholder:"Enter category name",name:"name",value:o.name,className:"form-control",onChange:r=>s({...o,name:r.target.value})})]}),e.jsxs(t.Group,{controlId:"formCategoryDescription",children:[e.jsx(t.Label,{className:"form-label",children:"Category Description"}),e.jsx(t.Control,{as:"textarea",rows:3,placeholder:"Enter category description",name:"description",value:o.description,className:"form-control",onChange:r=>s({...o,description:r.target.value})})]}),e.jsx(m,{variant:"primary",type:"submit",className:"btn-save",children:"Save Changes"})]})})},p=()=>e.jsx(h,{children:e.jsx(u,{})});export{p as default};
