var l=(s=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(s,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):s)(function(s){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+s+'" is not supported')});var y=(s,t)=>()=>(t||s((t={exports:{}}).exports,t),t.exports);var h=y((b,r)=>{var p={calcItemTotal:function(s){let t=s.price||0,e=s.quantity||1;return (t*e).toFixed(2)},calcSubTotal:function(s){if(s.length===0)return 0;let t=0;return s.forEach(e=>{t+=Number(this.calcItemTotal(e));}),t.toFixed(2)},calcTax:function(s){if(s.length===0)return 0;let t=0;return s.forEach(e=>{let n=e.price,c=e.quantity,i=e.tax||0;t+=n*c*i/100;}),t.toFixed(2)},calcFinalTotal:function(s){if(s.length===0)return 0;let t=Number(this.calcSubTotal(s)),e=Number(this.calcTax(s));return (t+e).toFixed(2)}};r.exports=p;});var f=l("fs"),d=l("path"),x=l("pdfmake"),a=h(),u=class{payload;company;invoice;customer;items;currency;path;qr;note;date;constructor(t){this.payload=t,this.company=t.company,this.customer=t.customer,this.invoice=t.invoice,this.items=t.items,this.qr=t.qr,this.note=t.note,this.currency=this.invoice.currency||"$",this.path=d.resolve(this.invoice.path)||"./invoice.pdf",this.date=new Date().toLocaleDateString("en-US",{year:"numeric",month:"numeric",day:"numeric"});}async create(){let t=new x(this.fonts()),e={pageSize:"A4",orientation:"portrait",pageMargins:[40,40,40,40],info:this.meta(),content:this.content(),defaultStyle:this.defaultStyle(),styles:this.styles()};return new Promise((n,c)=>{let i=t.createPdfKitDocument(e);i.pipe(f.createWriteStream(this.path)),i.end(),i.on("end",()=>{n(this.path);}),i.on("error",o=>{c(o);});})}fonts(){return {Helvetica:{normal:"Helvetica",bold:"Helvetica-Bold",italics:"Helvetica-Oblique",bolditalics:"Helvetica-BoldOblique"}}}meta(){return {title:"Invoice - #"+this.invoice.number,author:this.company.name,subject:"Invoice - "+this.customer.name,keywords:"invoice"}}defaultStyle(){return {fontSize:10,lineHeight:1.8,bold:!1,font:"Helvetica",color:"#222222",columnGap:30}}styles(){return {h1:{fontSize:18,bold:!0},h2:{fontSize:16,bold:!0},h3:{fontSize:14,bold:!0},text:{fontSize:10,bold:!1},textBold:{fontSize:10,bold:!0}}}content(){let t=[],e={columns:[{width:"70%",stack:[],style:"text"},{width:"30%",stack:[],style:"text"}]};if(this.company.logo){if(!this.company.logo.startsWith("<svg"))throw new Error("Only SVG logo are supported.");e.columns[0].stack.unshift({svg:this.company.logo,margin:[0,0,0,20]}),e.columns[0].stack.push({text:this.company.name,style:"h3"});}else e.columns[0].stack.unshift({text:this.company.name,style:"h1"});this.company.address&&e.columns[0].stack.push({text:this.company.address,style:"text"}),this.company.phone&&e.columns[0].stack.push({text:this.company.phone,style:"text"}),this.company.email&&e.columns[0].stack.push({text:this.company.email,style:"text"}),this.company.website&&e.columns[0].stack.push({text:this.company.website,style:"text"}),this.company.taxId&&e.columns[0].stack.push({text:this.company.taxId,style:"text"}),this.invoice.label?e.columns[1].stack.unshift({text:this.invoice.label,style:"h1"}):e.columns[1].stack.unshift({text:"I N V O I C E",style:"h1"}),e.columns[1].stack.push({text:`Ref no: #${this.invoice.number||1}`,style:"textBold"}),e.columns[1].stack.push({text:`Date: ${this.invoice.date||this.date}`,style:"text"}),e.columns[1].stack.push({text:`Due Date: ${this.invoice.dueDate||this.date}`,style:"text"}),e.columns[1].stack.push({text:`Status: ${this.invoice.status||"Due to pay!"}`,style:"textBold"}),t.push(e);let n={columns:[{width:300,margin:[0,30,0,0],stack:[{text:"Bill To:",style:"h2"}],style:"text"}]};this.customer.name&&n.columns[0].stack.push({text:this.customer.name,style:"textBold"}),this.customer.company&&n.columns[0].stack.push({text:this.customer.company,style:"text"}),this.customer.address&&n.columns[0].stack.push({text:this.customer.address,style:"text"}),this.customer.phone&&n.columns[0].stack.push({text:this.customer.phone,style:"text"}),this.customer.email&&n.columns[0].stack.push({text:this.customer.email,style:"text"}),this.customer.taxId&&n.columns[0].stack.push({text:this.customer.taxId,style:"text"}),t.push(n);let c={margin:[0,30,0,0],lineHeight:1.5,table:{widths:[200,50,"*",50,"*"],headerRows:1,lineHeight:1.5,body:[[`
 Item`,`
 Qty`,`
 Price`,`
 TAX`,`
 Total`]]}};this.items.length>0&&this.items.forEach(o=>{let m=a.calcItemTotal(o);c.table.body.push([`
 ${o.name}`,`
 ${o.quantity}`,`
 ${this.currency}${o.price}`,`
 ${o.tax||0}%`,`
 ${this.currency}${m}`]);}),t.push(c);let i={margin:[0,20,0,0],columns:[{width:"*",stack:[" "],style:"text"},{width:200,lineHeight:1.5,style:"textBold",table:{widths:[80,"*"],headerRows:1,lineHeight:1.5,body:[[`
 Subtotal`,`
 ${this.currency}${a.calcSubTotal(this.items)}`],[`
 Total Tax`,`
 ${this.currency}${a.calcTax(this.items)}`],[`
 Total`,`
 ${this.currency}${a.calcFinalTotal(this.items)}`]]}}]};if(t.push(i),this.payload.qr){let o={margin:[0,50,0,0],qr:this.payload.qr.data,fit:this.payload.qr.width||"50"};t.push(o);}if(this.payload.note){let o={margin:[0,this.payload.qr?20:50,0,0],text:this.payload.note,italics:!0};t.push(o);}return t}};

export { u as PDFInvoice };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=invoice.mjs.map