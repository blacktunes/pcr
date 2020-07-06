<template>
  <transition name="right" appear>
    <div class="edit-wrapper">
      <div class="header">
        <i class="cubeic-back icon" @click="back"></i>
        <div class="title">{{title}}</div>
        <div class="header-input">
          <cube-input v-model="num" type="number" class="input">
            <div slot="prepend" style="margin-left: 10px">伤害:</div>
          </cube-input>
          <cube-switch class="switch" v-model="rage">{{rage ? '狂暴' : '正常'}}</cube-switch>
        </div>
        <div class="pick-card">
          <card>
            <div class="pick" @click.stop>
              <div v-for="i in 5" :key="i">
                <img draggable="false" :src="selectList[i - 1] ? selectList[i - 1].img : require('../assets/img/unknown.jpg')" style="width: 100%" @click="remove(selectList[i - 1])">
              </div>
            </div>
          </card>
        </div>
      </div>
      <template v-for="(item, index) in list">
        <card :key="index">
          <div class="title">
            <img draggable="false" :src="require(`../assets/img/${item.icon}.png`)" style="height: 80%;margin-left: 5px">
            <span class="text">{{item.type}}</span>
          </div>
          <div slot="text">
            <div class="img-wrapper">
              <div v-for="name in item.list" :key="name.name" class="img">
                <img draggable="false" :src="name.img" style="width: 100%" @click="imgClick(name)" :style="{'filter': isSelect (name.name) ? 'grayscale(100%)' : 'none'}">
              </div>
            </div>
          </div>
        </card>
      </template>
      <cube-textarea class="textarea" v-model="text" :maxlength="9999" :indicator="{ negative: true, remain: false}" placeholder="东西写这" :autoExpand="true"></cube-textarea>
      <cube-button :outline="true" class="btn" @click="commit">{{id ? '修改' : '提交'}}</cube-button>
    </div>
  </transition>
</template>

<script>
import Card from '../components/common/Card'
import { addRecord, editRecord } from '../api/store.js'

export default {
  components: {
    Card
  },
  data () {
    return {
      list: [],
      selectList: [],
      num: null,
      rage: false,
      text: '',
      id: null
    }
  },
  computed: {
    title () {
      let king = ''
      let round = ''
      switch (Number(this.$route.query.king)) {
        case 1:
          king = '一王'
          break
        case 2:
          king = '二王'
          break
        case 3:
          king = '三王'
          break
        case 4:
          king = '四王'
          break
        case 5:
          king = '五王'
          break
        default:
          king = '?王'
      }
      switch (Number(this.$route.query.round)) {
        case 1:
          round = '一阶段'
          break
        case 2:
          round = '二阶段'
          break
        default:
          round = '?阶段'
      }
      return `${king}(${round})`
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    imgClick (name) {
      if (this.isSelect(name.name)) {
        this.removeItem(name.name)
      } else if (this.selectList.length < 5) {
        this.selectList.push(name)
      }
    },
    remove (name) {
      if (name) {
        this.removeItem(name.name)
      }
    },
    commit () {
      if (this.selectList.length < 5) {
        return
      }
      this.$createToast({
        txt: '提交中',
        time: 0,
        mask: true
      }).show()
      if (this.id) {
        editRecord({
          id: this.id,
          num: this.num,
          data: JSON.stringify(this.selectList),
          text: this.text,
          rage: this.rage
        })
          .then(res => {
            if (res.data.code === 0) {
              this.$createToast({
                type: 'correct',
                txt: '修改成功'
              }).show()
              setTimeout(() => {
                this.$router.push(`/list?&king=${this.$route.query.king}&round=${this.$route.query.round}`)
              }, 1000)
            }
          })
          .catch((err) => {
            console.error(err)
            this.$createToast({
              type: 'error',
              txt: '未知错误'
            }).show()
          })
      } else {
        addRecord({
          num: this.num,
          data: JSON.stringify(this.selectList),
          text: this.text,
          king: this.$route.query.king,
          round: this.$route.query.round,
          rage: this.rage
        })
          .then(res => {
            if (res.data.code === 0) {
              this.$createToast({
                type: 'correct',
                txt: '提交成功'
              }).show()
              setTimeout(() => {
                this.$router.push(`/list?&king=${this.$route.query.king}&round=${this.$route.query.round}`)
              }, 1000)
            }
          })
          .catch((err) => {
            console.error(err)
            this.$createToast({
              type: 'error',
              txt: '未知错误'
            }).show()
          })
      }
    },
    removeItem (name) {
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].name === name) {
          this.selectList.splice(i, 1)
          break
        }
      }
    },
    isSelect (name) {
      return this.selectList.some(item => {
        return item.name === name
      })
    }
  },
  created () {
    this.list = data
    if (this.$route.params.id) {
      console.log(this.$route.params)
      const data = this.$route.params
      this.num = data.num
      this.selectList = data.data
      this.text = data.text
      this.id = data.id
      this.rage = Boolean(data.rage)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.edit-wrapper
  overflow-y auto
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .loading
    position fixed
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)
  .header
    position sticky
    top 0
    background #EBEEF5
    padding-top 10px
    z-index 1
    .icon
      position fixed
      left 0
      height 40px
      width 40px
      line-height 40px
      z-index 3
      cursor pointer
      animation icon-shake 4s linear infinite
    .title
      text-align center
      display block
    .header-input
      display flex
      .input
        margin 0 15px 0 5px
        flex 1
      .switch
        margin-right 15px
    .pick-card
      margin 10px 0
      .pick
        display flex
        div
          flex 0 0 20%
  .title
    display flex
    align-items center
    padding 5px
    height 30px
    .text
      margin-left 10px
  .img-wrapper
    display flex
    flex-wrap wrap
    .img
      flex 0 0 20%
  .textarea
    margin 10px 5px
  >>> .cube-textarea_expanded
    height 200px !important
  .btn
    width 95%
    margin 20px auto
</style>
