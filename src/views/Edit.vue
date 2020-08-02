<template>
  <transition name="right" appear>
    <div class="edit-wrapper">
      <div class="header">
        <i class="cubeic-back icon" @click="back"></i>
        <div class="title">{{title}}</div>
        <div class="header-input">
          <cube-input v-model="author" :maxlength="10" class="input">
            <div slot="prepend" style="margin-left: 10px">你谁:</div>
          </cube-input>
          <cube-input v-model="num" type="number" class="input">
            <div slot="prepend" style="margin-left: 10px">伤害:</div>
          </cube-input>
          <cube-switch class="switch" v-model="rage">{{rage ? '狂暴' : '正常'}}</cube-switch>
        </div>
        <div class="pick-card">
          <card>
            <div class="pick" @click.stop>
              <div v-for="i in 5" :key="i" class="pick-img">
                <img draggable="false" :src="selectList[i - 1] ? selectList[i - 1].img : require('../assets/img/unknown.jpg')" style="width: 100%" @click="remove(selectList[i - 1])">
                <cube-rate class="rate" :value="selectList[i - 1] ? selectList[i - 1].rate : null" :disabled="selectList[i - 1] ? false : true" @input="changeStar(i - 1, $event)"></cube-rate>
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
                <img draggable="false" :src="name.img" style="width: 100%" @click="imgClick({...name, rate: null})" :style="{'filter': isSelect (name.name) ? 'grayscale(100%)' : 'none'}">
              </div>
            </div>
          </div>
        </card>
      </template>
      <cube-textarea class="textarea" v-model="text" :maxlength="9999" :indicator="{ negative: true, remain: false}" placeholder="东西写这" :autoExpand="true"></cube-textarea>
      <cube-button :outline="true" class="btn" @click="commit">{{id ? '修改' : '提交'}}</cube-button>
      <cube-button class="btn del-btn" v-if="id" @click="del">删除</cube-button>
    </div>
  </transition>
</template>

<script>
import Card from '../components/common/Card'
import { addRecord, editRecord, hideRecord } from '../api/store.js'

export default {
  components: {
    Card
  },
  data () {
    return {
      list: [],
      selectList: [],
      author: null,
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
    changeStar (index, num) {
      this.selectList[index].rate = num
    },
    back () {
      this.$router.push(`/list?&king=${this.$route.query.king}&round=${this.$route.query.round}`)
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
          author: this.author,
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
          .catch(() => {
            this.$createToast({
              type: 'error',
              txt: '未知错误'
            }).show()
          })
      } else {
        addRecord({
          author: this.author,
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
              }, 800)
            }
          })
          .catch(() => {
            this.$createToast({
              type: 'error',
              txt: '未知错误'
            }).show()
          })
      }
    },
    del () {
      this.dialog = this.$createDialog({
        type: 'confirm',
        title: '确定要删除吗？',
        maskClosable: true,
        confirmBtn: {
          text: '是',
          active: false,
          disabled: false
        },
        cancelBtn: {
          text: '否',
          active: true,
          disabled: false
        },
        onConfirm: () => {
          this.$createToast({
            txt: '提交中',
            time: 0,
            mask: true
          }).show()
          hideRecord(this.id)
            .then(res => {
              if (res.data.code === 0) {
                this.$createToast({
                  type: 'correct',
                  txt: '删除成功'
                }).show()
                setTimeout(() => {
                  this.$router.push(`/list?&king=${this.$route.query.king}&round=${this.$route.query.round}`)
                }, 800)
              }
            })
            .catch(() => {
              this.$createToast({
                type: 'error',
                txt: '未知错误'
              }).show()
            })
        }
      }).show()
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
    const user = localStorage.getItem('user')
    if (!user) {
      this.$router.go(-1)
      return
    }
    this.list = data
    if (this.$route.params.id) {
      const data = this.$route.params
      data.data.forEach(item => {
        this.imgClick({ ...item, rate: null })
      })
      this.author = data.author
      this.num = data.num
      this.text = data.text
      this.id = data.id
      this.rage = Boolean(data.rage)
    } else {
      if (user !== 'null') {
        this.author = user
      }
    }
  },
  watch: {
    selectList () {
      console.log(this.selectList)
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
    z-index 1
    .icon
      position fixed
      left 0
      height 40px
      width 40px
      line-height 40px
      z-index 3
      text-align center
      cursor pointer
      animation icon-shake 4s linear infinite
    .title
      line-height 30px
      text-align center
      display block
    .header-input
      display flex
      .input
        margin 0 5px
        flex 1
      .switch
        margin 0 15px 0 5px
    .pick-card
      margin 10px 0
      .pick
        display flex
        .pick-img
          flex 0 0 20%
          width 20%
          height 100%
          .rate
            width 96%
            padding 2px 2%
            & >>> .cube-rate-item
              margin 0
            & >>> .cube-rate-item_active
              .cube-rate-item-def
                background url('~@/assets/img/star.png')
                background-size 100% 100%
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
    height 150px !important
  .btn
    width 95%
    margin 20px auto
  .del-btn
    background #CC0033
</style>
