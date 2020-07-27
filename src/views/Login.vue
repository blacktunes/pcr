<template>
  <transition name="left" appear>
    <div class="login-wrapper">
      <i class="cubeic-back icon" @click="back"></i>
      <div class="label-wrapper">
        <div>用户名</div>
        <cube-input v-model="user" class="input"></cube-input>
        <div>密码</div>
        <cube-input v-model="password" class="input" type="password" :eye="{open: false, reverse: false}"></cube-input>
        <cube-button style="margin-top: 20px" :outline="true" @click="login">登录</cube-button>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import { sha3_256 } from 'js-sha3'

export default {
  data () {
    return {
      user: null,
      password: null
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    login () {
      if (!this.password) {
        return
      }
      if (sha3_256(this.password) === 'b533531be6f21f286f2a57894bd172b54b6c936bb609da1cab774a65b0720d0a') {
        localStorage.setItem('user', this.user)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-wrapper
  position fixed
  top 0
  left 0
  width 100%
  height 100%
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
  .label-wrapper
    position fixed
    top 40%
    left 50%
    width 50%
    transform translate3d(-50%, -50%, 0)
    display flex
    flex-direction column
    align-items center
    justify-content center
    .input
      width 100%
      margin 10px 0
</style>
