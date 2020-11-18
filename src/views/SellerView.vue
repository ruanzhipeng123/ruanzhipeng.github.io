<template>
  <div class="seller-view">
    <div class="seller-container">
      <div class="seller-merchant">
        <h3 class="seller-merchant-name">{{seller.name}}</h3>
        <div class="merchant-star-span">
          <Star :type="'36'" :score="seller.serviceScore" />
          <span>(661)</span>
          <span>月售690单</span>
        </div>
        <div class="merchant-info">
          <div class="info merchant-info-one">
            <p>起送价</p>
            <p>
              <i>20</i>
            </p>
          </div>
          <div class="info merchant-info-two">
            <p>商家配送</p>
            <p>
              <i>{{seller.deliveryPrice}}</i>
            </p>
          </div>
          <div class="info merchant-info-free">
            <p>平均配送时间</p>
            <p>
              <i>{{seller.deliveryTime}}</i>
            </p>
          </div>
        </div>
      </div>

      <WhiteSpace />

      <div class="seller-motice">
        <h3>公告与活动</h3>
        <p class="seller-motice-text">{{seller.bulletin}}</p>
        <ul class="seller-motice-content">
          <li v-for="(s,i) in seller.supports" :key="i" class="support-item">
            <SupportIcon class="support-pic" :type="s.type" :kind="4" />
            <span class="text">{{s.description}}</span>
          </li>
        </ul>
      </div>

      <WhiteSpace />

      <div class="seller-realistic">
        <h3>商家实景</h3>
        <div class="realistic-list">
          <ul>
            <li v-for="(p, i) in seller.pics" :key="i">
              <img :src="p" alt="商家实景" />
            </li>
          </ul>
        </div>
      </div>

      <WhiteSpace />

      <div class="seller-message">
        <h3>商家信息</h3>
          <ul>
            <li v-for="(p, i) in seller.infos" :key="i">
              {{p}}
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../components/Star";
import WhiteSpace from "../components/WhiteSpace";
import SupportIcon from "../components/SupportIcon";

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  components: {
    Star,
    WhiteSpace,
    SupportIcon,
  },
};
</script>

<style lang="scss" scoped>
.seller-view {
  overflow: auto;
  position: fixed;
  top: 180px;
  right: 0;
  bottom: 0;
  left: 0;

  .seller-merchant {
    padding: 18px;

    .seller-merchant-name {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }

    .merchant-star-span {
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding-bottom: 18px;
      line-height: 16px;

      span:nth-child(2) {
        margin-left: 8px;
      }

      span:nth-child(3) {
        margin-left: 12px;
      }
    }

    span {
      display: inline-block;
      font-size: 10px;
      vertical-align: top;
      color: rgb(77, 85, 93);
    }

    .merchant-info {
      display: flex;
      padding: 18px 0 0;

      .info {
        flex: 1;
        text-align: center;
      }

      .info {
        border-right: 1px solid rgba(7, 17, 27, 0.1);

        p:nth-child(1) {
          margin-bottom: 4px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }

        i {
          position: relative;
          padding-right: 20px;
          font-size: 20px;
          line-height: 20px;
          color: rgb(7, 17, 27);

          &::before {
            position: absolute;
            right: 0px;
            bottom: -2px;
            font-size: 20px;
            font-weight: normal;
            transform-origin: left;
            transform: scale(0.5);
            content: "元";
          }
        }
      }

      .merchant-info-free {
        border-right: 0;

        i {
          &::before {
            right: -20px;
            content: "分钟";
          }
        }
      }
    }
  }

  .seller-motice {
    padding: 18px;

    .seller-motice-text {
      padding: 8px 12px 16px;
      font-size: 12px;
      font-weight: 200;
      line-height: 24px;
      color: rgb(240, 20, 20);
    }

    .support-item {
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      padding: 16px 0;

      .support-pic {
        margin: 0 6px 0 12px;
        vertical-align: bottom;
      }

      .text {
        font-size: 12px;
        font-weight: 200;
        line-height: 16px;
        color: rgb(7, 17, 27);
      }
    }
  }

  .seller-realistic {
    padding: 18px;

    .realistic-list {
      overflow-x: auto;
      ul {
        width: 504px;
        margin-top: 12px;

        li {
          margin-right: 6px;
          width: 120px;
          height: 90px;
          float: left;

          &:last-child {
            margin-right: 0;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .seller-message {
    padding: 18px;

    ul {
      margin-top: 12px;

      li {
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        padding: 16px;
        font-size: 12px;
        font-weight: 200;
        line-height: 16px;
        color: rgb(7, 17, 27);

        &:last-child {
          padding-bottom: 0;
        }
      }
    }
  }
}
</style>