import{G as n,c as t,d as a}from"./index-DWxgtZKu.js";import{G as i}from"./userAuthentication-Dk8amuBM.js";const p=async()=>{try{const o=await new n,e=await t(a,o);if(e.user){const{operationType:r}=e;console.log("operationType : ",r),console.log("userSignedIn : ",e.user);const s=(await e.user.getIdTokenResult()).token;return console.log("accessToken : ",s),await i(s)}}catch(o){throw console.log("error in gverify:",o.message),new Error(o.message)}};export{p as G};