'use strict'

export function getBannerCode () {
  return [
    'if(!globalThis.location)globalThis.location={pathname:"/",search:"",hash:"",href:"http://localhost/",origin:"http://localhost",protocol:"http:",host:"localhost",hostname:"localhost",port:"",assign:function(){},replace:function(){},reload:function(){}};',
    'if(!globalThis.addEventListener)globalThis.addEventListener=function(){};',
    'if(!globalThis.removeEventListener)globalThis.removeEventListener=function(){};',
    'if(!globalThis.scrollTo)globalThis.scrollTo=function(){};',
    'if(!globalThis.scrollY)globalThis.scrollY=0;',
    'if(!globalThis.innerHeight)globalThis.innerHeight=0;',
    'if(!globalThis.innerWidth)globalThis.innerWidth=0;',
    'if(!globalThis.getComputedStyle)globalThis.getComputedStyle=function(){return{}};',
    'if(!globalThis.requestAnimationFrame)globalThis.requestAnimationFrame=function(cb){return setTimeout(cb,0)};',
    'if(!globalThis.cancelAnimationFrame)globalThis.cancelAnimationFrame=function(id){clearTimeout(id)};',
    'if(!globalThis.onpopstate)globalThis.onpopstate=null;',
    'if(!globalThis.history)globalThis.history={pushState:function(){},replaceState:function(){},back:function(){},forward:function(){},go:function(){}};',
    'if(!globalThis.IntersectionObserver)globalThis.IntersectionObserver=function(){this.observe=function(){};this.unobserve=function(){};this.disconnect=function(){}};',
    'if(!globalThis.MutationObserver)globalThis.MutationObserver=function(){this.observe=function(){};this.disconnect=function(){}};',
    'if(!globalThis.matchMedia)globalThis.matchMedia=function(){return{matches:false,addListener:function(){},removeListener:function(){}}};',
    'if(!globalThis.URL)globalThis.URL=function(u){try{var p=new(require("url").URL)(u);Object.assign(this,p)}catch(e){this.pathname="/";this.search="";this.hash="";this.origin="http://localhost";this.href=u}};',
    'if(!globalThis.module)globalThis.module={exports:{}};',
    'if(!globalThis.exports)globalThis.exports=globalThis.module.exports;',
    'if(!globalThis.require)globalThis.require=function(){return{}};',
    'var window=globalThis;',
    'var navigator=globalThis.navigator||{};',
    'if(!globalThis.document)globalThis.document=(' + domStubIIFE() + ');',
    'var document=globalThis.document;'
  ].join('')
}

function domStubIIFE () {
  return `function(){
var noop=function(){return stub};
var stub={style:{},textContent:"",innerHTML:"",nodeName:"",nodeType:1,parentNode:null,namespaceURI:"",
sheet:{cssRules:[],insertRule:function(r,i){this.cssRules.splice(i||0,0,{cssText:r})},deleteRule:noop},
styleSheets:[],
appendChild:noop,removeChild:noop,insertBefore:noop,replaceChild:noop,prepend:noop,append:noop,
cloneNode:function(){return Object.create(stub)},
setAttribute:noop,removeAttribute:noop,
getAttribute:function(){return ""},hasAttribute:function(){return false},
closest:function(){return null},querySelector:function(){return null},
querySelectorAll:function(){return []},getElementsByTagName:function(){return []},
classList:{add:noop,remove:noop,contains:function(){return false},toggle:noop},
children:[],childNodes:[],firstChild:null,lastChild:null,nextSibling:null,previousSibling:null,parentElement:null,
createElement:function(){var el=Object.create(stub);el.sheet={cssRules:[],insertRule:function(r,i){el.sheet.cssRules.splice(i||0,0,{cssText:r})},deleteRule:noop};return el},
createTextNode:function(){return Object.create(stub)},
createDocumentFragment:function(){return Object.create(stub)},
createElementNS:function(){return Object.create(stub)},
addEventListener:noop,removeEventListener:noop,dispatchEvent:noop,
getBoundingClientRect:function(){return{top:0,left:0,right:0,bottom:0,width:0,height:0}},
getComputedStyle:function(){return{}},
head:null,body:null,documentElement:null,scrollTo:noop};
stub.head=Object.create(stub);stub.body=Object.create(stub);stub.documentElement=Object.create(stub);stub.documentElement.scrollTo=noop;stub.parentElement=Object.create(stub);
return stub}()`
}
