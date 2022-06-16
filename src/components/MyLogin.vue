<template>
  <!-- #BFBFBF  -->
  <div class="container">
    <div class="title">
      <div class="picshow">
        <img class="picone" src="../assets/picone.png" />
        <img class="pictwo" src="../assets/pictwo.png" />
        <img class="picthree" src="../assets/picthree.png" />
      </div>
      <div class="textplace">
        <div class="textshow">
          <img class="textpic" src="../assets/text.png" />
        </div>
        <div class="location" @click="changemap">
          <span class="texttitle" style="text-decoration: underline ;color: orange;">{{ name }}</span>
          <img class="textpic" src="../assets/location.png" />
        </div>
      </div>
    </div>

    <div v-show="type" class="biaoqian">
      <span class="titletext">村场景记忆</span>
      <el-card class="card">
        <div class="monitor-list">
          <!-- 左边按钮 -->
          <div class="btn" @click="scrollLeft(0)">
            <i class="el-icon el-icon-caret-left" />
          </div>
          <!-- 中间列表 -->
          <div id="list-box" class="list-box">
            <div id="list" class="list">
              <div v-for="item in monitorList" :key="item.id" class="list-item">
                <div class="model" @click="dialogshow(item.url)">{{ item.name }}</div>
              </div>
            </div>
          </div>
          <!-- 右边按钮 -->
          <div class="btn" @click="scrollRight(0)">
            <i class="el-icon el-icon-caret-right" />
          </div>
        </div>
      </el-card>

      <span class="titletext">老家场景记忆</span>

      <el-card class="card">
        <div class="monitor-list">
          <!-- 左边按钮 -->
          <div class="btn" @click="scrollLeft(1)">
            <i class="el-icon el-icon-caret-left" />
          </div>
          <!-- 中间列表 -->
          <div id="list-box-hometown" class="list-box">
            <div id="list-hometown" class="list">
              <div v-for="item in hometownList" :key="item.id" class="list-item">
                <div class="model" @click="dialogshow(item.url)">{{ item.name }}</div>
              </div>
            </div>
          </div>
          <!-- 右边按钮 -->
          <div class="btn" @click="scrollRight(1)">
            <i class="el-icon el-icon-caret-right" />
          </div>
        </div>
      </el-card>
    </div>

    <div v-show="!type" class="map">
      <div class="baidumap">
        <baidu-map class="baidumaptwo" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="handler"
          @click="getClickInfo">
          <!-- 必须给容器指高度，不然地图将显示在一个高度为0的容器中，看不到 -->
          <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true">
          </bm-geolocation> -->
          <!-- <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list> -->
        </baidu-map>
      </div>

      <img class="close" @click="closemap" src="../assets/close.png" />
    </div>

    <div class="bottom">技术支持:广州中科雅图信息有限公司</div>

    <Mydialog ref="mydialog"></Mydialog>
  </div>
</template>

<script>
import { USERS } from './constant'
import Mydialog from './Mydialog.vue'
import myimg from "../assets/map.png"

