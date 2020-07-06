<template>
  <transition name="first-fade" appear>
    <div id="app">
      <router-view/>
    </div>
  </transition>
</template>

<script>

/* eslint-disable no-undef */
export default {
  computed: {
    firstStart () {
      if (sessionStorage.getItem('first')) {
        return ''
      } else {
        return 'fade'
      }
    }
  },
  methods: {
    plusReady () {
      // Android处理返回键
      plus.key.addEventListener('backbutton', () => {
        if (this.$route.path === '/') {
          this.$createDialog({
            type: 'confirm',
            title: '确定退出？',
            maskClosable: true,
            confirmBtn: {
              text: '是',
              active: true,
              disabled: false
            },
            cancelBtn: {
              text: '否',
              active: false,
              disabled: false
            },
            onConfirm: () => {
              plus.runtime.quit()
            }
          }).show()
        } else {
          this.$router.push('/')
        }
      }, false)
    }
  },
  created () {
    if (window.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
  }
}
</script>

<style lang="stylus">
::-webkit-scrollbar
  width 7px
  height 7px
  background-color #F5F5F5
::-webkit-scrollbar-track
  box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)
  -webkit-box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)
  background-color #F5F5F5
::-webkit-scrollbar-thumb
  box-shadow inset 0 0 6px rgba(0, 0, 0, .1)
  -webkit-box-shadow inset 0 0 6px rgba(0, 0, 0, .1)
  background-color #bbb
::-webkit-scrollbar-thumb:active
  background-color #999

body
  background #EBEEF5
  max-width 500px
  height 100vh
  margin auto
  border-left 1px solid #ddd
  border-right 1px solid #ddd
#app
  width 100%
  height 100%
  transform: scale3d(1, 1, 1)
</style>
