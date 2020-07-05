<template>
  <transition name="left" appear>
    <div class="list-wrapper">
      <div class="header">
        <div class="title">{{title}}</div>
        <cube-button :inline="true" class="btn" @click="addRecord">新增阵容</cube-button>
      </div>
      <transition name="fade">
        <cube-scroll class="scroll" :options="options" ref="scroll" v-if="!listEmpty" :data="list">
          <template v-for="(card, index) in list">
            <card :key="index" @refresh="refresh">
              <div class="rage" v-if="card.rage">狂暴</div>
              <div class="img">
                <div class="item" v-for="item in card.data" :key="item.name">
                  <img :src="item.img" draggable="false">
                </div>
              </div>
              <div class="num">{{card.num ? card.num : '?'}}</div>
              <div slot="text">
                <div class="text">{{card.text && card.text.length >= 1 ? card.text : '那家伙啥都没写'}}<cube-button :inline="true" :outline="true" class="edit-btn" @click="editRecord(card)">编辑</cube-button></div>
              </div>
            </card>
          </template>
        </cube-scroll>
      </transition>
      <transition name="fade">
        <div v-if="listEmpty" class="empty">无数据</div>
      </transition>
      <cube-loading :size="40" class="empty" v-if="!showList"></cube-loading>
    </div>
  </transition>
</template>

<script>
import Card from '../components/common/Card'
import { getRecord } from '../api/store.js'

export default {
  components: {
    Card
  },
  data () {
    return {
      options: {
        bounce: true,
        mouseWheel: true
      },
      list: [],
      showList: false,
      listEmpty: false
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
    refresh () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 210)
    },
    addRecord () {
      this.$router.push(`/edit?&king=${this.$route.query.king}&round=${this.$route.query.round}`)
    },
    editRecord (data) {
      this.$router.push({
        path: '/edit',
        name: 'Edit',
        query: {
          king: this.$route.query.king,
          round: this.$route.query.round
        },
        params: data
      })
    }
  },
  created () {
    if (!this.$route.query.king && !this.$route.query.round) {
      this.$router.push('/')
    } else {
      getRecord({
        king: this.$route.query.king,
        round: this.$route.query.round
      })
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.list = res.data
          } else {
            this.listEmpty = true
          }
          this.showList = true
        })
        .catch((err) => {
          console.log(err)
          this.$createToast({
            type: 'error',
            txt: '未知错误'
          }).show()
          this.showList = true
          this.listEmpty = true
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .header
    width 100%
    height 40px
    .title
      text-align center
      position fixed
      width 100%
      height 40px
      line-height 40px
    .btn
      position fixed
      right 0
      margin 5px
      font-weight 100
  .scroll
    height calc(100vh - 40px)
    .rage
      text-align center
      margin 5px
      color #DC143C
    .img
      display flex
      .item
        width 20%
        img
          width 100%
    .num
      text-align center
      margin 5px
    .text
      white-space pre-wrap
      word-wrap break-word
      padding 5px 5px 10px 5px
      .edit-btn
        float right
        clear both
        align center
  .empty
    position fixed
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)
</style>
