'use strict'

import { Loader } from '@googlemaps/js-api-loader'

let loader
export const GoogleMaps = {
  props: {
    mapOptions: {
      disableDefaultUI: true
    }
  },
  on: {
    init: (el, s, ctx) => {
      const { version, apiKey } = el.props
      if (loader) return
      loader = new Loader({
        apiKey: apiKey || process.env.GOOGLE_MAPS_API_KEY,
        version: version || 'weekly'
      })
    },
    render: (el, s, ctx) => {
      const { props } = el
      const { mapOptions } = props
      loader.load().then(async (google) => {
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
