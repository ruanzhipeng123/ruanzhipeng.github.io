<template>
  <div class="rating-view">
    <!-- 加载评价页面 -->
    <van-empty v-if="loading" :image="image">
      <p class="refresh-text" v-if="refreshText">
        网络异常,请点击
        <i class="refresh" @click="refreshData">刷新</i>
      </p>
    </van-empty>
    <!-- 评价 -->
    <div class="rating-container">
      <div class="rating-detail">
        <div class="rating-detail-grade">
          <div class="rating-detail-line">
            <p class="grade-text-o">3.9</p>
            <p class="grade-text-t">综合评分</p>
            <p class="grade-text-f">高于周边商家{{seller.rankRate}}%</p>
          </div>
        </div>
        <div class="rating-detail-evaluate">
          <div class="evaluate-text-o">
            服务态度
            <Star :type="'36'" :score="seller.serviceScore" />
            <span>{{seller.serviceScore}}</span>
          </div>
          <div class="evaluate-text-t">
            服务态度
            <Star :type="'36'" :score="seller.serviceScore" />
            <span>{{seller.serviceScore}}</span>
          </div>
          <div class="evaluate-text-f">
            送达时间
            <span>44分钟</span>
          </div>
        </div>
      </div>
      <WhiteSpace />
      <div class="rating-detail-container">
        <div class="container-top">
          <RatingsFilter
            positive="推荐"
            negative="吐槽"
            :select="select"
            :onlyContent="onlyContent"
            :ratings="ratings"
            @set-select="setSelect"
            @toggle-only-content="toggleOnlyContent"
          />
        </div>
        <div class="container-bottom">
          <ul>
            <li class="ratings-list" v-for="(f,i) in filterRatings" :key="i">
              <div class="left">
                <img class="avatar" :src="f.avatar" alt="用户图片" />
              </div>
              <div class="right">
                <div class="clearfix">
                  <p class="right-user">{{f.username}}</p>
                  <p class="right-date">{{f.rateTime|getTemplateTimeByDate('YYYY-MM-dd hh:mm')}}</p>
                </div>
                <Star :type="'24'" :score="seller.serviceScore" />
                <span v-if="f.deliveryTime" class="delivery-time">{{f.deliveryTime}}分钟送达</span>
                <p class="right-text">{{f.text}}</p>
                <p class="right-icon">
                  <i class="icon" :class="f.rateType === 1 ? 'icon-thumb_down' : 'icon-thumb_up'" />
                  <span class="menu-name" v-for="(r,index) in f.recommend" :key="index">{{r}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../components/Star";
import WhiteSpace from "../components/WhiteSpace";
import RatingsFilter from "../components/RatingsFilter";
import { getTemplateTimeByDate } from "../assets/js/tool";

/*
 *@desc 网络请求图片
 *@constant {string}
 */
const NETWORK = "network";
/*
 *@desc 网络异常图片
 *@constant {string}
 */
const ERROR = "error";
/*
 *@desc 显示所有评论
 *@constant {string}
 */
const ALL = "all";
/*
 *@desc 显示所有好评
 *@constant {string}
 */
const POSITIVE = "positive";
/*
 *@desc 显示所有差评
 *@constant {string}
 */
const NEGATIVE = "negative";

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      ratings: [],
      loading: false,
      refreshText: false,
      image: NETWORK,
      currentIndex: 0,
      select: ALL, // 选择当前评价是好评, 差评, 全部
      onlyContent: false, // 是否只显示有内容的评价
    };
  },
  created() {
    this.getGoodsFromServe();
  },
  methods: {
    async getGoodsFromServe() {
      // 设置开始网络请求状态
      this.startFetch();

      let res = await this.axios("/api/ratings");
      console.log(res.data.data);

      if (res.status === 200 && res.data.code === 1) {
        // 请求成功
        this.ratings = res.data.data;
        // 请求成功隐藏加载的van-empty页面
        this.fetchSuccess();
      } else {
        // 请求失败设置页面的状态
        this.FetchFailure();
      }
    },
    startFetch() {
      this.loading = true; // 开始网络请求
      this.image = NETWORK;
      this.refreshText = false;
    },
    fetchSuccess() {
      this.loading = false;
    },
    FetchFailure() {
      this.image = ERROR; // 将图片渲染成error
      this.refreshText = true;
    },
    refreshData() {
      // 函数防抖
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.getGoodsFromServe();
        this.timer = null;
      }, 300);
    },
    setSelect(select) {
      this.select = select;
    },
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent;
    },
  },
  computed: {
    filterRatings() {
      return this.ratings.filter((r) => {
        // 过滤没有内容的评价
        if (this.onlyContent && !r.text) {
          return;
        }
        // 当选择好评时保留 rateType 等于 0 的评价
        if (this.select === POSITIVE) {
          return r.rateType === 0;
        }
        // 当选择差评时保留 rateType 等于 1 的评价
        if (this.select === NEGATIVE) {
          return r.rateType === 1;
        }
        // All保留全部
        return true;
      });
    },
  },
  filters: {
    getTemplateTimeByDate,
  },
  components: {
    Star,
    WhiteSpace,
    RatingsFilter,
  },
};
</script>

<style lang="scss" scoped>
.rating-view {
  overflow: auto;
  position: fixed;
  top: 180px;
  right: 0;
  bottom: 0;
  left: 0;


  .rating-detail {
    display: flex;
    padding: 18px 0;

    .rating-detail-grade {
      flex: 0 0 137.5px;
      text-align: center;
      border-right: 1px solid rgb(147, 153, 159);

      .grade-text-o {
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
      }

      .grade-text-t {
        margin-top: 6px;
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
      }

      .grade-text-f {
        margin: 8px 0 6px 0;
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .rating-detail-evaluate {
      flex: 1;
      padding: 0 24px;

      .evaluate-text-o,
      .evaluate-text-t {
        margin-bottom: 8px;
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);

        .star {
          margin: 0 11px;
          vertical-align: top;
        }

        span {
          display: inline-block;
          font-size: 12px;
          line-height: 16px;
          color: rgb(255, 153, 0);
        }
      }

      .evaluate-text-f {
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);

        span {
          margin-left: 12px;
          font-size: 12px;
          line-height: 16px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-detail-container {
    .container-top {
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .ratings-filter {
        padding: 18px 18px 0 18px;
      }
    }

    .container-bottom {
      padding: 18px;

      .ratings-list {
        display: flex;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        padding: 18px 0;

        &:first-child {
          padding-top: 0;
        }

        .left {
          flex: 0 0 28px;
          margin-right: 12px;

          .avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }

        .right {
          flex: 1;

          .right-user {
            float: left;
            margin-bottom: 2px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(7, 17, 27);
          }

          .right-date {
            float: right;
            font-size: 10px;
            font-weight: 200;
            line-height: 12px;
            text-align: right;
            color: rgb(147, 153, 159);
          }

          .star {
            margin-bottom: 6px;
          }

          .delivery-time {
            margin-left: 6px;
            font-size: 10px;
            font-weight: 200;
            line-height: 12px;
            vertical-align: middle;
            color: rgb(147, 153, 159);
          }

          .right-text {
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          .menu-name {
            margin-left: 8px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            padding: 0 6px;
            font-size: 9px;
            line-height: 18px;
            vertical-align: top;
            color: rgb(147, 153, 159);

            &:last-child {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>