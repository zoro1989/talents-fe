<template>
  <section id="info-modify">
    <input type="hidden" v-model="form.id" />
    <mu-text-field label="昵称" v-model="form.nickname" labelFloat hintText="请输入昵称" ></mu-text-field>
    <mu-text-field label="Email（不准修改）" v-model="form.email" :disabled="true"></mu-text-field>
    <section class="button-group">
      <mu-raised-button label="确认修改"  @click="onSubmit" primary/>
    </section>
    <tkm-loading ref="loading"></tkm-loading>
  </section>
</template>

<script>
import infoModify from 'service/info-modify'
import TkmLoading from 'components/tkm-loading'
export default{
  components: {
    TkmLoading
  },
  created () {
    this.$nextTick(() => {
      this.$refs.loading.show()
    })
    infoModify.get.bind(this)({}, (data) => {
      this.form.id = data.id
      this.form.nickname = data.nickname
      this.form.email = data.email
      this.$nextTick(() => {
        this.$refs.loading.hide()
      })
    }, (err) => {
      console.log(err)
      this.$nextTick(() => {
        this.$refs.loading.hide()
      })
//      this.$message.error(err)
    })
  },
  data () {
    return {
      form: {
        id: '',
        nickname: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      infoModify.save.bind(this)({form: this.form}, (data) => {
//        this.$message({
//          message: '保存成功',
//          type: 'success'
//        })
      }, (err) => {
        console.log(err)
//        this.$message.error(err)
      })
    }
  }
}

</script>

<style scoped>
   #info-modify{
     width: 60%;
     margin: 0 auto;
   }

</style>
