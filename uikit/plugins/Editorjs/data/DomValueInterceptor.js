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
    obj.value = decodeHTMLSpaces(node.nodeValue.trim());
  } else if (node.nodeName === 'B') {
    obj.type = 'text-cosmetic';
    obj.textWeight = 'bold';
    obj.value = 'bold value';
  } else if (node.nodeName === 'I') {
    obj.type = 'text-cosmetic';
    obj.textStyle = 'italic';
    obj.value = 'italic value';
  } if (node.nodeName === 'A') {
    obj.type = 'hyperlink';
    obj.url = node.getAttribute('href');
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

const decodeHTMLSpaces = (string) => {
  return string.replace(/&nbsp;/g, '\u00A0');
}

const mutateItemsAccordingToRules = (data, mutatedItems) => {
  const rules = {
    'change-list-structure': {
      conditional: (item) => (item.type === 'list'),
      action: (item) => {
        const itemInTopData = data[item.arrayIndex];
        itemInTopData.type = 'list-nested-dom-values';

        itemInTopData.data.items = itemInTopData.data.items.map((item, i) => {
          if (typeof item === "string") {
            return { type: 'text', value: item }
          }

          return item;
        });

      },
    }, // Rename to 'DomValuesList', objectize
    'change-mutated-paragraph-structure': {
      conditional: (item) => (item.type === 'paragraph'),
      action: (item) => {
        data[item.arrayIndex].type = 'paragraph-nested-dom-values';
      },
    }, // Rename to DomValuesParagraph , objectize text
  };

  mutatedItems.forEach((item, pIndex) => {
    Object.keys(rules).forEach((ruleKey) => {
      const rule = rules[ruleKey];
      if (rule['conditional'](item)) {
        rule['action'](item);
      }
    })
  });
};

const normalizeArray = () => {
  // TODO
  // Objectize array according to DomValues rules
};

const shouldParseHTML = (value) => (
  value.includes('<a') ||
  value.includes('<mark') ||
  value.includes('<b') ||
  value.includes('<i') ||
  value.includes('&nbsp;')
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

const deepMetaIterate = (data, callback) => {
  for (let arrayIndex = 0; arrayIndex < data.length; arrayIndex++) {
    const item = data[arrayIndex];
    deepIterate(
      item,
      (obj, key, value) => {
        callback({ arrayIndex, ...item }, obj, key, value)
      }
    );
  }
};

export const DomValueInterceptor = (data) => {
  // deep iterate keys
  // check values if shouldParseHTML
  // parse if any html and convert to type = 'type-nested' if needed
  const mutatedItems = [];

  deepMetaIterate(data, (parent, obj, key, value) => {
    if (typeof value === 'string' && shouldParseHTML(value)) {
      obj[key] = {
        type: 'nested-block',
        children: parseHtml(value),
      };
      mutatedItems.push(parent);
    }
  });

  mutateItemsAccordingToRules(data, mutatedItems);

  return data;
}
