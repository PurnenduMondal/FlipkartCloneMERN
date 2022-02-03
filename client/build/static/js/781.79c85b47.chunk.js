"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[781,958],{5781:function(e,t,n){n.r(t);var r=n(9439),s=n(1413),c=n(2791),a=n(6030),i=n(6871),l=n(6239),d=n(9958),o=n(184);t.default=function(){var e=(0,a.v9)((function(e){return(0,s.Z)({},e)})).user,t=(0,c.useState)([]),n=(0,r.Z)(t,2),u=n[0],h=n[1],p=(0,i.s0)();return(0,c.useEffect)((function(){e?(0,l.AU)("").then((function(e){return h(e.data)})):p("/")}),[]),(0,o.jsx)("div",{children:(0,o.jsxs)("div",{style:{display:"flex",height:"100vh"},children:[(0,o.jsx)(d.default,{panelName:"Orders"}),(0,o.jsx)("div",{className:"verticalLine",style:{borderLeft:"1px solid #b1b1b1"}}),(0,o.jsx)("div",{className:"p-3",style:{width:"100%"},children:(0,o.jsxs)("table",{className:"table",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{className:"text-center",scope:"col",children:"Order ID"}),(0,o.jsx)("th",{className:"text-center",scope:"col",children:"Name"}),(0,o.jsx)("th",{className:"text-center",scope:"col",children:"selling price"}),(0,o.jsx)("th",{className:"text-center",scope:"col",children:"Quantity"}),(0,o.jsx)("th",{className:"text-center",scope:"col",children:"Status"}),(0,o.jsx)("th",{className:"text-center",scope:"col",children:"Update Status"})]})}),(0,o.jsx)("tbody",{children:u.map((function(e,t){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"text-center",children:e._id}),(0,o.jsx)("td",{className:"text-center",children:e.productName}),(0,o.jsx)("td",{className:"text-center",children:e.sellingPrice}),(0,o.jsx)("td",{className:"text-center",children:e.quantity}),(0,o.jsx)("td",{className:"text-center",children:e.status}),(0,o.jsx)("td",{className:"text-center",children:(0,o.jsx)("form",{children:(0,o.jsxs)("select",{name:"status",value:e.status,onChange:function(t){return function(e,t){(0,l.E7)(t,e.target.value).then((function(e){(0,l.AU)("").then((function(e){return h(e.data)}))}))}(t,e._id)},children:[(0,o.jsx)("option",{children:"Select Status"}),(0,o.jsx)("option",{value:"Order Placed",children:"Order Placed"}),(0,o.jsx)("option",{value:"Dispatched",children:"Dispatched"}),(0,o.jsx)("option",{value:"Delivered",children:"Delivered"}),(0,o.jsx)("option",{value:"Cancelled",children:"Cancelled"})]})})})]},t)}))})]})})]})})}},9958:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var r=n(1413),s=n(2791),c=n(7046),a=n(6030),i=n(3504),l=n(6871),d=n(184);function o(e){var t=e.panelName,n=(0,a.v9)((function(e){return(0,r.Z)({},e)})).user,o=(0,a.I0)(),u=(0,l.s0)();(0,s.useEffect)((function(){n||u("/")}),[n]);return(0,d.jsx)("div",{style:{width:"250px"},children:(0,d.jsxs)("div",{className:"p-3",style:{width:"250px"},children:[(0,d.jsx)("a",{className:"d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none",children:(0,d.jsx)("span",{className:"fs-3",children:"Admin Panel"})}),(0,d.jsx)("hr",{}),(0,d.jsxs)("div",{className:"dropdown",children:[(0,d.jsxs)("a",{className:"d-flex align-items-center link-dark text-decoration-none dropdown-toggle",id:"dropdownUser2","data-bs-toggle":"dropdown","aria-expanded":"false",children:[(0,d.jsx)("img",{src:"https://avatars.githubusercontent.com/u/38310111?v=4",alt:"",width:"32",height:"32",className:"rounded-circle me-2"}),(0,d.jsx)("strong",{children:n?n.first_name:""})]}),(0,d.jsxs)("ul",{className:"dropdown-menu text-small shadow","aria-labelledby":"dropdownUser2",children:[(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"dropdown-item",name:"profileBtn",type:"submit",children:"Profile"})}),(0,d.jsx)("li",{children:(0,d.jsx)("hr",{className:"dropdown-divider"})}),(0,d.jsx)("li",{children:(0,d.jsx)("a",{name:"signOutBtn",onClick:function(){c.I8.signOut(),o({type:"LOGOUT",payload:null})},className:"dropdown-item",children:"Log out"})})]})]}),(0,d.jsx)("hr",{}),(0,d.jsxs)("ul",{className:"nav nav-pills flex-column mb-auto accordion",children:[(0,d.jsx)("li",{children:(0,d.jsx)(i.rU,{to:"/admin/dashboard",className:"Products"==t?"nav-link active":"nav-link link-dark",children:"Products"})}),(0,d.jsx)("li",{children:(0,d.jsx)(i.rU,{to:"/admin/orders",className:"Orders"==t?"nav-link active":"nav-link link-dark",children:"Orders"})})]})]})})}},6239:function(e,t,n){n.d(t,{n7:function(){return l},AU:function(){return d},E7:function(){return o}});var r=n(5861),s=n(7757),c=n.n(s),a=n(4569),i=n.n(a),l=function(){var e=(0,r.Z)(c().mark((function e(t){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i().post("".concat("http://localhost:8000/api","/orders"),t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=(0,r.Z)(c().mark((function e(t){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i().post("".concat("http://localhost:8000/api","/listOrders"),{userId:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=(0,r.Z)(c().mark((function e(t,n){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i().post("".concat("http://localhost:8000/api","/updateOrderStatus"),{orderId:t,status:n});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},1413:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(4942);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=781.79c85b47.chunk.js.map