<template>
  <div id="has-any-roles" v-if="isShow">
    <slot></slot>
  </div>
</template>
<script>
  import isArrayContains from 'utilities/is-array-contains'
  import {loadRoles} from 'common/js/cache'
  export default{
    props: {
      roles: {
        type: String,
        default: ''
      }
    },
    created() {

    },
    watch: {
      roles: {
        immediate: true,
        deep: true,
        handler: function (newVal, oldVal) {
          let roles = loadRoles()
//      let roles = ['SYS_ADMIN']
          console.log(newVal)
          console.log(roles)
          if (newVal) {
            let roleArr = newVal.split(',')
            roleArr.map((role) => {
              if (isArrayContains(roles, role)) {
                this.isShow = true
              }
            })
          }
        }
      }
    },
    data () {
      return {
        isShow: false
      }
    }
  }
</script>
<style scoped>
  #has-any-roles{
    display: inline-block;
  }
</style>
