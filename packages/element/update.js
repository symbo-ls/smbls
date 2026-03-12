'use strict'

import {
  window,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
  merge,
  overwriteDeep,
  isMethod,
  findInheritedState,
  OPTIONS,
  updateProps,
  captureSnapshot,
  propertizeUpdate
} from '@domql/utils'

import { applyEvent, triggerEventOn, triggerEventOnUpdate } from './event/index.js'
import { createState } from '@domql/state'

import { create } from './create.js'
import {
  throughExecProps,
  throughUpdatedDefine,
  throughUpdatedExec
} from './iterate.js'
import { REGISTRY } from './mixins/index.js'
import { applyParam } from './utils/applyParam.js'
import { METHODS_EXL } from './utils/index.js' // old utils (current)
import { setContent } from './set.js'
import setChildren from './children.js'

const UPDATE_DEFAULT_OPTIONS = {
  stackChanges: false,
  cleanExec: true,
  preventRecursive: false,
  currentSnapshot: false,
  calleeElement: false,
  exclude: METHODS_EXL
}

export const update = function (params = {}, opts) {
  // Shallow copy is sufficient - all values are primitives/references that shouldn't be cloned
  const options = isObject(opts)
    ? { ...UPDATE_DEFAULT_OPTIONS, ...opts }
    : { ...UPDATE_DEFAULT_OPTIONS }
  const element = this

  let ref = element.__ref
  if (!ref) ref = element.__ref = {}
  const [snapshotOnCallee, calleeElement, snapshotHasUpdated] = captureSnapshot(
    element,
    options
  )

  if (snapshotHasUpdated) return

  if (!options.preventListeners) {
    triggerEventOnUpdate('startUpdate', params, element, options)
  }

  const { parent, node, key } = element
  const { exclude, preventInheritAtCurrentState } = options

  if (
    preventInheritAtCurrentState &&
    preventInheritAtCurrentState.__element === element
  ) {
    return
  }
  if (!exclude) merge(options, UPDATE_DEFAULT_OPTIONS)

  if (isString(params) || isNumber(params)) {
    params = { text: params }
  }

  // apply new updates
  params = propertizeUpdate.call(element, params)

  const inheritState = inheritStateUpdates(element, options)
  if (inheritState === false) return

  const ifFails = checkIfOnUpdate(element, parent, options)
  if (ifFails) return

  if (ref.__if && !options.preventPropsUpdate) {
    const hasParentProps =
      parent.props && (parent.props[key] || parent.props.childProps)
    const hasFunctionInProps = ref.__propsStack.some(isFunction)
    const props = params.props || hasParentProps || hasFunctionInProps
    if (props) updateProps(props, element, parent)
  }

  if (!options.preventBeforeUpdateListener && !options.preventListeners) {
    const hasBeforeUpdate = element.on?.beforeUpdate || element.props?.onBeforeUpdate
    if (hasBeforeUpdate) {
      const simulate = { ...params, ...element }
      Object.setPrototypeOf(simulate, Object.getPrototypeOf(element))
      const beforeUpdateReturns = triggerEventOnUpdate(
        'beforeUpdate',
        params,
        simulate,
        options
      )
      if (beforeUpdateReturns === false) return element
    }
  }

  // apply new updates
  overwriteDeep(element, params)

  // exec updates
  throughExecProps(element)
  throughUpdatedExec(element, { ignore: UPDATE_DEFAULT_OPTIONS })
  throughUpdatedDefine(element)

  if (!options.isForced && !options.preventListeners) {
    triggerEventOn('beforeClassAssign', element, options)
  }

  if (!ref.__if) return false
  if (!node) return

  const {
    preventUpdate,
    preventDefineUpdate,
    preventContentUpdate,
    preventStateUpdate,
    preventRecursive,
    preventUpdateListener,
    preventUpdateAfter,
    preventUpdateAfterCount
  } = options

  if (preventUpdateAfter) {
    if (
      isNumber(preventUpdateAfterCount) &&
      preventUpdateAfter <= preventUpdateAfterCount
    ) {
      return
    } else if (options.preventUpdateAfterCount === undefined) {
      options.preventUpdateAfterCount = 1
    } else options.preventUpdateAfterCount++
  }

  // Convert arrays to Sets once for O(1) lookups during iteration
  const preventUpdateSet = isArray(preventUpdate) ? new Set(preventUpdate) : null
  const preventDefineUpdateSet = isArray(preventDefineUpdate) ? new Set(preventDefineUpdate) : null

  for (const param in element) {
    const prop = element[param]

    if (!Object.prototype.hasOwnProperty.call(element, param)) continue

    const isInPreventUpdate =
      preventUpdateSet && preventUpdateSet.has(param)
    const isInPreventDefineUpdate =
      preventDefineUpdateSet && preventDefineUpdateSet.has(param)

    // Skip onXxx event handler functions (e.g. onClick) that may remain at root level
    const isRootEventHandler = isFunction(prop) && param.length > 2 &&
      param.charCodeAt(0) === 111 && param.charCodeAt(1) === 110 && // 'on'
      param.charCodeAt(2) >= 65 && param.charCodeAt(2) <= 90 // A-Z

    if (
      isUndefined(prop) ||
      isInPreventUpdate ||
      isInPreventDefineUpdate ||
      preventDefineUpdate === true ||
      preventDefineUpdate === param ||
      (preventStateUpdate && param === 'state') ||
      isMethod(param, element) ||
      isRootEventHandler ||
      isObject(REGISTRY[param])
    ) {
      continue
    }

    if (preventStateUpdate === 'once') options.preventStateUpdate = false

    const isElement = applyParam(param, element, options)
    if (isElement) {
      const { hasDefine, hasContextDefine } = isElement
      const canUpdate =
        isObject(prop) && !hasDefine && !hasContextDefine && !preventRecursive
      if (!canUpdate) continue

      const lazyLoad = element.props.lazyLoad || options.lazyLoad

      if (options.onEachUpdate) {
        options.onEachUpdate(param, element, element.state, element.context)
      }

      const childParams = params[param]
      if (childParams === undefined && !options.isForced) {
        if (options.onlyUpdate) {
          if (param !== options.onlyUpdate) continue
        } else if (!options.updateByState) {
          continue
        }
      }

      // Once we reach the onlyUpdate target, clear it so its children update normally
      const childOptions = options.onlyUpdate && param === options.onlyUpdate
        ? { ...options, onlyUpdate: undefined, currentSnapshot: snapshotOnCallee, calleeElement }
        : { ...options, currentSnapshot: snapshotOnCallee, calleeElement }

      const childUpdateCall = () =>
        update.call(prop, childParams, childOptions)

      if (lazyLoad) {
        window.requestAnimationFrame(() => {
          // eslint-disable-line
          childUpdateCall()
          // handle lazy load
          if (!options.preventUpdateListener && !options.preventListeners) {
            triggerEventOn('lazyLoad', element, options)
          }
        })
      } else childUpdateCall()
    }
  }

  if (!preventContentUpdate) {
    const contentKey = ref.contentElementKey || 'content'
    const existingContent = element[contentKey]

    // During state-triggered cascading updates (updateByState), skip static
    // children but still re-process dynamic children (originally functions, already
    // re-evaluated by throughUpdatedExec). Check ref.__exec.children to detect these.
    const childrenProp = options.updateByState
      ? (params.children || (ref.__exec?.children ? element.children : undefined))
      : (params.children || element.children)

    if (childrenProp) {
      const content = setChildren(childrenProp, element, opts)
      if (content && !ref.__noChildrenDifference) {
        setContent(content, element, options)
      } else if (existingContent?.__ref && isFunction(existingContent.update)) {
        const lazyLoad = element.props?.lazyLoad || options.lazyLoad
        const contentUpdateCall = () =>
          update.call(existingContent, params[contentKey], {
            ...options,
            currentSnapshot: snapshotOnCallee,
            calleeElement
          })

        if (lazyLoad) {
          window.requestAnimationFrame(() => {
            contentUpdateCall()
            if (!options.preventUpdateListener && !options.preventListeners) {
              triggerEventOn('lazyLoad', element, options)
            }
          })
        } else contentUpdateCall()
      }
    } else if (existingContent?.__ref && isFunction(existingContent.update)) {
      const lazyLoad = element.props?.lazyLoad || options.lazyLoad
      const contentUpdateCall = () =>
        update.call(existingContent, params[contentKey], {
          ...options,
          currentSnapshot: snapshotOnCallee,
          calleeElement
        })

      if (lazyLoad) {
        window.requestAnimationFrame(() => {
          contentUpdateCall()
          if (!options.preventUpdateListener && !options.preventListeners) {
            triggerEventOn('lazyLoad', element, options)
          }
        })
      } else contentUpdateCall()
    } else {
      const content = element.children || params.content
      if (content && !options.updateByState) {
        setContent(content, element, options)
      }
    }
  }

  if (!preventUpdateListener && !options.preventListeners) {
    triggerEventOn('update', element, options)
  }

  // Trigger fetch on stateChange if configured
  if (!options.preventFetch && ref.__fetchOnStateChange) {
    import('./mixins/fetch.js').then(({ runFetchConfig }) => {
      runFetchConfig(ref.__fetchOnStateChange, element, element.context)
    })
  }
}

