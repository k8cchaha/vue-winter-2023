import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { products } from './data.js'

const app = createApp({
  data() {
    return {
      isLogin: false,
      products: products || [],
      productListHead: ['產品名稱', '原價', '售價', '是否啟用', '查看細節'],
      selectProduct: null,
      displayDetailItem: [{
        name: '產品名稱：',
        directShow: true,
        key: 'title',
        style: {
          fontSize: '24px',
          textDecoration: 'underline'
        }
      }, {
        name: '描述：',
        directShow: true,
        key: 'description',
        style: {
          fontSize: '20px',
          color: 'gray',
          margin: '10px 0'
        }
      },{
        name: '內容：',
        directShow: true,
        key: 'content',
        style: {
          color: 'green',
          margin: '10px 0'
        }
      },{
        name: '原價：',
        key: 'origin_price',
        style: {
          fontSize: '30px',
          textDecoration: 'line-through',
          marginTop: '30px'
        }
      },{
        name: '特價：',
        key: 'price',
        style: {
          fontSize: '30px',
          color: 'red',
          marginBottom: '30px'
        }
      },{
        name: '數量：',
        key: 'num',
        style: {
          
        }
      }]
    }
  },
  methods: {
    onClickProduct(item) {
      console.log(item)
      this.selectProduct = item
    }
  }
}).mount('#app')