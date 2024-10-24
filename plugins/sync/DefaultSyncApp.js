'use strict'

import { SyncComponent } from './index'
import { Inspect } from './Inspect'
import { Notifications } from './Notifications'

export const DefaultSyncApp = {
  extend: [SyncComponent, Inspect, Notifications]
}
