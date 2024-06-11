'use strict'

import { Loader } from '@googlemaps/js-api-loader'

export const GoogleMaps = {
  deps: { Loader },
  props: {
    mapOptions: {
      disableDefaultUI: true
    }
  },
  data: { loader: null },
  on: {
    init: (el, s, ctx) => {
      const { data, props, deps } = el
      const { version, apiKey } = props
      if (data.loader) return
      data.loader = new deps.Loader({
        apiKey: apiKey || process?.env.GOOGLE_MAPS_API_KEY,
        version: version || 'weekly'
      })
    },
    render: (el, s, ctx) => {
      const { data, props } = el
      const { mapOptions } = props
      data.loader.load().then(async (google) => {
        const { Map } = await google.maps.importLibrary('maps')
        const map = new Map(el.node, mapOptions)

        if (props.markers) {
          props.markers.forEach(({ lat, lng, title }, key) => {
            const marker = new google.maps.Marker({
              key,
              position: { lat, lng },
              map,
              title
            }).addListener('click', function () {
              s.update({ activeMarker: marker.instance.key })
            })
          })
        }
      })
    }
  }
}
