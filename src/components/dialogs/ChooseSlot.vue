<template>
  <div class="dialog-inner">

    <el-tabs type="border-card">
      <el-tab-pane :label="pageTitle.toUpperCase() + ' SLOTS'">
        <div class="slot">
          <el-col v-for="slot in pageSlotTypes" :key="slot.id" :span="6" class="slot-item">
            <el-popover
              placement="top"
              title="Slot Preview"
              width="400"
              trigger="click">
              <img :src="imageServer + 'preview-images/slots/' + slot.type + '.png'" alt="">
              <div v-if="isPageType(slot)" class="slot-content"
                    :class="{ selected: slot.id === selectedSlot }"
                    @click="selectedSlot = slot.id" slot="reference">
                <div class="slot-icon">
                  <i :class="'el-icon-' + slot.icon"></i>
                </div>
                <div class="slot-title">{{ slot.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="OTHER SLOTS" v-if="false">
        <div class="slot">
          <el-col v-for="slot in otherSlotTypes" :key="slot.id" :span="6" class="slot-item">
            <el-popover
              placement="top"
              title="Slot Preview"
              width="400"
              trigger="click">
              <img :src="imageServer + 'preview-images/slots/' + slot.type + '.png'" alt="">
              <div v-if="isPageType(slot)" class="slot-content"
                    :class="{ selected: slot.id === selectedSlot }"
                    @click="selectedSlot = slot.id" slot="reference">
                <div class="slot-icon">
                  <i :class="'el-icon-' + slot.icon"></i>
                </div>
                <div class="slot-title">{{ slot.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="All SLOTS" v-if="false">
        <div class="slot">
          <el-col v-for="slot in SlotTypes" :key="slot.id" :span="6" class="slot-item">
            <el-popover
              placement="top"
              title="Slot Preview"
              width="400"
              trigger="click">
              <img :src="imageServer + 'preview-images/slots/' + slot.type + '.png'" alt="">
              <div v-if="isPageType(slot)" class="slot-content"
                    :class="{ selected: slot.id === selectedSlot }"
                    @click="selectedSlot = slot.id" slot="reference">
                <div class="slot-icon">
                  <i :class="'el-icon-' + slot.icon"></i>
                </div>
                <div class="slot-title">{{ slot.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>




    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

import slotTypes from '../../util/slot-types.js'

export default {
  props: [
    'dialogData'
  ],
  name: 'ChooseSlot',
  mixins: [slotTypes],  
  data() {
    return {
      selectedSlot: 1
    }
  },
  computed:{
    ...mapGetters({
      fullSlotTypes: 'getSlotTypes',
      Config: 'getConfig',
      imageServer: 'getImageServer'      
    }),
    SlotTypes(){
      if (this.Config.slots.visible == '*'){
        return _.pickBy(this.fullSlotTypes, (slot, key) => {
          return !_.includes(this.Config.slots.hidden, slot.type)
        })
      }
      else {
        return _.pickBy(this.fullSlotTypes, (slot, key) => {
          return _.includes(this.Config.slots.visible, slot.type)
        })
      }      
    },
    pageSlotTypes(){
      return _.pickBy(this.SlotTypes, (slot, key) => {
        return this.isPageType(slot)
      })
    },
    otherSlotTypes(){
      return _.pickBy(this.SlotTypes, (slot, key) => {
        return !this.isPageType(slot)
      })
    },
    pageTitle(){
      let pageTitle = this.dialogData.cid
      if (this.dialogData.cid.includes('activity-')) pageTitle = 'activity'
      return pageTitle
    }   

  },
  methods: {
    saveChoice() {
      const actualSlotType = this.findSlot('id', this.selectedSlot)

      
      if(this.dialogData.action == 'new'){
       this.$store.dispatch('addRow', {
          cid: this.dialogData.cid,
        }).then( newRow => {
          this.$store.dispatch('addColumn', {
            cid: this.dialogData.cid,
            rid: newRow.rid
          }).then( newCol => {
            this.$store.dispatch('addSlot', {
              getter: actualSlotType.getter,
              type: this.selectedSlot,
              rid: newRow.rid,
              cid: this.dialogData.cid,
              colid: newCol.colid,
              data: actualSlotType.defaultData,
              classes: actualSlotType.classes,
              styles: actualSlotType.styles
            })
          })
        })
        this.$store.dispatch("setDialogVisibility", false)
        return
      }
      else {
        this.$store.dispatch('addSlot', {
            getter: actualSlotType.getter,
            type: this.selectedSlot,
            rid: this.dialogData.rid,
            cid: this.dialogData.cid,
            colid: this.dialogData.colid,
            data: actualSlotType.defaultData,
            classes: actualSlotType.classes,
            styles: actualSlotType.styles
          })
          this.$store.dispatch("setDialogVisibility", false)
        }
      },
    isPageType(slot){
      return _.includes(slot.pages, this.pageTitle) || slot.pages == "*"
    }    
  }
}
</script>

<style lang="scss" scoped>

.slot-item {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;

  .slot-content {
    transition: all 0.43s;
    padding: 12px 0;
    border: 1px solid #CCC;
    cursor: pointer;

    .slot-icon {
      font-size: 32px;
    }

    .slot-title {
      font-size: 14px;
    }

    &:hover {
      background-color: #EEE;
    }

    &.selected {
      background: #FFF;
      border-color: #20a0ff;
      color: #20a0ff;
      cursor: default;
    }

    &.disabled {
      background-color: #CCC;
      cursor: not-allowed;
      border-color: #999;
      opacity: .52;
    }
  }
}
footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