export default {
  components: { Mydialog },
  name: "MyLogin",
  data() {
    return {
      type: true,
      name: "阿亮的老家",
      monitorList: USERS[0].village,
      hometownList: USERS[0].hometown,
      // 百度地图信息设置
      // 地址信息
      address: null,
      center: { lng: 0, lat: 0 },
      //地图展示级别
      zoom: 13,
    };
  },
  created() {
    console.log(this.$route.query.id);
    if (typeof this.$route.query.id === "undefined") {
      this.center.lng = USERS[0].lan;
      this.center.lat = USERS[0].lat;
      return;
    }
    this.initMonitorList(this.$route.query.id);
  },
  methods: {
    initMonitorList(id) {
      for (let i = 0; i < USERS.length; i++) {
        if (USERS[i].name.includes(id)) {
          this.monitorList = USERS[i].village;
          this.hometownList = USERS[i].hometown;
          this.name = USERS[i].address;
          this.center.lng = USERS[i].lan;
          this.center.lat = USERS[i].lat;
          return;
        }
      }
    },
    changemap() {
      this.type = false
    },
    closemap(){
      this.type = true
    },
    // 左滑动逻辑
    scrollLeft(i) {
      if (i == 0) {
        const allLength = this.monitorList.length * 250;
        const boxLength = document.getElementById("list-box").clientWidth;
        if (allLength < boxLength)
          return;
        const listEl = document.getElementById("list");
        const leftMove = Math.abs(parseInt(window.getComputedStyle(listEl, null)?.left));
        if (leftMove + boxLength - 250 < boxLength) {
          // 到最开始的时候
          listEl.style.left = "0px";
        }
        else {
          listEl.style.left = "-" + (leftMove - 250) + "px";
        }
      }
      else {
        const allLength = this.hometownList.length * 250;
        const boxLength = document.getElementById("list-box-hometown").clientWidth;
        if (allLength < boxLength)
          return;
        const listEl = document.getElementById("list-hometown");
        const leftMove = Math.abs(parseInt(window.getComputedStyle(listEl, null)?.left));
        if (leftMove + boxLength - 250 < boxLength) {
          // 到最开始的时候
          listEl.style.left = "0px";
        }
        else {
          listEl.style.left = "-" + (leftMove - 250) + "px";
        }
      }
    },
    // 右滑动逻辑
    scrollRight(i) {
      if (i == 0) {
        const allLength = this.monitorList.length * 250;
        const boxLength = document.getElementById("list-box").clientWidth;
        if (allLength < boxLength)
          return;
        const listEl = document.getElementById("list");
        const leftMove = Math.abs(parseInt(window.getComputedStyle(listEl, null)?.left));
        if (leftMove + boxLength + 250 > allLength) {
          listEl.style.left = "-" + (allLength - boxLength) + "px";
        }
        else {
          listEl.style.left = "-" + (leftMove + 250) + "px";
        }
      }
      else {
        const allLength = this.hometownList.length * 250;
        const boxLength = document.getElementById("list-box-hometown").clientWidth;
        if (allLength < boxLength)
          return;
        const listEl = document.getElementById("list-hometown");
        const leftMove = Math.abs(parseInt(window.getComputedStyle(listEl, null)?.left));
        if (leftMove + boxLength + 250 > allLength) {
          listEl.style.left = "-" + (allLength - boxLength) + "px";
        }
        else {
          listEl.style.left = "-" + (leftMove + 250) + "px";
        }
      }
    },
    dialogshow(url) {
      this.$refs.mydialog.show(url);
    },
    handler({ BMap, map }) {
      map.clearOverlays()
      // this.center.lng = 120.39629;
      // this.center.lat = 36.30744;
      this.zoom = this.zoom;

      var point = new BMap.Point(this.center.lng, this.center.lat)
      var myIcon = new BMap.Icon(myimg, new BMap.Size(80, 120))
      var marker = new BMap.Marker(point, { icon: myIcon }) // 创建标注   
      map.addOverlay(marker) // 将标注添加到地图中


    },
    getClickInfo(e) {
      // 创建地理编码实例
      const myGeo = new BMap.Geocoder();
      let _this = this;
      // 根据坐标逆解析地址
      myGeo.getLocation(new BMap.Point(e.point.lng, e.point.lat), function (result) {
        if (result) {
          _this.form.warehouseLocation = result.address
        }
      });
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  background-color: #FFF1DD;
  height: 100%;
  width: 1150px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  .title {
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: row;

    .picshow {
      display: flex;
      width: 650px;
      height: 400px;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .picone {
        width: 200px;
        height: 300px;
      }

      .pictwo {
        margin-left: -60px;
        width: 200px;
        height: 200px;
      }

      .picthree {
        margin-top: 60px;
        margin-left: -60px;
        width: 250px;
        height: 300px;
      }
    }

    .textplace {
      width: 740px;
      height: 400px;
      display: flex;
      flex-direction: column;

      .textshow {
        padding-top: 40px;
        margin-left: -70px;
        display: flex;
        width: 740px;
        height: 400px;
        flex-direction: row;
        align-items: center;

        .textpic {
          width: 740px;
          height: 300px;
        }
      }

      .location {
        padding-right: 100px;
        margin-top: -15px;
        display: flex;
        flex-direction: row;
        width: 580px;
        height: 85px;
        justify-content: flex-end;

        .texttitle {
          width: 200px;
          height: 85px;
          font-size: 36px;
          color: #FF9808;
          font-weight: bold;

        }

        .textpic {
          margin-top: -30px;
          width: 62px;
          height: 80px;
        }
      }
    }
  }

  .biaoqian {
    margin-top: 10px;
    padding-left: 10px;
    flex-direction: column;
    height: 558px;

    .titletext {
      display: flex;
      margin-top: 15px;
      margin-left: 40px;
      margin-bottom: 15px;
      width: 100%;
      font-size: 36px;
      color: #FF9808;
      font-weight: bold;
    }

    .card{
      width: 100%;
      background-color:#FFF1DD;
      .monitor-list {
      display: flex;
      justify-content: space-between;
      height: 150px;

      .btn {
        width: 50px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        cursor: pointer;
        // icon
        font-size: 36px;
        color: #A6A6A6;

        // color:  #FF9808;
        &:hover {
          background-color: #FFE3BB;
          color: #FF9808;
        }
      }

      .list-box {
        width: 1000px;
        overflow: hidden;

        .list {
          width: calc(100vw - 150px);
          display: flex;
          transform: all 2s;
          margin-left: -20px;

          .list-item {
            width: 200px;
            height: 150px;
            text-align: center;
            padding: 10px;
            cursor: pointer;
            margin-left: 40px;

            .model {
              width: 200px;
              height: 140px;
              line-height: 136px;
              border: 3px dashed #A12B06;
              border-radius: 20px 0 20px 0;
              text-align: center;
              font-size: 30px;
              color: #7F7F7F;
              background-color: #F2F2F2;
              font-weight: bold
            }

          }

          position: relative;
          left: 0;
          transition: left 1s;
        }
      }
    }
    }
    

  }

  .map {
    margin-top: 20px;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 98%;
    height:520px;
    position:relative;
    .baidumap {
      border: 3px dashed #A12B06;
      width: 100%;
      height: 520px;
      .baidumaptwo{
        height: 514px;
      }
    }

    .close{
      width: 80px ; position:absolute; height: 80px;
    }

  }

  .bottom {
    margin-top: 20px;
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: #BFBFBF;
    font-size: 26px;
    font-weight: bold;
  }

}
</style>
