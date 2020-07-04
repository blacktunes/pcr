<template>
  <transition name="left" appear>
    <div class="edit-wrapper">
      <div class="header">
        <cube-input v-model="num" type="number" class="input">
          <div slot="prepend" style="margin-left: 10px">伤害:</div>
        </cube-input>
        <div class="pick-card">
          <card>
            <div class="pick" @click.stop>
              <div v-for="i in 5" :key="i">
                <img :src="selectList[i - 1] ? selectList[i - 1].img : require('../assets/img/unknown.jpg')" style="width: 100%" @click="remove(selectList[i - 1])">
              </div>
            </div>
          </card>
        </div>
      </div>
      <template v-for="(item, index) in list">
        <card :key="index">
          <div class="title">
            <img :src="require(`../assets/img/${item.icon}.png`)" style="height: 80%;margin-left: 5px">
            <span class="text">{{item.type}}</span>
          </div>
          <div slot="text">
            <div class="img-wrapper">
              <div v-for="name in item.list" :key="name.name" class="img">
                <img :src="name.img" style="width: 100%" @click="imgClick(name)" :style="{'filter': isSelect (name.name) ? 'grayscale(100%)' : 'none'}">
              </div>
            </div>
          </div>
        </card>
      </template>
      <cube-textarea class="textarea" v-model="text" :maxlength="9999" :indicator="{ negative: true, remain: false}" placeholder="东西写这"></cube-textarea>
      <cube-button :outline="true" class="btn" @click="commit">提交</cube-button>
    </div>
  </transition>
</template>

<script>
import Card from '../components/common/Card'
import { addRecord } from '../api/store.js'