const findSiblingAttachOptions = (element, parent) => {
  const { __children } = parent.__ref || {}
  if (!__children) return false

  const currentIndex = __children.indexOf(element.key)

  // Walk backwards to find nearest previous sibling with a DOM node
  let previousNode
  for (let i = currentIndex - 1; i >= 0; i--) {
    const sibling = parent[__children[i]]
    if (sibling?.node?.parentNode) {
      previousNode = sibling.node
      break
    }
  }

  if (previousNode) {
    return { position: 'after', node: previousNode }
  }

  // Walk forwards to find nearest next sibling with a DOM node
  let nextNode
  for (let i = currentIndex + 1; i < __children.length; i++) {
    const sibling = parent[__children[i]]
    if (sibling?.node?.parentNode) {
      nextNode = sibling.node
      break
    }
  }

  if (nextNode) {
    return { position: 'before', node: nextNode }
  }

  return false
}

const checkIfOnUpdate = (element, parent, options) => {
  if ((!isFunction(element.if) && !isFunction(element.props?.if)) || !parent) {
    return
  }

  const ref = element.__ref
  const ifPassed = (element.if || element.props?.if)(
    element,
    element.state,
    element.context,
    options
  )
  const itWasFalse = ref.__if !== true

  if (ifPassed) {
    ref.__if = true
    if (itWasFalse) {
      delete element.__hash
      delete element.__text
      delete element.extends
      if (!ref.__hasRootState) {
        delete element.state
      }

      if (ref.__state) {
        element.state = ref.__state
      } else if (!ref.__hasRootState) {
        delete element.state
      }

      if (element.node) {
        element.node.remove()
        delete element.node
      }

      const contentKey = ref.contentElementKey

      if (element.children) {
        element.removeContent()
      } else if (element[contentKey]?.parseDeep) {
        element[contentKey] = element[contentKey].parseDeep()
      }

      const attachOptions = findSiblingAttachOptions(element, parent)

      delete element.__ref
      delete element.parent
      const createdElement = create(
        element,
        parent,
        element.key,
        OPTIONS.create,
        attachOptions
      )
      // check preventUpdate for an array (Line: 87)
      if (
        options.preventUpdate !== true &&
        element.on &&
        isFunction(element.on.update)
      ) {
        applyEvent(element.on.update, createdElement, createdElement.state)
      }
      return createdElement
    }
  } else if (element.node && !ifPassed) {
    element.node.remove()
    delete ref.__if
  }
}

