<template>
  <div class="code-convertor">
    <div>
      <!--<mu-text-field label="源代码路径" :value="selectedProjName" :disabled="true"></mu-text-field>-->
      <mu-raised-button label="选择文件"  @click="selectFile" primary/>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
                :multiSelectable="multiSelectable" :height="height" >
        <mu-thead slot="header">
          <mu-tr>
            <mu-th tooltip="旧版Html">旧版Html</mu-th>
            <mu-th tooltip="新版HTML5">新版HTML5</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody v-if="showBody">
          <mu-tr v-for="(row, index) in tableData.rows" v-bind:key="index">
            <mu-td v-for="(item, index) in row.columns" v-bind:key="index"><a :href="item.url" target="_blank">{{item.name}}</a></mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <input type="file" style="display: none" ref="file" multiple="multiple" @change="onFileChange" />
    </div>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </div>
</template>
<script>
  import TkmLoading from 'components/tkm-loading'
  import {messageMinxin} from 'common/js/mixin'
  export default {
    mixins: [messageMinxin],
    components: {
      TkmLoading
    },
    data() {
      return {
        fixedHeader: true,
        selectable: true,
        showCheckbox: false,
        multiSelectable: false,
        selectedAll: false,
        totalCount: 34,
        pageNo: 1,
        height: '70vh',
        showBody: false,
        selectedProjName: '',
        tableData: {
            rows: []
//          rows: [
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Controllers/AccountController.cs', name: 'AccountController.cs'},
//                {url: 'http://localhost:8080/upload/vb/Controllers/AccountController.vb', name: 'AccountController.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Controllers/CheckoutController.cs', name: 'CheckoutController.cs'},
//                {url: 'http://localhost:8080/upload/vb/Controllers/CheckoutController.vb', name: 'CheckoutController.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Controllers/HomeController.cs', name: 'HomeController.cs'},
//                {url: 'http://localhost:8080/upload/vb/Controllers/HomeController.vb', name: 'HomeController.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Controllers/ShoppingCartController.cs', name: 'ShoppingCartController.cs'},
//                {url: 'http://localhost:8080/upload/vb/Controllers/ShoppingCartController.vb', name: 'ShoppingCartController.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Controllers/StoreController.cs', name: 'StoreController.cs'},
//                {url: 'http://localhost:8080/upload/vb/Controllers/StoreController.vb', name: 'StoreController.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Controllers/StoreManagerController.cs', name: 'StoreManagerController.cs'},
//                {url: 'http://localhost:8080/upload/vb/Controllers/StoreManagerController.vb', name: 'StoreManagerController.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/AccountModels.cs', name: 'AccountModels.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/AccountModels.vb', name: 'AccountModels.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/Album.cs', name: 'Album.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/Album.vb', name: 'Album.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/Artist.cs', name: 'Artist.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/Artist.vb', name: 'Artist.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/Cart.cs', name: 'Cart.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/Cart.vb', name: 'Cart.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/Genre.cs', name: 'Genre.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/Genre.vb', name: 'Genre.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/MusicStoreEntities.cs', name: 'MusicStoreEntities.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/MusicStoreEntities.vb', name: 'MusicStoreEntities.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/Order.cs', name: 'Order.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/Order.vb', name: 'Order.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/OrderDetail.cs', name: 'OrderDetail.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/OrderDetail.vb', name: 'OrderDetail.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/SampleData.cs', name: 'SampleData.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/SampleData.vb', name: 'SampleData.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Models/ShoppingCart.cs', name: 'ShoppingCart.cs'},
//                {url: 'http://localhost:8080/upload/vb/Models/ShoppingCart.vb', name: 'ShoppingCart.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/ViewModels/ShoppingCartRemoveViewModel.cs', name: 'ShoppingCartRemoveViewModel.cs'},
//                {url: 'http://localhost:8080/upload/vb/ViewModels/ShoppingCartRemoveViewModel.vb', name: 'ShoppingCartRemoveViewModel.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/ViewModels/ShoppingCartViewModel.cs', name: 'ShoppingCartViewModel.cs'},
//                {url: 'http://localhost:8080/upload/vb/ViewModels/ShoppingCartViewModel.vb', name: 'ShoppingCartViewModel.vb'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Account/ChangePassword.cshtml', name: 'ChangePassword.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Account/ChangePassword.vbhtml', name: 'ChangePassword.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Account/ChangePasswordSuccess.cshtml', name: 'ChangePasswordSuccess.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Account/ChangePasswordSuccess.vbhtml', name: 'ChangePasswordSuccess.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Account/LogOn.cshtml', name: 'LogOn.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Account/LogOn.vbhtml', name: 'LogOn.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Account/Register.cshtml', name: 'Register.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Account/Register.vbhtml', name: 'Register.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Checkout/AddressAndPayment.cshtml', name: 'AddressAndPayment.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Checkout/AddressAndPayment.vbhtml', name: 'AddressAndPayment.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Checkout/Complete.cshtml', name: 'Complete.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Checkout/Complete.vbhtml', name: 'Complete.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Home/Index.cshtml', name: 'Index.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Home/Index.vbhtml', name: 'Index.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Shared/_Layout.cshtml', name: '_Layout.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Shared/_Layout.vbhtml', name: '_Layout.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/Shared/Error.cshtml', name: 'Error.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/Shared/Error.vbhtml', name: 'Error.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/ShoppingCart/Browse.cshtml', name: 'Browse.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/ShoppingCart/Browse.vbhtml', name: 'Browse.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/ShoppingCart/Details.cshtml', name: 'Details.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/ShoppingCart/Details.vbhtml', name: 'Details.vbhtml'}
//              ]
//            },
//            {
//              columns: [
//                {url: 'http://localhost:8080/upload/cs/Views/ShoppingCart/GenreMenu.cshtml', name: 'GenreMenu.cshtml'},
//                {url: 'http://localhost:8080/upload/vb/Views/ShoppingCart/GenreMenu.vbhtml', name: 'GenreMenu.vbhtml'}
//              ]
//            }
//          ]
        }
    }
    },
    methods: {
      selectFile() {
        this.$refs.file.click()
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        let importFile = files[0]
        this.selectedProjName = importFile.name.split('.')[0]
        if (e.target.value) {
          e.target.value = ''
        }
        this.$refs.loading.show()
        setTimeout(() => {
          this.showBody = true
          let row = {}
          let columns = []
          let columnA = {}
          columnA.url = 'http://localhost:8080/upload/html/' + this.selectedProjName + '.txt'
          columnA.name = this.selectedProjName + '.html'
          let columnB = {}
          columnB.url = 'http://localhost:8080/upload/h5/' + this.selectedProjName + '.txt'
          columnB.name = this.selectedProjName + '.h5'
          columns.push(columnA)
          columns.push(columnB)
          row.columns = columns

          this.tableData.rows.push(row)
          this.$refs.loading.hide()
        }, 5000)
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .code-convertor
    min-width: 774px
    font-size: 13px
    .mu-raised-button
      margin-right: 3px
      min-width: 0!important
    .mu-tr
      &.row-section
        background: #418bca
      &.row-section:hover
        background: rgba(65,139,202, 0.8)
      .mu-th,.mu-td
        height: 48px
        line-height: 48px
        overflow: hidden
        text-align: center
        white-space:nowrap
        text-overflow: ellipsis
        .mu-raised-button
          margin-right: 3px
    .mu-pagination
      justify-content: flex-end
</style>