export default {
  components: {
    Card
  },
  data () {
    return {
      list: [
        {
          type: '前卫',
          icon: 'position_front',
          list: [
            {
              name: '莉玛',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/0/04/lo60ot9xodirhcikbgsp5ys5j1semxf.png/100px-Icon_unit_105231.png'
            },
            {
              name: '宫子',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/6/62/nu4e4h9eopdciqg2va9hf4c8fqjzq3q.png/100px-Icon_unit_100731.png'
            },
            {
              name: '空花',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/b/b5/672mvpqoxo64iv5t5dkr6vs31ko148k.png/100px-Icon_unit_104531.png'
            },
            {
              name: '纯',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/9/98/4qostpj00cvuozwjjl2po690k9iu994.png/100px-Icon_unit_104731.png'
            },
            {
              name: '香织',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/5/59/516euuhwnsfoqvolt8usv5z1jq0kfov.png/100px-Icon_unit_101731.png'
            },
            {
              name: '佩可莉姆',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/6/67/rpznjh1epytf8mbp0t1dq91svg9dcti.png/100px-Icon_unit_105831.png'
            },
            {
              name: '望',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/e/e3/ccy9fdczpyc94sfm20q7uucw6g0vm5j.png/100px-Icon_unit_102931.png'
            },
            {
              name: '真琴',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/2/27/ergoy0815kqjqqpqn3sa0yuz2be4pco.png/100px-Icon_unit_104331.png'
            },
            {
              name: '秋乃',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/a/a9/hj9uxkawbpguzfrpkrr6ymjwff6vmym.png/100px-Icon_unit_103231.png'
            },
            {
              name: '日和莉',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/3/37/264hu9xzlhbahpe8tzexwysq3g13x3n.png/100px-Icon_unit_100131.png'
            },
            {
              name: '未奏希',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/1/1d/biyc1gryppcb7c5tzdvqti6bmcyd55w.png/100px-Icon_unit_100431.png'
            },
            {
              name: '绫音',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/d/de/gx8trmx54y7ft24lq8k0gubg1ag6ree.png/100px-Icon_unit_102331.png'
            },
            {
              name: '珠希',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/3/39/dvomjvmcbbyliifd5hvb97mmqwtocjf.png/100px-Icon_unit_104631.png'
            },
            {
              name: '惠理子',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/4/49/md183zh8ewq7lupcmo9smuymjw749cm.png/100px-Icon_unit_102731.png'
            },
            {
              name: '胡桃',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/0/0f/nwn0d9rx7uo8zxbhxcrrx1s3v4ugkfc.png/100px-Icon_unit_102131.png'
            },
            {
              name: '姬塔',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/7/7f/j62dyqwinraqa1jhcey51t2xgpl3kkq.png/100px-Icon_unit_105731.png'
            },
            {
              name: '静流',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/0/00/0koylmjvym7s63y8xmz9skaa1xfuo0t.png/100px-Icon_unit_104931.png'
            },
            {
              name: '怜',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/3/33/gcfzk5nghr9krp81u4x59jsbpph41qr.png/100px-Icon_unit_100331.png'
            }
          ]
        },
        {
          type: '中卫',
          icon: 'position_middle',
          list: [
            {
              name: '美美',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/4/41/fwg0kohgsjgf76yxk3t7uleary1rho4.png/100px-Icon_unit_102031.png'
            },
            {
              name: '忍',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/e/e1/bh7jkgsmitpvxulkc6mc217pzge6jzx.png/100px-Icon_unit_103131.png'
            },
            {
              name: '真阳',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/2/2e/o6c9lsjthg36mzdt7cysolok3cv3pvm.png/100px-Icon_unit_103331.png'
            },
            {
              name: '由加莉',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/c/cd/mpjpf8q3fczqdn5stzx5epe7a1whb1n.png/100px-Icon_unit_103431.png'
            },
            {
              name: '莫妮卡',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/0/03/smxy5tsyd5t92fqk5onwy56hlvbobb1.png/100px-Icon_unit_105331.png'
            },
            {
              name: '妮侬',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/9/91/4h2e4w8p876oxtcu1xv2e9anb16od6s.png/100px-Icon_unit_103031.png'
            },
            {
              name: '美冬',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/c/ce/fbvjbat2po9fy580a3jyj0z2q4tmf2l.png/100px-Icon_unit_104831.png'
            },
            {
              name: '咲恋',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/8/8c/dy0rtln3fvhxkkqfxsnbnws61k8qqjh.png/100px-Icon_unit_102831.png'
            },
            {
              name: '杏奈',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/7/72/edy145bksvw972yhfpfgp8qbquhsi1j.png/100px-Icon_unit_100931.png'
            },
            {
              name: '可可萝',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/a/a4/mrwruc57npoamhw5y9ttd76s0l76xzd.png/100px-Icon_unit_105931.png'
            },
            {
              name: '铃',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/0/02/al8yiod9vehdtaov9pgs41uovntnkr2.png/100px-Icon_unit_102631.png'
            },
            {
              name: '深月',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/e/ed/mez3hg9iq9s5h6gor8ih6om9n9ln2za.png/100px-Icon_unit_105131.png'
            },
            {
              name: '茜里',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/1/14/8pn703o0duodmiyou1c565wjczj5b5o.png/100px-Icon_unit_100631.png'
            },
            {
              name: '依里',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/6/62/h81lrn1gzun78rl6l0354xauni9yqs0.png/100px-Icon_unit_102231.png'
            }
          ]
        },
        {
          type: '后卫',
          icon: 'position_back',
          list: [
            {
              name: '亚里莎',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/7/7c/9mlr4cmt1yol6qam0k5eetgqpoy9wao.png/100px-Icon_unit_106331.png'
            },
            {
              name: '璃乃',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/a/a5/jsara36yjh1e8kj1srxtkztghdhmljd.png/100px-Icon_unit_101131.png'
            },
            {
              name: '铃奈',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/e/e5/6d00c5yutzbikc8vnta72rjzppu5wvj.png/100px-Icon_unit_101631.png'
            },
            {
              name: '栞',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/0/05/exnyc4y1iuhrbjg3gxe7fncrj2mevmh.png/100px-Icon_unit_103831.png'
            },
            {
              name: '伊绪',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/8/82/a1pquxl61ls6ahhinzptb63tvadus03.png/100px-Icon_unit_101831.png'
            },
            {
              name: '铃莓',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/c/cc/gwnmpp3h76m69ewd0oqnl22gtmt6hje.png/100px-Icon_unit_102531.png'
            },
            {
              name: '美里',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/5/57/axnssn93k9c0g0a2prq0w42x9b3vsb8.png/100px-Icon_unit_101531.png'
            },
            {
              name: '凯露',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/3/39/lgcqculc5zh699k6f391kiwnwcn94me.png/100px-Icon_unit_106031.png'
            },
            {
              name: '初音',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/b/ba/e1q3ot9mhbtqh7nsgpnc5bp39idld6s.png/100px-Icon_unit_101231.png'
            },
            {
              name: '美咲',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/6/69/1295ipvt0ha6zly43nr690rj7qsl4py.png/100px-Icon_unit_105031.png'
            },
            {
              name: '碧',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/2/28/dwctebo5xojfp84t1dl8rzwf5semv7n.png/100px-Icon_unit_104031.png'
            },
            {
              name: '千歌',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/d/db/egxfjidgjrjc8uatgi30dhvwzb3hkwn.png/100px-Icon_unit_104231.png'
            },
            {
              name: '真步',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/7/72/jb3637kcjwh7z9559n3ca377tkldr0t.png/100px-Icon_unit_101031.png'
            },
            {
              name: '优衣',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/1/18/h8ni7jp1oej5mk2al7v1rjofkd4nqis.png/100px-Icon_unit_100231.png'
            },
            {
              name: '雪',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/c/c3/f8eexvpqyqkccbjad1uucs9z9whwnuy.png/100px-Icon_unit_100831.png'
            },
            {
              name: '镜华',
              img: 'https://patchwiki.biligame.com/images/pcr/thumb/1/11/kf7jk1e35kfnqqvdd9l0y5f408ktm40.png/100px-Icon_unit_103631.png'
            }
          ]
        }
      ],
      selectList: [],
      num: null,
      text: ''
    }
  },
  methods: {
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
      addRecord({
        num: this.num,
        data: JSON.stringify(this.selectList),
        text: this.text,
        king: this.$route.query.king,
        round: this.$route.query.round
      })
        .then(res => {
          if (res.data.code === 0) {
            this.$createToast({
              type: 'correct',
              txt: '提交成功'
            }).show()
            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.error(err)
          this.$createToast({
            type: 'error',
            txt: '未知错误'
          }).show()
        })
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
    if (!this.$route.query.king && !this.$route.query.round) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.edit-wrapper
  .header
    position sticky
    top 0
    background #EBEEF5
    padding-top 10px
    .input
      margin 0 5px
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
  .btn
    width 95%
    margin 20px auto
</style>
