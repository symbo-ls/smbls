'use strict'

import { create, Flex } from "smbls"

create({
  extend: Flex,
  props: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    gap: 'X2',
    transform: 'translate(-50%, -50%)',
    fontSize: '5em',
  },
  Icon: {
    name: 'tree'
  },
  Icon_2: {
    name: 'trash'
  },
  Icon_3: {
    name: 'color'
  },
  Icon_4: {
    name: 'sequence'
  }
}, {
  designSystem: {
    icons: {
      sequence: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="a"><path d="M19.2,12 L19.2,14.4 L0,14.4 L0,12 L19.2,12 Z M9.810526,8 L9.810526,10.4 L0.010526,10.4 L0.010526,8 L9.810526,8 Z M5.22105232,4 L5.22105232,6.4 L0.010526,6.4 L0.010526,4 L5.22105232,4 Z M2.22105232,0 L2.22105232,2.4 L0.010526,2.4 L0.010526,0 L2.22105232,0 Z"/></clipPath></defs><g clip-path="url(#a)" transform="translate(2.4 4.8)"><polygon points="0 0 19.2 0 19.2 14.4 0 14.4 0 0"/></g></svg>',
      tree: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="a"><path d="M9.3613281,0 C10.4658976,0 11.3613281,0.8954305 11.3613281,2 C11.3613281,3.1045695 10.4658976,4 9.3613281,4 C8.91572635,3.99963479 8.48300857,3.85046919 8.1318361,3.576172 L3.9794921,5.972656 C4.00516534,6.15633356 4.00516534,6.34268944 3.9794921,6.526367 L8.1328126,8.9248045 C8.48359436,8.65036304 8.915946,8.50086154 9.3613281,8.5 C9.80692985,8.50036521 10.2396476,8.64953081 10.5908201,8.923828 L14.7431641,6.527344 C14.6629274,5.95432751 14.8347835,5.37464339 15.2143649,4.93794688 C15.5939462,4.50125038 16.1440494,4.25034273 16.7226561,4.25 C17.8272256,4.25 18.7226561,5.1454305 18.7226561,6.25 C18.7226561,7.3545695 17.8272256,8.25 16.7226561,8.25 C16.2770544,8.24963479 15.8443366,8.10046919 15.4931641,7.826172 L11.3408201,10.222656 C11.4674817,11.1304773 10.9608075,12.008203 10.1113281,12.352539 L10.1113281,17.1484375 C10.2831388,17.2175904 10.4445113,17.3102728 10.5908201,17.423828 L14.7431641,15.027344 C14.6629274,14.4543275 14.8347835,13.8746434 15.2143649,13.4379469 C15.5939462,13.0012504 16.1440494,12.7503427 16.7226561,12.75 C17.8272256,12.75 18.7226561,13.6454305 18.7226561,14.75 C18.7226561,15.8545695 17.8272256,16.75 16.7226561,16.75 C16.2770544,16.7496348 15.8443366,16.6004692 15.4931641,16.326172 L11.3408201,18.722656 C11.4210568,19.2956725 11.2492007,19.8753566 10.8696193,20.3120531 C10.490038,20.7487496 9.93993479,20.9996573 9.3613281,21 C8.78308789,20.9993357 8.23343518,20.7484382 7.854108,20.312006 C7.47478082,19.8755738 7.30290891,19.2963263 7.3828126,18.723633 L3.2285156,16.3251955 C2.87773381,16.599637 2.44538214,16.7491385 2,16.75 C0.8954305,16.75 0,15.8545695 0,14.75 C0,13.6454305 0.8954305,12.75 2,12.75 C2.57841071,12.7503821 3.12833043,13.0011581 3.50787595,13.4376261 C3.88742148,13.874094 4.05941906,14.4535051 3.9794921,15.026367 L8.1328126,17.4248045 C8.27870359,17.3106416 8.43974826,17.2173015 8.6113281,17.147461 L8.6113281,12.3515625 C7.76302256,12.0070724 7.25696809,11.1305282 7.3828126,10.223633 L3.2285156,7.8251955 C2.87773381,8.09963698 2.44538214,8.24913849 2,8.25 C0.8954305,8.25 0,7.3545695 0,6.25 C0,5.1454305 0.8954305,4.25 2,4.25 C2.44560178,4.25036519 2.8783196,4.39953079 3.2294921,4.673828 L7.3818361,2.27734375 C7.30159952,1.7043273 7.47345566,1.12464325 7.85303697,0.6879468 C8.23261828,0.251250354 8.78272146,0.000342742067 9.3613281,0 Z"/></clipPath></defs><g clip-path="url(#a)" transform="translate(2.8 1.7)"><polygon points="0 0 18.723 0 18.723 21 0 21 0 0"/></g></svg>',
      tree: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="a"><path d="M9.3613281,0 C10.4658976,0 11.3613281,0.8954305 11.3613281,2 C11.3613281,3.1045695 10.4658976,4 9.3613281,4 C8.91572635,3.99963479 8.48300857,3.85046919 8.1318361,3.576172 L3.9794921,5.972656 C4.00516534,6.15633356 4.00516534,6.34268944 3.9794921,6.526367 L8.1328126,8.9248045 C8.48359436,8.65036304 8.915946,8.50086154 9.3613281,8.5 C9.80692985,8.50036521 10.2396476,8.64953081 10.5908201,8.923828 L14.7431641,6.527344 C14.6629274,5.95432751 14.8347835,5.37464339 15.2143649,4.93794688 C15.5939462,4.50125038 16.1440494,4.25034273 16.7226561,4.25 C17.8272256,4.25 18.7226561,5.1454305 18.7226561,6.25 C18.7226561,7.3545695 17.8272256,8.25 16.7226561,8.25 C16.2770544,8.24963479 15.8443366,8.10046919 15.4931641,7.826172 L11.3408201,10.222656 C11.4674817,11.1304773 10.9608075,12.008203 10.1113281,12.352539 L10.1113281,17.1484375 C10.2831388,17.2175904 10.4445113,17.3102728 10.5908201,17.423828 L14.7431641,15.027344 C14.6629274,14.4543275 14.8347835,13.8746434 15.2143649,13.4379469 C15.5939462,13.0012504 16.1440494,12.7503427 16.7226561,12.75 C17.8272256,12.75 18.7226561,13.6454305 18.7226561,14.75 C18.7226561,15.8545695 17.8272256,16.75 16.7226561,16.75 C16.2770544,16.7496348 15.8443366,16.6004692 15.4931641,16.326172 L11.3408201,18.722656 C11.4210568,19.2956725 11.2492007,19.8753566 10.8696193,20.3120531 C10.490038,20.7487496 9.93993479,20.9996573 9.3613281,21 C8.78308789,20.9993357 8.23343518,20.7484382 7.854108,20.312006 C7.47478082,19.8755738 7.30290891,19.2963263 7.3828126,18.723633 L3.2285156,16.3251955 C2.87773381,16.599637 2.44538214,16.7491385 2,16.75 C0.8954305,16.75 0,15.8545695 0,14.75 C0,13.6454305 0.8954305,12.75 2,12.75 C2.57841071,12.7503821 3.12833043,13.0011581 3.50787595,13.4376261 C3.88742148,13.874094 4.05941906,14.4535051 3.9794921,15.026367 L8.1328126,17.4248045 C8.27870359,17.3106416 8.43974826,17.2173015 8.6113281,17.147461 L8.6113281,12.3515625 C7.76302256,12.0070724 7.25696809,11.1305282 7.3828126,10.223633 L3.2285156,7.8251955 C2.87773381,8.09963698 2.44538214,8.24913849 2,8.25 C0.8954305,8.25 0,7.3545695 0,6.25 C0,5.1454305 0.8954305,4.25 2,4.25 C2.44560178,4.25036519 2.8783196,4.39953079 3.2294921,4.673828 L7.3818361,2.27734375 C7.30159952,1.7043273 7.47345566,1.12464325 7.85303697,0.6879468 C8.23261828,0.251250354 8.78272146,0.000342742067 9.3613281,0 Z"/></clipPath></defs><g clip-path="url(#a)" transform="translate(2.8 1.7)"><polygon points="0 0 18.723 0 18.723 21 0 21 0 0"/></g></svg>',
      trash: '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m15.4999193 2.99999063c.2762485 0 .4999974.2239993.4999974.5v1.62499335h3.5024817c.2759986 0 .4999974.2239993.4999974.49999844v.74999766c0 .27624913-.2239988.49999844-.4999974.49999844h-.6274967v13.49995778c0 .2762492-.2237488.4999985-.4999974.4999985h-12.7499336c-.27599856 0-.49999739-.2237493-.49999739-.4999985v-13.49995778h-.58374436c-.27625116 0-.5-.22374931-.5-.49999844v-.74999766c0-.27599914.22374884-.49999844.5-.49999844h3.50222916v-1.62499335c0-.2760007.22399883-.5.49999739-.5zm1.6249915 3.87498789h-10.24994661v12.24996168h10.24994661zm-6.7499648 2.12506835c.2762485 0 .4999974.2239993.4999974.5v6.99997653c0 .2759992-.2237489.4999985-.4999974.4999985h-.74999353c-.27600116 0-.5-.2239993-.5-.4999985v-6.99997653c0-.2760007.22399884-.5.5-.5zm3.9999791 0c.2762486 0 .4999974.2239993.4999974.5v6.99997653c0 .2759992-.2237488.4999985-.4999974.4999985h-.7499935c-.2760011 0-.5-.2239993-.5-.4999985v-6.99997653c0-.2760007.2239989-.5.5-.5z" fill-rule="evenodd"/></svg>',
      color: '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="currentColor" fill-rule="nonzero" transform="translate(2.115475 2)"><path d="m.50452486 11h6.23c.19 0 .37.11.45.29.07.14.15.28.24.41.11.16.12.36.02.53l-3.11 5.39c-.15.27-.51.33-.75.14-.27-.22-.52-.45-.76-.69-1.46-1.46-2.47-3.36-2.81-5.49-.05-.31.18-.58.49-.58z" opacity=".53"/><path d="m4.32452486 2.38 3.11 5.39c.1.17.09.37-.02.53-.09.13-.17.27-.24.41-.08.18-.25.29-.44.29h-6.23c-.31 0-.54-.28-.5-.58.33-2.13 1.35-4.03 2.81-5.49.24-.24.5-.47.76-.69.24-.19.6-.12.75.14z" opacity=".421679"/><path d="m19.7645249 11.58c-.39 2.49-1.71 4.67-3.58 6.19-.24.19-.6.13-.75-.14l-3.11-5.39c-.1-.17-.09-.37.02-.53.09-.13.18-.28.25-.42.08-.17.26-.28.45-.28h6.23c.3-.01.53.26.49.57z" opacity=".77"/><path d="m12.5845249 8.72c-.07-.15-.15-.29-.24-.42-.11-.16-.11-.36-.02-.53l3.11-5.39c.15-.27.51-.33.75-.14.27.22.52.45.76.69 1.46 1.46 2.47 3.36 2.81 5.49.05.3-.19.58-.5.58h-6.23c-.18 0-.35-.11-.44-.28z" opacity=".88"/><path d="m13.7145249 1.38-3.11 5.38c-.1.17-.29.26-.48.25-.08-.01-.16000004-.01-.24000004-.01s-.16 0-.25.01c-.19.02-.38-.08-.48-.25l-3.1-5.38c-.15-.26-.03-.61.26-.72 1.1-.42 2.31-.66 3.57-.66 1.26000004 0 2.47000004.24 3.57000004.66.29.11.41.46.26.72z"/><path d="m6.05452486 18.62 3.11-5.38c.1-.17.29-.26.48-.25.08.01.16.01.24.01.07 0 .15000004 0 .22000004-.01.2-.02.38.08.48.25l3.11 5.38c.15.27.03.61-.25.72-1.1.43-2.3.66-3.56000004.66-1.26 0-2.47-.24-3.57-.66-.29-.11-.41-.46-.26-.72z" opacity=".65"/></g></svg>'
    }
  }
})