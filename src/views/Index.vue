<template>
  <transition name="right" appear>
    <div class="index-wrapper">
      <cube-button :inline="true" class="login-btn" @click="login">{{isLogin ? user : 'Login'}}</cube-button>
      <div class="label-wrapper">
        <template v-for="king in kingList">
          <div :key="king.text" class="line">
            <div class="title">{{king.text}}</div>
            <template v-for="round in roundList">
              <cube-button :key="round.text" class="btn" :light="true" :outline="true" :inline="true" @click="select(king.value, round.value)">{{round.text}}<div class="num" v-if="total[king.value] && total[king.value][round.value] > 0">{{total[king.value][round.value]}}</div></cube-button>
            </template>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import { getTotal } from '../api/store.js'

export default {
  data () {
    return {
      total: {},
      kingList: [
        {
          text: '一王',
          value: 1
        },
        {
          text: '二王',
          value: 2
        },
        {
          text: '三王',
          value: 3
        },
        {
          text: '四王',
          value: 4
        },
        {
          text: '五王',
          value: 5
        }
      ],
      roundList: [
        {
          text: '一阶段',
          value: 1
        },
        {
          text: '二阶段',
          value: 2
        }
      ]
    }
  },
  computed: {
    isLogin () {
      return localStorage.getItem('user')
    },
    user () {
      const temp = this.isLogin
      if (temp) {
        if (temp !== 'null') {
          return temp
        } else {
          return '匿名大佬'
        }
      } else {
        return null
      }
    }
  },
  methods: {
    select (king, round) {
      this.$router.push(`/list?&king=${king}&round=${round}`)
    },
    login () {
      if (this.isLogin) {
        localStorage.removeItem('user')
        this.$router.go(0)
      } else {
        this.$router.push('/login')
      }
    }
  },
  created () {
    getTotal()
      .then(res => {
        if (res.data) {
          this.total = res.data
        }
      })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.index-wrapper
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .login-btn
    position fixed
    right 10px
    top 10px
  .label-wrapper
    position fixed
    top 40%
    left 50%
    width 100%
    transform translate3d(-50%, -50%, 0)
    display flex
    flex-direction column
    align-items center
    justify-content center
    .line
      display flex
      align-items center
      justify-content center
      .title
        font-size 20px
        margin-right 10px
      .btn
        position relative
        margin 10px
        .num
          position absolute
          top -10px
          right -10px
          border-radius 50%
          background #666
          width 20px
          height 20px
          line-height 20px
          color #fff
          text-align center
          z-index 2
</style>
