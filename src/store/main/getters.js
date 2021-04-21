import _ from 'lodash'


export default {
  getStore: state => state,
  getInfo: state => state.info,
  getConfig: state => state.config,
  loading: state => state.loading,
  getWeeks: state => state.weeks,
  getModules: state => state.modules,
  getImageServer: state => state.imageServer,
  getDefaultState: state => state.defaultState,
  areComponentsRendered: state => state.componentsRendered,
  getSelectedWeekID: state => state.selectedWeekID,
  getStudents: state => state.weeks,
  isDialogVisible: state => state.dialogVisible,
  isSettingsVisible: state => state.settingsVisible,
  getPagesSet: state => state.pagesSet,
  getDialogData: state => state.dialogData,
  getSavedStates: state => state.savedStates,
  getCurrentCourse: state => state.currentCourse,
  getCurrentVersion: state => state.currentVersion,
  getRowsByCID: state => {
    const res = {}

    state.rows.forEach((row) => {
      if (row.cid in res) res[row.cid].push(row)
      else res[row.cid] = [row]
    })

    return res
  },
  getSlotsByColID: state => {
    const res = {}

    state.slots.forEach((slot) => {
      if (slot.colid in res) res[slot.colid].push(slot)
      else res[slot.colid] = [slot]
    })

    return res
  },
  getSlotsByRowID: state => {
    const res = {}

    state.slots.forEach((slot) => {
      if (slot.rid in res) res[slot.rid].push(slot)
      else res[slot.rid] = [slot]
    })

    return res
  },
  getColumnsByRowID: state => {
    const res = {}

    state.columns.forEach((column) => {
      if (column.rid in res) res[column.rid].push(column)
      else res[column.rid] = [column]
    })

    return res
  },
  getFromGetter: (state) => (getter) => {
    getter = getter.replaceAll('].', '.').replaceAll(']', '').replaceAll('[', '.')
    let items = getter.split('.')
    let res = state
    items.forEach(item => {
      res = res[item]
    })
    return res
  },
  getSessionIndexByID: (state) => (id) => {
    let type = 'weeks'
    let index = _.findIndex(state.weeks, { id })
    if (index == -1) {
      index = _.findIndex(state.modules, { id })
      type = 'modules'
    }
    return {index, type}
  },
  getSessionPropByID: (state, getters) => (prop, id) => {
    let session = _.find(state.weeks, { id })
    if (session) {
      return {
        get: session[prop],
        set: `weeks[${getters.getWeekIndexByID(id)}].${prop}`
      }
    }
    else {
      let module = _.find(state.modules, { id })
      return {
        get: module[prop],
        set: `modules[${getters.getModuleIndexByID(id)}].${prop}`
      }
    }
  },
  getModuleIndexByID: (state) => (id) => {
    return _.findIndex(state.modules, {id})
  },
  getModulePropByID: (state, getters) => (prop, id) => {
    let module = _.find(state.modules, { id })
    return {
      get: module[prop],
      set: `modules[${getters.getModuleIndexByID(id)}].${prop}`
    }
  },
  getModulePropGetter: (state, getters) => (prop, id) => {
    return {
      func: 'getModulePropByID',
      props: [prop, id]
    }
  },
  getWeekByID: (state) => (id) => {
    return _.find(state.weeks, {id})
  },
  getWeekIndexByID: (state) => (id) => {
    return _.findIndex(state.weeks, {id})
  },
  getWeekPropByID: (state, getters) => (prop, id) => {
    let week = _.find(state.weeks, { id })
    if (!week) return null
    return {
      get: week[prop],
      set: `weeks[${getters.getWeekIndexByID(id)}].${prop}`
    }
  },
  getSelectedWeekProp: (state, getters) => (prop) => {
    let id = getters.getSelectedWeekID
    let week = _.find(state.weeks, { id })
    return {
      get: week[prop],
      set: `weeks[${getters.getWeekIndexByID(id)}].${prop}`
    }
  },
  getWeekPropGetter: (state, getters) => (prop, id) => {
    return {
      func: 'getWeekPropByID',
      props: [prop, id]
    }
  },
  getSelectedWeekPropGetter: (state, getters) => (prop) => {
    return {
      func: 'getSelectedWeekProp',
      props: [prop]
    }
  },
  getWeekItemPropByID: (state, getters) => (prop, type, id) => {
    let week = _.find(state.weeks, { [type]: [{ id }] })
    let itemIndex = _.findIndex(week[type], { id })
    let item = week[type][itemIndex]
    return {
      get: item[prop],
      set: `weeks[${getters.getWeekIndexByID(week.id)}][${type}][${itemIndex}].${prop}`
    }
  },
  getWeekItemPropGetter: (state, getters) => (prop, type, id) => {
    return {
      func: 'getWeekItemPropByID',
      props: [prop, type, id]
    }
  },
  getRowTypes: state => state.rowTypes,
  getColTypes: state => state.colTypes,
  getSlotTypes: state => state.slotTypes,
  isDndMode: state => state.dndMode,
  isDraggingRow: state => state.draggingRow,
  getDraggedRow: state => state.draggedRow,
  getDragType: state => state.dragType,
}
