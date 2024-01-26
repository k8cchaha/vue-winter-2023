import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import axios from './axios.esm.js'
// import { products } from './data.js'

const app = createApp({
  data() {
    return {
      isLogin: false,
      products: [],
      selectedProduct: null,
      baseUrl: 'https://ec-course-api.hexschool.io',
      api_path: 'k8cchaha',
      account: '',
      password: '',
      showLoading: false,
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
      }],
      showCreateDlg: false,
      showEditDlg: false,
      showDeleteDlg: false
    }
  },
  computed: {
    dataValid() {
      return this.account && this.password
    }
  },
  methods: {
    getProducts() {
      this.apiGetProducts()
      .then((res)=>{
        if (res.data) {
          this.products = res.data.products
        }
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
        this.showLoading = false
      })
    },
    createProduct() {
      this.showCreateDlg = true;
    },
    editProduct(item) {
      
    },
    deleteProduct(item) {
      
    },
    submit() {
      const data = {
        username: this.account,
        password: this.password
      }
      this.apiSignin(data)
      .then((res)=> {
        const { token, expired } = res.data
        if (token) {
          this.isLogin = true
          document.cookie = `adminToken=${token};expires=${new Date(expired)}`;
          // Set default axios auth token
          axios.defaults.headers.common['Authorization'] = token;
          this.getProducts()
        }
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
        this.showLoading = false
      })
    },
    loginCheck() {
      this.apiCheckUser(this.getCookie('adminToken'))
      .then((res)=>{
        if (res.data.success) {
          alert('登入成功')
        } else {
          alert('請重新登入')
          this.backToLogin()
        }
      })
      .catch((err)=>{
        console.log(err)
        alert('請重新登入')
        this.backToLogin()
      })
      .finally(()=>{
        this.showLoading = false
      })
    },
    logout() {
      this.apiLogout()
      .then(()=>{
        document.cookie = `adminToken=;expires=${new Date()}`
        this.backToLogin()
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
        this.showLoading = false
      })
    },
    apiCheckUser(token) {
      this.showLoading = true
      return axios.post(`v2/api/user/check`, {}, {
        headers: {
          'Authorization': `${token}`
      }})
    },
    apiSignin(data) {
      this.showLoading = true
      return axios.post(`v2/admin/signin`, data)
    },
    apiLogout() {
      this.showLoading = true
      return axios.post(`v2/logout`)
    },
    apiGetProducts() {
      this.showLoading = true
      return axios.get(`v2/api/${this.api_path}/admin/products`)
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    backToLogin() {
      this.account = ''
      this.password = ''
      this.isLogin = false
    }
  },
  mounted() {    
    // Set default axios baseUrl
    axios.defaults.baseURL = this.baseUrl

    // Check token for auto login
    const token = this.getCookie('adminToken')
    if (token) {
      this.apiCheckUser(token)
      .then((res)=>{
        if (res.data.success) {
          this.isLogin = true;
          // Set default axios auth token
          axios.defaults.headers.common['Authorization'] = token;
          this.getProducts()
        }
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
        this.showLoading = false
      })
    }
  }
}).mount('#app')