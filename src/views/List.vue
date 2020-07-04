<template>
  <transition name="left" appear>
    <div>
      <cube-scroll class="scroll" :options="options" ref="scroll" v-if="dataEmpty">
        <card>
          <div class="img">
            <div class="item" v-for="item in list.data" :key="item.name">
              <img :src="item.img">
            </div>
          </div>
          <div class="num">{{list.num ? list.num : '?'}}</div>
          <div slot="text" v-html="list.text && list.text.length > 1 ? list.text : '那家伙啥都没写'"></div>
        </card>
      </cube-scroll>
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
        bounce: false,
        mouseWheel: true
      },
      list: {},
      showList: false,
      listEmpty: false
    }
  },
  computed: {
    dataEmpty () {
      if (this.list.data) {
        return true
      } else {
        return false
      }
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
          if (res.data && res.data.data.length > 0) {
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
.scroll
  height 100vh
  .img
    display flex
    .item
      width 20%
      img
        width 100%
  .num
    text-align center
    margin 5px
.empty
  position fixed
  top 50vh
  left 50vw
  transform translate3d(-50%, -50%, 0)
</style>
