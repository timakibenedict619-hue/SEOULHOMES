// app.js - DATA LAYER for Seoul Homes Replica
// Long scroll data - 25+ listings to make page very long

const properties = [
  {
    type:"Officetel", badge:"Just listed", images:["https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=800","https://images.unsplash.com/photo-1493809842364-78817add58d1?q=80&w=800"], 
    rent:"1,400,000 won/mo", deposit:"1,400,000 won", title:"5th Floor, Duplex, Quick Move-in, Low Deposit, 5 Minutes to Sinnonhyeon Station", beds:"Open Studio", baths:"1 Bath", floor:"", date:"Today", realtor:"James Realty", verified:true, lang:"KO · EN · JA", saleType:"Rent", extra:"sun"
  },
  {
    type:"Officetel", badge:"Just listed", images:["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800"],
    rent:"1,800,000 won/mo", deposit:"1,800,000 won", title:"Available from Aug 24, Loft, Fully Furnished, Low Deposit, Near Gangnam Station", beds:"Open Studio", baths:"1 Bath", date:"Today", realtor:"James Realty", saleType:"Rent"
  },
  {
    type:"Apartment", badge:"Just listed", images:["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800"],
    rent:"6,900,000 won/mo", deposit:"6,900,000 won", title:"Small deposit and all furnished house in Seoul", beds:"2 BR", baths:"1 Bath", floor:"11F", date:"Today", realtor:"Mindset Real Estate Agency", saleType:"Rent", count:"1/10"
  },
  {
    type:"Apartment", badge:"Just listed", images:["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800"],
    rent:"3,500,000 won/mo", deposit:"3,500,000 won", title:"Small deposit and all furnished house in Seoul - Gangnam Luxury", beds:"3 BR", baths:"1 Bath", floor:"6F", date:"Today", realtor:"Mindset Real Estate Agency", saleType:"Rent", count:"2/10"
  },
  {
    type:"Villa / Row House", badge:"Just listed", images:["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800"],
    rent:"2,300,000 won/mo", deposit:"2,300,000 won", title:"Small deposit and all furnished villa in Hannam-dong", beds:"2 BR", baths:"1 Bath", floor:"3F", date:"Today", realtor:"Mindset Real Estate Agency", saleType:"Rent", count:"2/8"
  },
  {
    type:"Villa / Row House", badge:"Just listed", images:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"],
    rent:"1,200,000 won/mo", deposit:"1,200,000 won", title:"Small deposit and all furnished house in Seoul - Hongdae", beds:"Open Studio", baths:"1 Bath", date:"Today", realtor:"Mindset Real Estate Agency", saleType:"Rent", count:"1/5"
  },
  {
    type:"Officetel", badge:"Just listed", images:["https://images.unsplash.com/photo-1493809842364-78817add58d1?q=80&w=800"],
    rent:"1,550,000 won/mo", deposit:"2,500,000 won", title:"Small deposit and all furnished house in Seoul - Mapo", beds:"Open Studio", baths:"1 Bath", date:"Today", realtor:"Mindset Real Estate Agency", saleType:"Rent", count:"1/7"
  },
  {
    type:"Officetel", badge:"Just listed", images:["https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=800"],
    rent:"1,600,000 won/mo", deposit:"2,000,000 won", title:"Small deposit and all furnished house in Seoul - Yeoksam", beds:"Open Studio", baths:"1 Bath", date:"Today", realtor:"Mindset Real Estate Agency", saleType:"Rent", count:"2/4"
  },
  {
    type:"Officetel", badge:"Just listed", images:["https://images.unsplash.com/photo-1560184611-ff3e53f00e8f?q=80&w=800"],
    rent:"1,800,000 won/mo", deposit:"2,500,000 won", title:"Small deposit and all furnished house in Seoul - Separated Studio", beds:"Separated Studio", baths:"1 B", date:"Today", realtor:"Mindset Real Estate Agency", saleType:"Rent", count:"1/4"
  },
  {
    type:"Apartment", badge:"Just listed", extra:"Sun-drenched", images:["https://images.unsplash.com/photo-1600573472550-8090b5e0745b?q=80&w=800"],
    rent:"5,500,000 won/mo", deposit:"100,000,000 won", title:"3BR, 2BA, Like New, Community, Walkable Distance to Subway - Jamsil", beds:"3 BR", baths:"2 Baths", date:"Updated today", realtor:"James Realty", saleType:"Rent", count:"2/13"
  },
  {
    type:"Building", badge:"Just listed", images:["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"],
    rent:"3,000,000,000 won", deposit:"", title:"High-Yield Samsung Hub Asset: 100K Worker Base & Zero Vacancy", beds:"5 BR", baths:"5 Baths", date:"Updated today", realtor:"Joy Son (손지영)", saleType:"Sale", pricePer:"₩4,205,156/m²"
  },
  {
    type:"Building", badge:"Just listed", images:["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800"],
    rent:"8,200,000,000 won", deposit:"", title:"Starbucks DT Building and Commercial Property Near Anseong", beds:"Building", date:"Today", realtor:"Joy Son (손지영)", saleType:"Sale", dir:"East"
  },
  {
    type:"Building", badge:"Just listed", images:["https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800"],
    rent:"6,000,000,000 won", deposit:"", title:"In front of Byeongjeom District Office, Golf Indoor Building, an area with high foot traffic", beds:"Building", date:"Today", realtor:"Joy Son (손지영)", saleType:"Sale", count:"2/3"
  },
  {
    type:"Building", badge:"Just listed", extra:"Sun-drenched", images:["https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=800"],
    rent:"4,000,000,000 won", deposit:"", title:"Prime Commercial Property Opposite Samsung Corporate Shuttle Stop", beds:"Building", dir:"South · Byeongjeom", date:"Today", realtor:"Joy Son (손지영)", saleType:"Sale"
  },
  {
    type:"Building", badge:"Just listed", images:["https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?q=80&w=800"],
    rent:"5,500,000,000 won", deposit:"", title:"Brand-New Prime Commercial Building - Less than a Minute's Walk from Subway", beds:"Building", dir:"East", date:"Today", realtor:"Joy Son (손지영)", saleType:"Sale"
  },
  // MY OWN EXTRA FOR LONG SCROLL
  {
    type:"Officetel", badge:"Just listed", images:["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800"],
    rent:"2,100,000 won/mo", deposit:"5,000,000 won", title:"Luxury High Floor Officetel with Han River View in Yeouido - Pet Friendly", beds:"1 BR", baths:"1 Bath", floor:"22F", date:"Today", realtor:"Seoul Nest Realty", saleType:"Rent"
  },
  {
    type:"Apartment", badge:"Just listed", images:["https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800"],
    rent:"8,000,000 won/mo", deposit:"20,000,000 won", title:"Penthouse in Seongsu-dong with Rooftop Terrace, Fully Furnished", beds:"3 BR", baths:"2 Baths", floor:"15F", date:"Today", realtor:"Premium Seoul Homes", saleType:"Rent"
  },
  {
    type:"Officetel (Office Use)", badge:"New build", images:["https://images.unsplash.com/photo-1497366811353-26cc3f8fa9fa?q=80&w=800"],
    rent:"8,000,000 won/mo", deposit:"8,000,000 won", title:"Luxury 2-Bedroom Penthouse with 2 Bathrooms for Short-Term Rent near COEX", beds:"2 BR", baths:"2 Bath", date:"Updated 1w ago", realtor:"강남삼성프라임부동산중개", saleType:"Rent", pricePer:"MAINTENANCE 300,000 won/mo"
  },
  {
    type:"Officetel (Office Use)", badge:"New build", images:["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800"],
    rent:"2,450,000,000 won", deposit:"", title:"3-Room Han River View Forest View High-End Officetel with Full Options, Seongsu", beds:"3 BR", baths:"2 Bath", date:"Updated 1w ago", realtor:"SUNNY PARK", saleType:"Sale", pricePer:"₩29,166,667/m²"
  },
  {
    type:"Villa / Row House", badge:"Just listed", images:["https://images.unsplash.com/photo-1605276374104-dee2a5ed3cd6?q=80&w=800"],
    rent:"1,100,000 won/mo", deposit:"6,000,000 won", title:"Cozy Renovated Villa in Itaewon, Walking Distance to Noksapyeong", beds:"1 BR", baths:"1 Bath", floor:"2F", date:"Yesterday", realtor:"Itaewon Global Realty", saleType:"Rent"
  }
];

const commercialProperties = properties.filter(p=>p.type.includes("Building") || p.type.includes("Office Use")).slice(0,8);
const residentialProperties = properties.filter(p=>!commercialProperties.includes(p));
