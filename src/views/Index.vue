<template>
  <transition name="right" appear>
    <div class="index-wrapper">
      <div class="label-wrapper">
        <cube-checker v-model="selected1" :options="list1" type="radio" class="checker1" />
        <cube-checker v-model="selected2" :options="list2" type="radio" class="checker2" />
      </div>
      <div class="btn-wrapper">
        <cube-button class="btn" :light="true" :outline="true" @click="select">查询</cube-button>
        <cube-button class="btn" :light="true" :outline="true" @click="commit">提交</cube-button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      selected1: null,
      selected2: null,
      list1: [
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
      list2: [
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
  methods: {
    select () {
      if (this.selected1 !== null && this.selected2 !== null) {
        this.$router.push(`/list?&king=${this.selected1}&round=${this.selected2}`)
      }
    },
    commit () {
      if (this.selected1 !== null && this.selected2 !== null) {
        this.$router.push(`/edit?&king=${this.selected1}&round=${this.selected2}`)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.index-wrapper
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
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
    .checker1
      font-size 1.2rem
      display flex
      margin 10px auto
    .checker2
      font-size 1.2rem
      display flex
      margin 10px auto
  .btn-wrapper
    position fixed
    bottom 50px
    left 50%
    width 100%
    transform translate3d(-50%, -50%, 0)
    .btn
      margin 10px auto
      width 150px
</style>
