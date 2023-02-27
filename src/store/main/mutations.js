import Vue from 'vue';
import _ from 'lodash'

export default {
  setConfig: (state, config) => {
    Vue.set(state, 'config', config)
  },

  //Slot Mutations
  addRow: (state, row) => {
    state.rows.push(row)
  },
  deleteRow: (state, rid) => {
    state.rows = state.rows.filter((row) => {
      return row.rid !== rid
    })
    state.columns = state.columns.filter((column) => {
      return column.rid !== rid
    })
    state.slots = state.slots.filter((slot) => {
      return slot.rid !== rid
    })
  },
  deleteRows: (state, arr) => {
    arr.forEach((rid) => {
      state.rows = state.rows.filter((row) => {
        return row.rid !== rid
      })
      state.columns = state.columns.filter((column) => {
        return column.rid !== rid
      })
      state.slots = state.slots.filter((slot) => {
        return slot.rid !== rid
      })
    })

  },
  addColumn: (state, column) => {
    state.columns.push(column)
  },
  deleteColumn: (state, colid) => {
    state.columns = state.columns.filter((column) => {
      return column.colid !== colid
    })

    state.slots = state.slots.filter((slot) => {
      return slot.colid !== colid
    })
  },
  addSlot: (state, slot) => {
    state.slots.push(slot)
  },
  deleteSlot: (state, sid) => {
    state.slots = state.slots.filter((slot) => {
      return slot.sid !== sid
    })
  },
  updateSlotData: (state, slot) => {
    let item = slot.item || slot
    const actualSlot = _.findIndex(state.slots, {
      'sid': item.sid,
      'rid': item.rid,
      'cid': item.cid,
      'colid': item.colid,
    })
    Vue.set(state.slots[actualSlot], 'data', slot.data)
  },
  setSlotStyles: (state, payload) => {
    const actualSlot = _.findIndex(state.slots, {
      'sid': payload.slot.sid,
      'rid': payload.slot.rid,
      'cid': payload.slot.cid,
      'colid': payload.slot.colid,
    })
    Vue.set(state.slots[actualSlot], 'styles', payload.styles)
  },
  setSlotClasses: (state, payload) => {
    const actualSlot = _.findIndex(state.slots, {
      'sid': payload.slot.sid,
      'rid': payload.slot.rid,
      'cid': payload.slot.cid,
      'colid': payload.slot.colid,
    })
    Vue.set(state.slots[actualSlot], 'classes', payload.classes)
  },
  setSlotGetter: (state, payload) => {
    const actualSlot = _.findIndex(state.slots, {
      'sid': payload.slot.sid,
      'rid': payload.slot.rid,
      'cid': payload.slot.cid,
      'colid': payload.slot.colid,
    })
    Vue.set(state.slots[actualSlot], 'getter', payload.getter)
  },

  // User Mutations
  addProf: (state, prof) => {
    state.info.profs.push(prof)
  },
  deleteProf: (state, prof) => {
    state.info.profs = state.info.profs.filter((user) => {
      return user.id !== prof.id
    })
  },
  addStudent: (state, student) => {
    state.info.students.push(student)
  },
  deleteStudent: (state, student) => {
    state.info.students = state.info.students.filter((user) => {
      return user.id !== student.id
    })
  },
  addTA: (state, ta) => {
    state.info.tas.push(ta)
  },
  deleteTA: (state, ta) => {
    state.info.tas = state.info.tas.filter((user) => {
      return user.id !== ta.id
    })
  },
  updateUser: (state, { user, prop, value }) => {
    Vue.set(user, prop, value)
  },
  clearStudents: (state) => {
    state.info.students = []
  },

  //Week Mutations
  addWeek: (state, week) => {
    state.weeks.push(week)
  },
  deleteWeek: (state, week) => {
    state.weeks = state.weeks.filter((item) => {
      return item.id !== week.id
    })

    console.log(state.weeks)
  },
  updateWeek: (state, { index, prop, value }) => {
    Vue.set(state.weeks[index], prop, value)
  },
  sliceWeek: (state, num) => {
    state.weeks = state.weeks.slice(0, num)
  },
  updateWeeks: (state, payload) => {
    state.weeks = payload
  },

  //Week Element Mutations
  addVideo: (state, {video, index}) => {
    state.weeks[index].videos.push(video)
  },

  addCase: (state, { index, caseStudy }) => {
    state.weeks[index].cases.push(caseStudy)
  },

  removeCase: (state, {index, caseStudy}) => {
    state.weeks[index].cases = state.weeks[index].cases.filter((item) => {
      return item.id !== caseStudy.id
    })
  },

  addAssignment: (state, { assignment, index }) => {
    state.weeks[index].assignments.push(assignment)
  },

  addQuiz: (state, { quiz, index }) => {
    state.weeks[index].quizes.push(quiz)
  },

  addDiscussion: (state, {discussion, index}) => {
    state.weeks[index].discussions.push(discussion)
  },

  //Page Mutations
  setDialogVisibility: (state, visibility) => {
    state.dialogVisible = visibility
  },
  setDialogData: (state, data) => {
    state.dialogData = data
  },
  setPageData: (state, page) => {
    state.pagesSet.push(page)
  },

  //Info Mutations
  updateInfo: (state, payload) => {
    state.info = payload
  },
  updateSpecificInfo: (state, payload) => {
    Vue.set(state.info, payload.key, payload.value)
  },
  updateProp: (state, { prop, value }) => {
    Vue.set(state.info, prop, value)
  },
  updateStore: (state, payload) => {
    state = payload
  },
  updateLoading: (state, payload) => {
    state.loading = payload
  },

  refreshStore: (state) => {
    state = state
  },
  setSettingsVisibility: (state, visibility) => {
    state.settingsVisible = visibility
  },
  addSavedState: (state, newState) => {
    state.savedStates.push(newState)
  },
  setSavedState: (state, payload) => {
    Vue.set(state.savedStates, payload.index, payload.current)
  },
  setSavedStateVersion: (state, payload) => {
    Vue.set(state.savedStates[payload.index], 'version', payload.version)
  },
  addNewVersion: (state, payload) => {
    state.savedStates[payload.index].versions.push(payload.latest)
  },
  setCurrentCourse: (state, uuid) => {
    state.currentCourse = uuid
  },
  setCurrentVersion: (state, version) => {
    state.currentVersion = version
  },
  setInfoField: (state, payload) => {
    Vue.set(state.info, payload.field, payload.value)
  },
  setStateField: (state, payload) => {
    Vue.set(state, payload.field, payload.value)
  },
  setStateFieldWithBase: (state, payload) => {
    Vue.set(payload.base, payload.field, payload.value)
  },
  updateRowTypes: (state, payload) => {
    state.rowTypes = payload
  },
  updateColTypes: (state, payload) => {
    state.colTypes = payload
  },
  updateSlotTypes: (state, payload) => {
    state.slotTypes = payload
  },
  changeDndMode: (state, mode) => {
    state.dndMode = mode
  },
  setDraggingRow: (state, mode) => {
    state.draggingRow = mode
  },
  setDraggedRow: (state, row) => {
    state.draggedRow = row
  },
  changeRowSort: (state, payload) => {
    Vue.set(payload.row, 'sort', payload.sort)
  },
  changeColumnSort: (state, payload) => {
    Vue.set(payload.column, 'sort', payload.sort)
  },
  setDragType: (state, type) => {
    state.dragType = type
  },
  updateState: (state, data) => {
    for (var prop in data) {
      Vue.set(state, prop, data[prop])
    }
  },
  setRenderedComponents: (state, value) => {
    state.componentsRendered = value
  },
  setDefaultState: (state) => {
    state.defaultState = _.cloneDeep(state)
  },
  deleteCourseVersion: (state, payload) => {
    state.savedStates[payload.course].versions.splice(payload.version, 1)
  },
  deleteCourse: (state, index) => {
    state.savedStates.splice(index, 1)
  },
}
