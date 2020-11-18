<template>
  <div id="app">
    <EleHeader :seller="seller"/>
    <div class="tabs">
      <router-link to="/" class="tab-item">商品</router-link>
      <router-link to="/rating" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <router-view :seller="seller"/>
  </div>
</template>

<script>
import EleHeader from './components/EleHeader'

export default {
  data() {
    return {
      seller: {},
    };
  },
  created() {
    // 网络请求获取商家信息
    this.getSellerDataFromServer();
  },
  methods: {
    getSellerDataFromServer() {
      // 开始网络请求 弹出加载的轻提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });
      setTimeout(() => {
        this.$http("/api/seller").then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          /*
           * 先判断网络请求是否成功 res.status === 200
           * 再判断请求数据权限是否正确(模拟) res.data.code === 1
           */
          if (res.status === 200 && res.data.code === 1) {
            this.seller = res.data.data;
          } else {
            this.$toast.fail("失败文案");
          }
          // console.log(res.data.data);
        });
      }, 800);
    },
  },
  components: {
    EleHeader
  },
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  height: 40px;
  background-color: #fff;

  .tab-item {
    display: block;
    flex: 1;
    line-height: 40px;
    color: rgb(77, 85, 93);
    text-align: center;
    text-decoration: none;

    &.active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
