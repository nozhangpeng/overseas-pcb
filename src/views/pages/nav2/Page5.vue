<template>
  <div class="Event_event_box_div">
    <div class="put_on_record_header">
      <van-nav-bar
        title="步道建档"
        left-text="返回"
        right-text="提交"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="put_on_record_contanter">
      <div class="phone">
        <label for="name"  class="Name_left">街道录入:</label>
        <p>{{ stree }}</p>
        <div class="select_info" @click="selectStreet">
          请选择街道
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="check_name">
        <a @click="turnPoint">查看该街道安装点</a>
      </div>
      <div class="phone">
        <label for="name"  class="Name_left">步道名称:</label>
        <div class="input">
          <van-field v-model="trailName" placeholder="请输入步道名称" />
        </div>
      </div>
      <div class="phone">
        <label for="name"  class="Name_left">联系人:</label>
        <div class="input">
          <van-field v-model="contacts" placeholder="请输入联系人" />
        </div>
      </div>
      <div class="phone">
        <label for="name"  class="Name_left">联系人电话:</label>
        <div class="input">
          <van-field v-model="phone" placeholder="请输入联系人电话" />
        </div>
      </div>
    <div class="phone">
        <label for="name"  class="Name_left">步道尺寸:</label>
        <div class="input">
          <van-field v-model="size" placeholder="请输入步道尺寸" />
        </div>
      </div>
      <div class="phone">
        <label for="name"  class="Name_left">步道面积:</label>
        <div class="input">
          <van-field v-model="area" placeholder="请输入步道面积" />
        </div>
      </div>

      <div class="phone">
        <label for="name"  class="Name_left">详细位置:</label>
        <div class="select_info" @click="tzmap">
          请选择位置
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="shxq">
        <label for="name" class="Name_left">地址:</label>
        <van-field
          v-model="address"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入地址"
        />
      </div>
      <div class="shxq">
        <label for="name" class="Name_left">图片(三张以上) :</label>
        <cube-upload 
          v-model= PhotoList
          :simultaneousUploads="1"
          @file-success="fileUploadSuccess"
          :action="urlbefore + '/api/Form/UpLoadFile'"
        />
      </div>
    </div>
    <van-popup 
      v-model="show"
      get-container="body"
      position="bottom"
      :style="{ height: '35%' }"
      >
      <van-picker :columns="areaList" 
        show-toolbar
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import Common from "@/Commonjs/Common.service";
import Global from "@/Commonjs/Global";
import { CreateUUID } from "@/utils/utils";
import { Toast } from "vant"
export default {
  data() {
    return {
      show: false,
      areaList: [],    
      // 街道json数据
      urlbefore: Global.urlbefore,
      province: '湖北',
      city: '武汉',
      StreetName: "",
      fileList: [],
      trailName: '',
      contacts: '',
      phone: null,
      size: '',
      area: '',
      address: '',
      vauleId: '',
      PhotoList: [],
      objectid: CreateUUID(),
      lng:"",
      lat:"",
      lngLat: '',
      stree: '',
      county: '',
      ObjectID: ''
    };
  },
  created: function() {
    // this.lng = this.$route.query.lng;
    // this.lat=this.$route.query.lat;
    const info = localStorage.getItem("point")
    if (info) {
      this.getPointInfo(JSON.parse(info))
      localStorage.removeItem("point")
    }
  },
  methods: {
    getPointInfo (info) {
      console.log(info)
      this.trailName = info.f_ca13c1219d
      this.contacts = info.f_165bee402a
      this.phone = info.f_b642510820
      this.size = info.f_2921146dd1
      this.stree = info.f_de7b49a458
      this.county = info.f_dc178987c4
      this.StreetName = `${info.f_dc178987c4}${info.f_de7b49a458}`
      this.area = info.f_6733449988
      this.PhotoList =  JSON.parse(info.f_2a1bd2c029_File)
      this.ObjectID = info.ObjectID
      this.lngLat = info.f_e9e6d9bad9
      console.log(this.PhotoList)
    },
    onClickLeft () {
      this.$router.push({path: '/putonrecord'})
    },
    async getStreet () {
      const code = await Common.GetMenuTableCodebyName("基础数据维护", "城市街道信息录入")
      const dataList = await Common.GetListDataBySeach(code, [], null, undefined,1, 20);
      const city = {}
      const StreetName = []
      dataList.forEach(item => {
        StreetName.push(item.f_8e7e193c80)
      })
       dataList.forEach(item => {
        city[item.f_7f1dca3a16] = StreetName
      })
      this.county = StreetName[0]
      this.stree = StreetName[1]
      this.areaList = [
        {
          values: Object.keys(city),
          className: 'column1'
        },
        {
          values: city[Object.keys(city)[0]],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    },
    selectStreet () {
      //点击弹出街道选中组件
      this.getStreet()
      this.show = true
    },
    onCancel () {
      this.show = false
    },
    onConfirm (value) {
      this.StreetName = `${value[0]}${value[1]}`
      this.show = false
    },
    async onClickRight() {
      let Submit_code = await Common.GetMenuTableCodebyName(
        "建档管理",
        "健身步道"
      );
      const dataList = await Common.GetListDataBySeach(Submit_code, null)
       for (let index = 0; index < dataList.length; index++) {
        this.vauleId = dataList[index].ObjectID;
      }
      if (this.PhotoList.length < 3) {
        Toast('最少上传三张照片')
        return
      }
      const data = [
        {
          Key: "f_4d1f4c6c13",
          Value: this.province
        },
        {
          Key: "f_4d1f4c6c13_Id",
          Value: this.province
        },
        { 
          Key: "f_53ef1a11c7", 
          Value: this.city 
        },
        {
          Key: "f_53ef1a11c7_Id",
          Value: this.vauleId
        },
        { 
          Key: "f_ca13c1219d", 
          Value: this.trailName 
        },
        {        
          Key: "f_165bee402a",
          Value: this.contacts
        },
        { 
          Key: "f_b642510820", 
          Value: this.phone 
        },
        {
          Key: "f_2921146dd1",
          Value: this.size
        },
        {
          //地址
          Key: "f_5b92ee906c",
          Value: this.address
        },
        {
          //街道
          Key: "f_de7b49a458",
          Value: this.stree
        },
        {
          //区县
          Key: "f_dc178987c4",
          Value: this.county
        },
        {
          //状态
          Key: "f_68be07b43e", 
          Value: "正常"
        },
        {
          Key: "f_6733449988",
          Value: this.area
        },
        {
          Key: "f_e9e6d9bad9",
          // Value: this.lng+","+this.lat
          Value: "123.12,123.12"
        },
        {
          Key: "f_2a1bd2c029_FIle",
          Value: JSON.stringify(this.PhotoList)
        },
        {
          Key: "f_2a1bd2c029",
          Value: this.PhotoList.length
        }
      ]
      console.log(data)
      if (this.ObjectID) {
        this.objectid = this.ObjectID
        this.ObjectID = ''
      }
      const result = await Common.SaveFormData(Submit_code, null, this.objectid, data)
      Toast.success(result);
      this.$router.push({path:'/putonrecord'})

    },
    async fileUploadSuccess({ response }) {
      //上传图片
      let uploadFileResponse = {};
      uploadFileResponse.fileName = response.Result.FileName;
      uploadFileResponse.fileId = response.Result.FileId;
      uploadFileResponse.md5 = response.Result.Md5;
      uploadFileResponse.createdTime = response.Result.UploadDateTime;
      uploadFileResponse.url =
        this.urlbefore + "/api/Form/DownloadFile/" + response.Result.FileId;
        this.PhotoList.push(uploadFileResponse);
    },
    tzmap () {
      //点击跳转地图
       this.$router.push({
        path: "/footpathFilingmap",
      });
    },
    turnPoint () {
      if (this.StreetName) {
        localStorage.setItem('Street', this.stree)
        this.$router.push({path:'/editputonrecord'})  
      } else {
        Toast('请选择街道');
      }
        
    }
  }
};
</script>
<style lang="scss" scoped>
.put_on_record_header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
}
.van-cell {
  padding: 10px 0;
}
.put_on_record_contanter {
  background-color: #fff;
  font-size: 14px;
  color:#333333;
  width: 100%;
  padding-top: 46px;
}
.phone {
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  margin-left: 25px;
  justify-content: space-between;
  background-color: #fff;
  height: 60px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.phone:last-child {
  border: none;
}
.shxq {
  padding: 10px 0;
  margin-right: 20px;
  margin-left: 25px;
  display: flex;
  text-align: left;
  flex-direction: column;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
.Name_left {
  display: flex;
  align-items: center;
}
.input {
  width: 220px;
  /* margin-right: 20px; */
  display: flex;
  align-items: center;
}
.select_info {
  /* margin-right: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.check_name{
  position: absolute;
  top: 90px;
  right: 20px;
}
.check_name a{
  text-decoration: underline;
  color: rgb(16, 142, 233);
}
.add_venue {
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 15px;
}
.cube-upload {
  margin-top: 10px;
}
</style>