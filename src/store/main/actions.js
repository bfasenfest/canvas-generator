import { uuid } from "vue-uuid"
import SavedFields from '../../util/saved-fields.json'
import Config from '../../util/config.js'
import state from './state';
import _ from 'lodash'


function findObj(objKey, objValue, list){
  for (const [name, row] of Object.entries(list)){
    if (row[objKey] == objValue) return row
  }
}

var moment = require('moment');

export default {
    setConfig: ({ commit }) => {
      commit('setConfig', Config.data())
    },

    //Slot Actions
    addRow: ({ commit, state }, row) => {
      if(!row.rid) row.rid = uuid.v1()
      if(!row.sort) row.sort = state.rows.length
      commit('addRow', row)
      return row
    },
    deleteRow: ({ commit }, rid) => {
      commit('deleteRow', rid)
    },
    addColumn: ({ commit, state }, column) => {
      if(!column.colid) column.colid = uuid.v1()
      if(!column.sort) column.sort = state.columns.length
      commit('addColumn', column)
      return column
    },
    deleteColumn: ({ commit }, colid) => {
      commit('deleteColumn', colid)
    },
    setDialogVisibility: ({ commit }, visibility) => {
      commit('setDialogVisibility', visibility)
    },
    setDialogData: ({ commit }, data) => {
      commit('setDialogData', data)
    },
    addSlot: ({ commit, state }, slot) => {
      if(!slot.sid) slot.sid = uuid.v1()
      if(!slot.colspan) {
        let SlotType = findObj('id', slot.type, SlotTypes)
        slot.colspan = SlotType.colspan
      }
      if(!slot.sort) slot.sort = state.slots.length
      commit('addSlot', slot)
      return slot
    },
    deleteSlot: ({ commit }, sid) => {
      commit('deleteSlot', sid)
    },
    updateSlotData: ({ commit }, slot) => {
      commit('updateSlotData', slot)
    },
    cleanSetter: ({ state }, setter) => {
      setter = setter.replaceAll('].', '.').replaceAll(']', '').replaceAll('[', '.')
      let items = setter.split('.')
      let base = state
      let last

      items.forEach((item, i, arr) => {
        if(i === arr.length - 1) last = item
        else base = base[item]
      })

      return {
        base,
        last
      }
    },
    updateSlotDataWithSetter: ({ commit, dispatch }, payload) => {
      dispatch('cleanSetter', payload.setter)
      .then(res => {
        commit('setStateFieldWithBase', {
          base: res.base,
          field: res.last,
          value: payload.data
        })
      })
    },
    setSlotStyles: ({ commit }, payload) => {
      commit('setSlotStyles', payload)
    },
    setSlotClasses: ({ commit }, payload) => {
      commit('setSlotClasses', payload)
    },
    setSlotGetter: ({ commit }, payload) => {
      commit('setSlotGetter', payload)
    },
    createRowsFromArray({ state, dispatch }, payload) {
      const RowTypes = state.rowTypes
      payload.rows.forEach(row => {
        let actualRow
        let type = payload.type || ''
        let data = payload.data || {}

        if (typeof row == 'string') {
          let rowTemplate = findObj('type', row, RowTypes)
          actualRow = rowTemplate.array[0]
          type = rowTemplate.type
        }
        else actualRow = row

        dispatch('addRow', {
          cid: payload.cid,
          type, data

        }).then(res => {
          dispatch('createColumnsFromArray', {
            columns: actualRow,
            rid: res.rid
          })
        })
      })
    },
    createColumnsFromArray({ dispatch, state }, payload) {
      const row = _.find(state.rows, { rid: payload.rid })
      const ColTypes = state.colTypes

      let columns = payload.columns

      // if (typeof columns[0] == 'string') {
      //   let colObj = findObj('type', columns[0], ColTypes).array
      //   columns = [colObj]
      // }

      columns.forEach(column => {
        let actualCol, col

        if (typeof column == 'string') {
          col = findObj('type', column, ColTypes)
          if(col) actualCol = col.array
        }
        else if(column && column.array) {
          col = column
          actualCol = col.array
        }
        else actualCol = column

        dispatch('addColumn', {
          width: col && col.width ? col.width : undefined,
          rid: row.rid,
          cid: row.cid
        }).then(res => {
          dispatch('createSlotsFromArray', {
            slots: actualCol,
            colid: res.colid
          })
        })
      })
    },
    createSlotsFromArray({ state, dispatch }, payload) {
      const column = _.find(state.columns, { colid: payload.colid })
      let SlotTypes = state.slotTypes
      let actualSlotType

      payload.slots.forEach(slot => {
        if(typeof slot == 'string') {
          actualSlotType = findObj('type', slot, SlotTypes)

          dispatch('addSlot', {
            type: actualSlotType.id,
            colspan: actualSlotType.colspan,
            rid: column.rid,
            cid: column.cid,
            colid: column.colid,
            data: slot.data ? slot.data : actualSlotType.defaultData,
            getter: actualSlotType.getter ? actualSlotType.getter : null
          })
        }
        else {
          actualSlotType = findObj('type', slot.type, SlotTypes)

          dispatch('addSlot', {
            ...slot,
            type: actualSlotType.id,
            colspan: slot.colspan || actualSlotType.colspan,
            rid: column.rid,
            cid: column.cid,
            colid: column.colid,
            data: slot.data ? slot.data : actualSlotType.defaultData,
            classes: slot.classes ? slot.classes : [],
            styles: slot.styles ? slot.styles : [],
            getter: slot.getter ? slot.getter : null
          })
        }
      })
    },
    updateRowTypes: ({ commit }, payload) => {
      commit('updateRowTypes', payload)
    },
    updateColTypes: ({ commit }, payload) => {
      commit('updateColTypes', payload)
    },
    updateSlotTypes: ({ commit }, payload) => {
      commit('updateSlotTypes', payload)
    },

    //User Actions
    addProf: ({ commit, getters }) => {
      let prof = _.cloneDeep(getters.getDProf)
      prof.id = uuid.v1()
      commit('addProf', prof)
    },
    deleteProf: ({ commit }, prof) => {
      commit('deleteProf', prof)
    },
    addTA: ({ commit, getters }) => {
      let ta = _.cloneDeep(getters.getDTA)
      ta.id = uuid.v1()
      commit('addTA', ta)
    },
    deleteTA: ({ commit }, ta) => {
      commit('deleteTA', ta)
    },
    addStudent: ({ commit, getters }) => {
      let student = _.cloneDeep(getters.getDStudent)
      student.id = _.uniqueId()
      commit('addStudent', student)
    },
    deleteStudent: ({ commit }, student) => {
      commit('deleteStudent', student)
    },
    clearStudents: ({ commit, getters }) => {
      commit('clearStudents')
      let student = _.cloneDeep(getters.getDStudent)
      student.id = _.uniqueId()
      commit('addStudent', student)
    },
    updateUser: ({ commit }, { user, prop, value }) => {
      commit('updateUser', { user, prop, value })
    },

    //Week Actions
    addWeek: ({ commit, getters }, data = {}) => {

      let dWeek = _.cloneDeep(getters.getDWeek)

      if (typeof(data) == "number"){
        let index = data
        if (index > 15 && state.info.classType.dateType == "Week") index = 15

        dWeek.imgSrc = state.imageServer + state.info.classType.dateType.toLowerCase() + index + ".png"
        dWeek.date = moment()
        dWeek.title = "Lecture " + index
        dWeek.secondTitle = "Lecture " + index + " II"

        commit('addWeek', dWeek)
      }
      else{
        let week = {...dWeek, ...data}
        week.id = uuid.v1()
        commit('addWeek', week)
      }

    },
    deleteWeek: ({ commit }, week) => {
      commit('deleteWeek', week)
    },
    updateWeek: ({ commit }, data) => {
      commit('updateWeek', data)
    },
    sliceWeek: ({ commit }, week) => {
      commit('sliceWeek', week)
    },
    updateWeeks: ({ commit }, week) => {
      commit('updateWeeks', week)
    },

    //Week Element Actions
    addVideo: ({ commit, getters }, index, data = {}) => {
      let dVideo= _.cloneDeep(getters.getDVideo)
      let video = {...dVideo, ...data}
      video.id = uuid.v1()
      commit('addVideo', { video, index })
    },

    addCase: ({ commit, state }, {index, caseStudy}) => {

      let week = state.weeks[index]

      if(week.cases.length == 0){
        commit('addCase', { index, caseStudy })
      }
      else{
        let arr = week.cases
        let isUnique = true
        arr.forEach(function(testCase) {
          if (testCase.id == caseStudy.id) isUnique = false
        })

        if (isUnique) commit('addCase', { index, caseStudy })
      }
    },

    addAssignment:({ commit, getters }, index, data = {}) => {
      let dAssignment = _.cloneDeep(getters.getDAssignment)
      let assignment = {...dAssignment, ...data}
      assignment.id = uuid.v1()
      commit('addAssignment', { assignment, index })
    },

    addDiscussion: ({ commit, getters }, index, data = {}) => {
      let dDiscussion = _.cloneDeep(getters.getDDiscussion)
      let discussion = {...dDiscussion, ...data}
      discussion.id = uuid.v1()
      commit('addDiscussion', {discussion, index})
    },

    removeCase: ({ commit }, {index, caseStudy}) => {
      commit('removeCase', {index, caseStudy})
    },

    //Page Actions
    setPageData: ({ commit }, page) => {
      commit('setPageData', page)
    },

    //Info Actions
    updateProp: ({ commit }, { prop, value }) => {
      commit('updateProp', { prop, value })
    },
    updateSpecificInfo: ({ commit }, payload) => {
      commit('updateSpecificInfo', payload)
    },
    updateInfo: ({ commit }, payload) => {
      commit('updateInfo', payload)
    },
    updateStore: ({ commit }, payload) => {
      commit('updateStore', payload)
    },
    setSettingsVisibility: ({ commit }, visibility) => {
      commit('setSettingsVisibility', visibility)
    },
    addSavedState: ({ commit, state }) => {
      const newState = {
        uuid: uuid.v1(),
        version: 0,
        versions: [{}]
      }

      SavedFields.forEach(field => {
        newState.versions[0][field] = JSON.stringify(state[field])
      })

      commit('addSavedState', newState)
      return newState.uuid
    },
    setSavedState: ({ commit, state }, payload) => {
      const index = _.findIndex(state.savedStates, { uuid: payload.uuid })
      const current = state.savedStates[index]

      SavedFields.forEach(field => {
        current.versions[payload.version][field] = JSON.stringify(state[field])
      })
      commit('setSavedState', { current: current, index: index })
    },
    addNewVersion: ({ commit, state, dispatch }, uuid) => {
      const index = _.findIndex(state.savedStates, { uuid: uuid })
      const current = state.savedStates[index]
      const latest = _.cloneDeep(current.versions[current.versions.length - 1])

      dispatch('setSavedStateVersion', { uuid: uuid, version: current.versions.length })

      commit('addNewVersion', { latest: latest, index: index })
    },
    setSavedStateVersion: ({ commit, state }, payload) => {
      const index = _.findIndex(state.savedStates, { uuid: payload.uuid })

      commit('setSavedStateVersion', { index: index, version: payload.version })
    },
    setCurrentCourse: ({ commit }, uuid) => {
      commit('setCurrentCourse', uuid)
    },
    setCurrentVersion: ({ commit }, version) => {
      commit('setCurrentVersion', version)
    },
    setInfoField({ commit }, payload) {
      commit('setInfoField', payload)
    },
    setStateField({ commit }, payload) {
      commit('setStateField', payload)
    },
    chooseSavedState({ commit, state }, payload) {
      const index = _.findIndex(state.savedStates, { uuid: payload.uuid})
      const current = state.savedStates[index]

      SavedFields.forEach(field => {
        commit('setStateField', {
          value: JSON.parse(current.versions[payload.version][field]),
          field: field
        })
      })
    },

}
