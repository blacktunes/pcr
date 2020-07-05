<template>
  <transition name="right" appear>
    <div class="index-wrapper">
      <div class="label-wrapper">
        <template v-for="king in kingList">
          <div :key="king.text" class="line">
            <div class="title">{{king.text}}</div>
            <template v-for="round in roundList">
              <cube-button :key="round.text" class="btn" :light="true" :outline="true" :inline="true" @click="select(king.value, round.value)">{{round.text}}</cube-button>
            </template>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
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
  methods: {
    select (king, round) {
      this.$router.push(`/list?&king=${king}&round=${round}`)
    }
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
        margin 10px
</style>
