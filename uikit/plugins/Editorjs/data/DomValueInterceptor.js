const parseHtml = (html) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, 'text/html');
  return parseNodes(doc.body.childNodes);
}

// Return children array
// Example: Hello there <a href='linkurl'> you </a>
// children: [
//    {
//      type: 'text',
//      value: 'text here',
//    },
//    {
//      type: 'link',
//      url: 'href url',
//      children: [ { type: 'text', value: 'you' } ]
//    }
// ],

// Example: <b> Hello there <a href='linkurl'> you </a> <b>
// children: [
//   { type: 'text', value: 'text here', textWeight: 'bold', children: [ ... ] }
// ]
const parseNode = (node) => {
  let obj = {
    // children: [],
  };

  if (node.nodeType === Node.TEXT_NODE) {
    obj.type = 'text';
    obj.value = node.nodeValue.trim();
  } else if (node.nodeName === 'B') {
    obj.type = 'text-cosmetic';
    obj.textWeight = 'Bold';
    obj.value = 'bold value';
  } else if (node.nodeName === 'I') {
    obj.type = 'text-cosmetic';
    obj.textWeight = 'Italic';
    obj.value = 'italic value';
  } if (node.nodeName === 'A') {
    obj.type = 'link';
    obj.link = node.getAttribute('href');
  } else if (node.nodeName === 'MARK') {
    obj.type = 'marker';
  }

  if (node.childNodes.length > 0) {
    obj.children = parseNodes(node.childNodes);
  }

  return obj;
}

const parseNodes = (childNodes) => {
  let currentLevel = [];

  for (let node of childNodes) {
    currentLevel.push(parseNode(node))
  }

  return currentLevel;
}

const shouldParseHTML = (value) => (
  value.includes('<a') ||
  value.includes('<mark') ||
  value.includes('<b') ||
  value.includes('<i')
)

const deepIterate = (obj, callback) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(obj, key, obj[key]);
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        deepIterate(obj[key], callback);
      }
    }
  }
}

export const DomValueInterceptor = (data) => {
  // deep iterate keys
  // check values if shouldParseHTML
  // parse if any html and convert to type = 'type-nested' if needed
  deepIterate(data, (obj, key, value) => {
    if (value) {
      if (typeof value === 'string' && shouldParseHTML(value)) {
        obj[key] = {
          type: 'nested-block',
          children: parseHtml(value),
        }
      }
    }
  });

  return data;
}
