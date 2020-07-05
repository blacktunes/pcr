<template>
  <div class="card-wrapper" :style="{'background': show ? '#eee' : ''}">
    <div class="card-header" @click="click">
      <slot></slot>
    </div>
    <div class="card-text" ref="text">
      <div class="text">
        <slot name="text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    click () {
      if (this.show) {
        this.$refs.text.style.transition = 'max-height 0.15s ease-out'
        this.$refs.text.style.maxHeight = '0px'
      } else {
        this.$refs.text.style.transition = 'max-height 0.2s ease-in'
        this.$refs.text.style.maxHeight = '500px'
      }
      this.show = !this.show
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.card-wrapper
  margin 5px
  border-radius 4px
  border 1px solid #EBEEF5
  background-color #FFF
  overflow hidden
  color #303133
  transition box-shadow 0.25s, background 0.5s
  border 1px solid #bbb
  &:active
    background #eee
    box-shadow 2px 2px 5px rgba(0, 0, 0, 0.1)
  .card-header
    border-bottom 1px solid #ddd
    padding 5px
  .card-text
    transition max-height 0.5s ease-in
    max-height 0
    overflow hidden
    .text
      padding 5px 10px
      line-height 26px
</style>