/**
 * Inherit state updates for a given element when state is inherited.
 *
 * @param {Object} element - The element to inherit state updates for.
 * @param {Object} options - Configuration options for state update inheritance.
 * @param {boolean} [options.preventUpdateTriggerStateUpdate] - If true, prevent triggering state updates.
 * @param {boolean} [options.isHoisted] - Whether the state is hoisted.
 * @param {boolean} [options.preventInheritedStateUpdate] - If true, prevent inheriting state updates.
 * @param {boolean} [options.preventBeforeStateUpdateListener] - If true, prevent the 'beforeStateUpdate' event listener.
 * @param {boolean} [options.preventStateUpdateListener] - If true, prevent the 'stateUpdate' event listener.
 * @returns {boolean} - If returns false, it breaks the update function
 */
const inheritStateUpdates = (element, options) => {
  const { __ref: ref } = element
  const stateKey = ref.__state
  const { parent } = element
  const { preventUpdateTriggerStateUpdate } = options

  if (preventUpdateTriggerStateUpdate) return

  // If does not have own state inherit from parent
  if (!stateKey && !ref.__hasRootState) {
    element.state = parent?.state || {}
    return
  }

  // If state is string, find its value in the state tree
  const keyInParentState = findInheritedState(element, element.parent)
  if (!keyInParentState || options.preventInheritedStateUpdate) return

  // Trigger on.beforeStateUpdate event
  if (!options.preventBeforeStateUpdateListener && !options.preventListeners) {
    const initStateReturns = triggerEventOnUpdate(
      'beforeStateUpdate',
      keyInParentState,
      element,
      options
    )
    if (initStateReturns === false) return element
  }

  // Recreate the state again
  const newState = createStateUpdate(element, parent, options)

  // Trigger on.stateUpdate event
  if (!options.preventStateUpdateListener && !options.preventListeners) {
    triggerEventOnUpdate('stateUpdate', newState.parse(), element, options)
  }
}

const createStateUpdate = (element, parent, options) => {
  const __stateChildren = element.state.__children
  const newState = createState(element, parent)
  element.state = newState
  for (const child in __stateChildren) {
    // check this for inherited states
    if (newState[child]) newState.__children[child] = __stateChildren[child]
    // __stateChildren[child].parent = newState
    Object.getPrototypeOf(__stateChildren[child]).parent = newState
  }
  return newState
}

export default update
