import{aQ as r,aR as t,B as s,bg as n}from"./index-B0Ih1owG.js";const c=async a=>{console.log("formData recieved : ",a);try{const o={url:r.adminLogin,method:"post",data:a},e=await t(o);return console.log(e.data.response),e.data}catch(o){throw console.log("error :",o.response.data),s.error(o.response.data.message),new Error(o.message)}},m=async a=>{try{n();const o={url:`${r.findOneAdmin}?adminId=${a}`,method:"get"};return(await t(o)).data.data}catch(o){throw new Error(o.message)}},p=async a=>{try{n();let o={};a instanceof FormData&&(o={"Content-Type":"multipart/form-data"});const e={url:r.adminUpdate,method:"patch",data:a,headers:o};return(await t(e)).data.data}catch(o){throw console.log(o),new Error(o)}};export{c as a,m as f,p as u};