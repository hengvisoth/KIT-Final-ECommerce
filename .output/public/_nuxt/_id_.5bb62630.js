import{_ as ta}from"./nuxt-link.3617e960.js";import{n as sa,j as oa,r as m,k as la,l as na,a as o,y as da,o as i,c as N,w as t,b as e,d as a,t as c,u as l,g as y,h as F,F as T,z as P,B as ia,i as C,q as ca,e as _,x as B,v as D}from"./entry.f12bc80e.js";import{u as L}from"./fetch.eff98003.js";import{u as ra}from"./state.93432498.js";import{C as ua,N as ma,P as _a,S as pa}from"./carousel.es.a0d9fa34.js";const ha={class:"d-flex"},fa=a("span",null,"Home",-1),va=a("span",{class:"ms-3"},"Shop",-1),ga=a("span",{class:"font-weight-bold ms-5"},"|",-1),ya={class:"ms-5"},wa={class:"d-flex justify-content-center"},xa=a("p",{style:{color:"#e5345b"},"data-aos":"fade-right","data-aos-delay":"500"}," Sneaker Company ",-1),ba={class:"font-weight-bold","data-aos":"fade-right","data-aos-delay":"500"},ka={class:"d-flex","data-aos":"fade-right","data-aos-delay":"500"},Ca={class:"text-center"},Va=a("span",{class:"ms-3 font-weight-bold",style:{"line-height":"30px"}},"|",-1),Sa=a("span",{class:"ms-3 mt-1",style:{color:"grey"}},"5 Customer Review",-1),Aa={style:{color:"grey"},class:"mt-7","data-aos":"fade-up","data-aos-delay":"500"},Na={class:"mt-3","data-aos":"fade-up","data-aos-delay":"500"},Fa={class:"d-flex align-center justify-space-between mt-5"},Ta={class:"mt-16",style:{"border-top":"black 1px solid"}},Ra=a("div",{class:"d-flex mt-5",style:{color:"grey"},"data-aos":"fade-up","data-aos-delay":"500"},[a("span",null,"SKU"),a("span",{class:"ms-16"},":"),a("span",{class:"ms-3"},"SS001")],-1),Ua=a("div",{class:"d-flex mt-5",style:{color:"grey"},"data-aos":"fade-up","data-aos-delay":"500"},[a("span",null,"Category"),a("span",{class:"ms-5"},":"),a("span",{class:"ms-3"},"Nike")],-1),Ea=a("div",{class:"d-flex mt-5",style:{color:"grey"},"data-aos":"fade-up","data-aos-delay":"500"},[a("span",null,"Tags"),a("span",{class:"ms-14"},":"),a("span",{class:"ms-3"},"Running, Gym")],-1),za={class:"d-flex mt-5",style:{color:"grey"},"data-aos":"fade-up","data-aos-delay":"500"},Pa=a("span",null,"Share",-1),Ba=a("span",{class:"ms-12"},":",-1),Da={class:"ms-3"},La=a("h1",{class:"text-center","data-aos":"fade-right","data-aos-delay":"500"}," Similar Product ",-1),$a=a("p",{class:"text-center","data-aos":"fade-up","data-aos-delay":"500"}," Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",-1),ja=a("p",{class:"text-uppercase","data-aos":"fade-right","data-aos-delay":"500"}," WRITE A CUSTOMER REVIEW ",-1),Ia=a("h3",{class:"mt-3","data-aos":"fade-right","data-aos-delay":"500"}," We love to hear from you ",-1),Ma={style:{height:"400px","overflow-y":"auto"}},Oa=a("img",{src:"https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto20230102um142358--edited-1672668816767.jpg?v=1672668819",alt:"avatar",style:{width:"100%",height:"100%"}},null,-1),Wa={class:"ms-5"},qa={class:"mt-2 text-grey"},Ha={class:"d-flex justify-center"},Ka=a("h3",{class:"mt-5","data-aos":"fade-right","data-aos-delay":"500"}," 100% AUTHENTIC ",-1),Za=a("p",{class:"mt-3","data-aos":"fade-up","data-aos-delay":"500"}," All items are verified by our teams and are guaranteed 100% authentic or your money back. ",-1),Ga={class:"d-flex justify-center"},Xa=a("h3",{class:"mt-5","data-aos":"fade-right","data-aos-delay":"500"}," SECURE CHECKOUT ",-1),Ja=a("p",{class:"mt-3","data-aos":"fade-up","data-aos-delay":"500"}," Our payment gateway is optimized to ensure a secure shopping experience for our customers. ",-1),oe={__name:"[id]",async setup(Qa){let w,R;const $=sa(),j=oa(),I=ra(),p=m(!1),U=j.params.id,{data:d}=([w,R]=la(()=>L(`http://13.212.165.16:3002/api/products/${U}`,"$korT56tLwZ")),w=await w,R(),w);na(()=>d.value.rating),console.log(d.value);const M=m([{id:1,name:"Nike Air Force 1 Low Supreme",image:"/images/Nike1.webp",price:200,rating:4},{id:2,name:"Nike Air Max Plus Black Volt Solar Red (W)",image:"/images/Nike2.webp",price:200,rating:5},{id:3,name:"Nike Air Zoom Pegasus 37",image:"/images/Nike3.webp",price:200,rating:3},{id:4,name:"Nike Dunk Low UCLA",image:"/images/Nike4.webp",price:200,rating:4}]),h=m(null),O=m([1,2,3,4,5]),f=m(""),W=async()=>{if(D.get("token")==null)alert("Please login to review"),B("/login");else{const{data:n}=await L(`http://13.212.165.16:3002/api/products/${U}/review`,{method:"POST",body:{rating:h.value,comment:f.value},headers:{Authorization:`Bearer ${D.get("token")}`}},"$XI3oguT8RV");p.value=!0,h.value=null,f.value="",console.log(n.value)}},x=m(1),q=()=>{I.value.isAuthenticated==!1?(B("/login"),alert("Please login to add to cart")):$.commit("handleAddToCart",{product:d.value,quantity:x.value})};return(v,n)=>{const E=ta,u=o("v-icon"),g=o("v-img"),r=o("v-col"),V=o("v-rating"),S=o("v-btn"),b=o("v-row"),A=o("v-container"),z=o("v-card-subtitle"),H=o("v-card-title"),K=o("v-card-actions"),k=o("v-card"),Z=o("v-select"),G=o("v-textarea"),X=o("v-form"),J=o("v-avatar"),Q=o("v-snackbar"),Y=o("v-main"),aa=da("scroll-y");return i(),N(Y,null,{default:t(()=>[e(A,null,{default:t(()=>[a("div",ha,[e(E,{to:"/",style:{"text-decoration":"none",color:"black"}},{default:t(()=>[fa]),_:1}),e(u,{icon:"mdi-greater-than",class:"ms-3"}),e(E,{to:"/shop",style:{"text-decoration":"none",color:"black"}},{default:t(()=>[va]),_:1}),ga,a("span",ya,c(l(d).name),1)]),e(b,{class:"mt-15"},{default:t(()=>[e(r,{cols:"12",md:"6"},{default:t(()=>[a("div",wa,[e(g,{src:l(d).image[0],height:"400px",width:"400px","data-aos":"zoom-in-up","data-aos-delay":"250"},null,8,["src"])]),e(l(ua),{"items-to-show":3.7},{addons:t(()=>[e(l(ma)),e(l(_a))]),default:t(()=>[(i(!0),y(T,null,F(l(d).image,s=>(i(),N(l(pa),{key:s},{default:t(()=>[a("div",null,[e(g,{src:s,height:"150px",width:"150px"},null,8,["src"])])]),_:2},1024))),128))]),_:1},8,["items-to-show"])]),_:1}),e(r,{cols:"12",md:"6"},{default:t(()=>[xa,a("h1",ba,c(l(d).name),1),a("div",ka,[a("div",Ca,[e(V,{modelValue:v.rating,"onUpdate:modelValue":n[0]||(n[0]=s=>v.rating=s),size:"30px","bg-color":"#FFCA28",color:"#FFCA28"},null,8,["modelValue"])]),Va,Sa]),a("p",Aa,c(l(d).description),1),a("h2",Na," $"+c(l(d).price)+".00 ",1),a("div",Fa,[a("div",null,[P(a("input",{"onUpdate:modelValue":n[1]||(n[1]=s=>C(x)?x.value=s:null),type:"number",class:"px-2",min:"1",style:{border:"1px solid black",width:"70px"},"data-aos":"fade-up","data-aos-delay":"500"},null,512),[[ia,l(x)]])]),e(S,{color:"#e5345b",class:"text-white mt-4","data-aos":"fade-up","data-aos-delay":"500"},{default:t(()=>[e(u,{icon:"mdi-cart",class:"ms-3"}),a("span",{class:"ms-4",onClick:q},"Add To Cart")]),_:1})]),a("div",Ta,[Ra,Ua,Ea,a("div",za,[Pa,Ba,a("div",Da,[e(u,{icon:"mdi-facebook"}),e(u,{icon:"mdi-twitter",class:"ms-3"}),e(u,{icon:"mdi-instagram",class:"ms-3"}),e(u,{icon:"mdi-linkedin",class:"ms-3"})])])])]),_:1})]),_:1})]),_:1}),e(k,{width:"100%",color:"#f5f5f7",class:"pa-5 mt-16",flat:""},{default:t(()=>[e(A,null,{default:t(()=>[La,$a,e(b,{class:"mt-15"},{default:t(()=>[(i(!0),y(T,null,F(l(M),s=>(i(),N(r,{cols:"12",md:"3",key:s,"data-aos":"zoom-in-up","data-aos-delay":"250"},{default:t(()=>[e(k,{class:"mx-auto","max-width":"344"},{default:t(()=>[e(g,{src:s.image,height:"200px",width:"100%",cover:""},null,8,["src"]),e(z,{class:"mt-4"},{default:t(()=>[_(" Nike ")]),_:1}),e(H,{class:"font-weight-bold"},{default:t(()=>[_(c(s.name),1)]),_:2},1024),e(z,null,{default:t(()=>[_(" New Design 2023 ")]),_:1}),e(K,null,{default:t(()=>[e(V,{modelValue:v.rating,"onUpdate:modelValue":n[2]||(n[2]=ea=>v.rating=ea),size:"30px","bg-color":"#FFCA28",color:"#FFCA28"},null,8,["modelValue"])]),_:1})]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),e(A,null,{default:t(()=>[e(k,{variant:"outlined",width:"100%",class:"pa-5"},{default:t(()=>[e(b,{class:"mt-5"},{default:t(()=>[e(r,{cols:"12",md:"6"},{default:t(()=>[ja,Ia,e(X,{class:"mt-6",onSubmit:ca(W,["prevent"])},{default:t(()=>[e(Z,{modelValue:l(h),"onUpdate:modelValue":n[3]||(n[3]=s=>C(h)?h.value=s:null),label:"Rate this product",variant:"outlined",items:l(O)},null,8,["modelValue","items"]),e(G,{modelValue:l(f),"onUpdate:modelValue":n[4]||(n[4]=s=>C(f)?f.value=s:null),label:"Message",variant:"outlined",dense:"",placeholder:"Enter your message",style:{height:"250px"}},null,8,["modelValue"]),e(S,{color:"#e5345b",type:"submit",class:"mt-5 text-white px-15","data-aos":"fade-up","data-aos-delay":"500"},{default:t(()=>[_("Send")]),_:1})]),_:1},8,["onSubmit"])]),_:1}),e(r,{cols:"12",md:"6",class:"ps-10"},{default:t(()=>[P((i(),y("div",Ma,[(i(!0),y(T,null,F(l(d).reviews,s=>(i(),y("div",{class:"d-flex mt-5",key:s},[e(J,{size:"x-large"},{default:t(()=>[Oa]),_:1}),a("div",Wa,[a("h3",null,c(s.name),1),e(V,{length:"5","model-value":s.rating,size:"20px","bg-color":"#FFCA28",color:"#FFCA28"},null,8,["model-value"]),a("p",null,c(s.comment),1),a("p",qa,c(new Date().toLocaleDateString()),1)])]))),128))])),[[aa]])]),_:1})]),_:1})]),_:1}),e(k,{width:"100%",class:"mt-15",flat:""},{default:t(()=>[e(b,{class:"text-center"},{default:t(()=>[e(r,{cols:"12",md:"6"},{default:t(()=>[a("div",Ha,[e(g,{width:"100px",height:"100px",src:"https://www.cambokicks.com/Icons/money.svg","data-aos":"fade-up","data-aos-delay":"500"})]),Ka,Za]),_:1}),e(r,{cols:"12",md:"6"},{default:t(()=>[a("div",Ga,[e(g,{width:"100px",height:"100px",src:"https://www.cambokicks.com/Icons/shield.svg","data-aos":"fade-up","data-aos-delay":"500"})]),Xa,Ja]),_:1})]),_:1})]),_:1})]),_:1}),e(Q,{modelValue:l(p),"onUpdate:modelValue":n[6]||(n[6]=s=>C(p)?p.value=s:null),color:"green",bottom:"",right:""},{actions:t(()=>[e(S,{color:"white",onClick:n[5]||(n[5]=s=>p.value=!1)},{default:t(()=>[_(" Close ")]),_:1})]),default:t(()=>[_(" Comment added 💬 ")]),_:1},8,["modelValue"])]),_:1})}}};export{oe as default};
