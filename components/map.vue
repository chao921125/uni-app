<template>
  <view class="map-container">
    <!-- 地图组件 -->
    <map 
      id="map"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      :scale="scale"
      @markertap="onMarkerTap"
      @tap="onMapTap"
      style="width: 100%; height: 100%;"
    >
      <!-- 自定义气泡 -->
      <cover-view 
        v-if="showCallout" 
        class="custom-callout"
        :style="calloutStyle"
      >
        <cover-view class="callout-header">
          <cover-view class="callout-title">{{ calloutData.title }}</cover-view>
          <cover-view class="close-btn" @tap="hideCallout">×</cover-view>
        </cover-view>
        <cover-view class="callout-content">
          <cover-view class="callout-desc">{{ calloutData.description }}</cover-view>
          <cover-view class="callout-meta">
            <cover-view class="meta-item">
              📍 {{ calloutData.distance }}公里
            </cover-view>
            <cover-view class="meta-item">
              ⭐ {{ calloutData.rating }}
            </cover-view>
            <cover-view class="meta-item">
              ⏰ {{ calloutData.openStatus }}
            </cover-view>
          </cover-view>
        </cover-view>
        <cover-view class="callout-footer">
          <cover-view class="action-btn primary" @tap="navigateToPoint">导航到这里</cover-view>
          <cover-view class="action-btn secondary" @tap="showDetails">查看详情</cover-view>
        </cover-view>
        <cover-view class="callout-arrow"></cover-view>
      </cover-view>
    </map>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 地图中心点
const latitude = ref(39.90923);
const longitude = ref(116.397428);
const scale = ref(14);

// 标记点数据
const markers = ref([
  {
    id: 1,
    latitude: 39.90923,
    longitude: 116.397428,
    title: "中央公园",
    iconPath: "/static/marker.png",
    width: 30,
    height: 40
  },
  {
    id: 2,
    latitude: 39.91823,
    longitude: 116.403428,
    title: "科技博物馆",
    iconPath: "/static/marker.png",
    width: 30,
    height: 40
  },
  {
    id: 3,
    latitude: 39.90423,
    longitude: 116.390428,
    title: "滨江步行道",
    iconPath: "/static/marker.png",
    width: 30,
    height: 40
  },
  {
    id: 4,
    latitude: 39.89923,
    longitude: 116.410428,
    title: "城市购物中心",
    iconPath: "/static/marker.png",
    width: 30,
    height: 40
  }
]);

// 气泡相关状态
const showCallout = ref(false);
const calloutStyle = ref({
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -100%)',
  opacity: 0,
  transition: 'all 0.4s ease'
});
const calloutData = ref({
  id: null,
  title: "",
  description: "",
  distance: "",
  rating: "",
  openStatus: ""
});

// 处理标记点点击
const onMarkerTap = (e) => {
  const markerId = e.detail.markerId;
  const marker = markers.value.find(m => m.id === markerId);
  
  if (!marker) return;
  
  // 设置气泡数据
  calloutData.value = {
    id: marker.id,
    title: marker.title,
    description: getMarkerDescription(marker.id),
    distance: getDistance(marker.id),
    rating: getRating(marker.id),
    openStatus: getOpenStatus(marker.id)
  };
  
  // 使用相对位置（在实际应用中，您可以根据需要调整位置）
  const positions = {
    1: { left: '30%', top: '40%' },
    2: { left: '65%', top: '35%' },
    3: { left: '45%', top: '70%' },
    4: { left: '75%', top: '60%' }
  };
  
  // 设置气泡位置
  calloutStyle.value = {
    ...positions[marker.id],
    transform: 'translate(-50%, calc(-100% - 20px))',
    opacity: 1,
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
  };
  
  // 显示气泡
  showCallout.value = true;
};

// 处理地图点击（关闭气泡）
const onMapTap = () => {
  hideCallout();
};

// 隐藏气泡
const hideCallout = () => {
  calloutStyle.value = {
    ...calloutStyle.value,
    opacity: 0,
    transform: 'translate(-50%, -100%)'
  };
  
  setTimeout(() => {
    showCallout.value = false;
  }, 400);
};

// 导航到点
const navigateToPoint = () => {
  uni.showToast({
    title: `开始导航到 ${calloutData.value.title}`,
    icon: 'none'
  });
  
  // 实际项目中可以打开地图导航
  uni.openLocation({
    latitude: markers.value.find(m => m.id === calloutData.value.id).latitude,
    longitude: markers.value.find(m => m.id === calloutData.value.id).longitude,
    name: calloutData.value.title,
    address: calloutData.value.description
  });
};

// 查看详情
const showDetails = () => {
  uni.navigateTo({
    url: `/pages/location/detail?id=${calloutData.value.id}`
  });
};

// 获取标记点描述信息
const getMarkerDescription = (id) => {
  const descriptions = {
    1: "城市最大的绿地公园，拥有丰富的植物种类和休闲设施，是市民休闲娱乐的好去处。",
    2: "现代化的科技展览馆，展示最新科技成果和科学原理，适合家庭和学校参观。",
    3: "沿河而建的景观步道，全长5公里，沿途设有休息区和观景平台。",
    4: "大型综合性购物中心，拥有超过200家店铺和多家餐饮场所。"
  };
  return descriptions[id] || "暂无描述信息";
};

// 获取距离信息
const getDistance = (id) => {
  const distances = { 1: "1.2", 2: "2.5", 3: "0.8", 4: "3.1" };
  return distances[id] || "0";
};

// 获取评分信息
const getRating = (id) => {
  const ratings = { 1: "4.8/5", 2: "4.6/5", 3: "4.7/5", 4: "4.5/5" };
  return ratings[id] || "5/5";
};

// 获取开放状态
const getOpenStatus = (id) => {
  const statuses = {
    1: "06:00-22:00",
    2: "09:00-17:00",
    3: "全天开放",
    4: "10:00-22:00"
  };
  return statuses[id] || "09:00-18:00";
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.custom-callout {
  position: absolute;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 260px;
  z-index: 100;
  transform: translate(-50%, calc(-100% - 20px));
}

.callout-arrow {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid white;
}

.callout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.callout-title {
  font-size: 18px;
  font-weight: bold;
  color: #2f3542;
}

.close-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f1f2f6;
  color: #747d8c;
  font-size: 18px;
}

.callout-content {
  margin-bottom: 15px;
}

.callout-desc {
  font-size: 14px;
  color: #57606f;
  line-height: 1.6;
  margin-bottom: 12px;
}

.callout-meta {
  display: flex;
  font-size: 12px;
  color: #747d8c;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.callout-footer {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.action-btn.primary {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
}

.action-btn.secondary {
  background: #f1f2f6;
  color: #2f3542;
}
</style>