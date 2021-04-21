
import _ from 'lodash'
import defaults from '../components/defaults'

export default {

  //DEFAULTS AND THEME ALSO INJECTED HERE THROUGH MODULES
  defaultState: null,

  //GENERAL COURSE INFO
  info: _.cloneDeep(defaults.state.infoDefault),

  // Where the weeks are stored
  weeks: [],
  modules: [],

  // UTILS
  loading: false,
  settingsFormVisible: false,
  prevPage: "/home",
  nextPage: "/weekly",
  imageServer: "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/",
  rows: [],
  slots: [],
  columns: [],
  dialogVisible: false,
  settingsVisible: false,
  dialogData: {
    title: 'Choose Slot Type',
    type: 'choose-slot'
  },
  selectedWeekID: "",
  editingFields: [],
  pagesSet: [],
  savedStates: [],
  currentCourse: null,
  currentVersion: null,
  rowTypes: {},
  colTypes: {},
  slotTypes: {},
  config: null,
  dndMode: false,
  draggingRow: false,
  draggedRow: {},
  draggingColumn: false,
  draggedColumn: {},
  draggingSlot: false,
  draggedSlot: {},
  dragType: 'rows',
  componentsRendered: false,
}
