import fs from 'fs'
import path from 'path'
import { build } from 'esbuild'

export async function buildDirectory (directoryPath, outputDirectory) {
  try {
    const files = await getFilesRecursively(directoryPath)
    const buildPromises = files.map(async (filePath) => {
      const relativePath = path.relative(directoryPath, filePath)
      const outputFile = path.join(outputDirectory, relativePath)

      // Ensure output subdirectories exist
      const outputDir = path.dirname(outputFile)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      await buildFromFile(filePath, outputFile)
    })
    await Promise.all(buildPromises)
  } catch (error) {
    console.error('Error building directory:', error)
    throw error
  }
}

async function buildFromFile (inputFilePath, outputFilePath) {
  try {
    const fileContents = fs.readFileSync(inputFilePath, 'utf8')
    await build({
      stdin: {
        contents: fileContents,
        sourcefile: inputFilePath,
        loader: 'js',
        resolveDir: path.dirname(inputFilePath)
      },
      minify: false,
      outfile: outputFilePath,
      target: 'node16',
      platform: 'node',
      format: 'cjs',
      bundle: true,
      mainFields: ['module', 'main'],
      external: ['esbuild'],
      define: {
        global: 'globalThis'
      },
      banner: {
        js: 'if(!globalThis.location)globalThis.location={pathname:"/",search:"",hash:"",href:"",origin:"",protocol:"",host:"",hostname:"",port:"",assign:function(){},replace:function(){},reload:function(){}};if(!globalThis.addEventListener)globalThis.addEventListener=function(){};if(!globalThis.removeEventListener)globalThis.removeEventListener=function(){};if(!globalThis.scrollTo)globalThis.scrollTo=function(){};if(!globalThis.scrollY)globalThis.scrollY=0;if(!globalThis.innerHeight)globalThis.innerHeight=0;if(!globalThis.innerWidth)globalThis.innerWidth=0;if(!globalThis.getComputedStyle)globalThis.getComputedStyle=function(){return{}};if(!globalThis.requestAnimationFrame)globalThis.requestAnimationFrame=function(cb){return setTimeout(cb,0)};if(!globalThis.cancelAnimationFrame)globalThis.cancelAnimationFrame=function(id){clearTimeout(id)};if(!globalThis.IntersectionObserver)globalThis.IntersectionObserver=function(){this.observe=function(){};this.unobserve=function(){};this.disconnect=function(){}};if(!globalThis.MutationObserver)globalThis.MutationObserver=function(){this.observe=function(){};this.disconnect=function(){}};if(!globalThis.matchMedia)globalThis.matchMedia=function(){return{matches:false,addListener:function(){},removeListener:function(){}}};var window = globalThis; var navigator = globalThis.navigator || {}; var document = globalThis.document || (function(){var noop=function(){return stub};var rules=[];var fakeSheet={cssRules:rules,insertRule:function(r,i){rules.splice(i||0,0,{cssText:r})},deleteRule:noop,get length(){return rules.length}};var stub={style:{},textContent:"",innerHTML:"",nodeName:"",nodeType:1,parentNode:null,namespaceURI:"",sheet:fakeSheet,styleSheets:[],appendChild:noop,removeChild:noop,insertBefore:noop,replaceChild:noop,cloneNode:function(){return Object.create(stub)},setAttribute:noop,removeAttribute:noop,getAttribute:function(){return ""},hasAttribute:function(){return false},closest:function(){return null},querySelector:function(){return null},querySelectorAll:function(){return []},getElementsByTagName:function(){return []},classList:{add:noop,remove:noop,contains:function(){return false},toggle:noop},children:[],childNodes:[],firstChild:null,lastChild:null,nextSibling:null,previousSibling:null,createElement:function(){var el=Object.create(stub);el.sheet={cssRules:[],insertRule:function(r,i){el.sheet.cssRules.splice(i||0,0,{cssText:r})},deleteRule:noop};return el},createTextNode:function(){return Object.create(stub)},createDocumentFragment:function(){return Object.create(stub)},createElementNS:function(){return Object.create(stub)},addEventListener:noop,removeEventListener:noop,dispatchEvent:noop,getBoundingClientRect:function(){return{top:0,left:0,right:0,bottom:0,width:0,height:0}},getComputedStyle:function(){return{}},head:null,body:null};stub.head=Object.create(stub);stub.body=Object.create(stub);return stub}());'
      }
    })
  } catch (error) {
    console.error('Error building file:', error)
    throw error
  }
}

async function getFilesRecursively (directoryPath) {
  const files = []
  async function traverseDirectory (currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === 'dist' || entry.name === 'node_modules') continue

      const fullPath = path.join(currentPath, entry.name)
      if (entry.isDirectory()) {
        await traverseDirectory(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        files.push(fullPath)
      }
    }
  }
  await traverseDirectory(directoryPath)
  return files
}
