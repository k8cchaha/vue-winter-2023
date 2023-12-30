import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { products } from './data.js'

console.log(products)

const app = createApp({
  data() {
    return {

    }
  }
}).mount('#app')