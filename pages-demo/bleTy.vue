<template>
  <view>
    <button @click="start">开始连接</button>
    <button @click="sendCmd">发送指令</button>
    <button @click="disconnect">断开连接</button>
  </view>
</template>

<script setup>
import { onMounted } from 'vue';
import BluetoothManager from '@/utils/BluetoothManager.js';

const bt = new BluetoothManager();

onMounted(() => {
  // 监听设备返回数据
  bt.onDataReceived((hex, buffer) => {
    console.log('收到数据:', hex);
  });

  bt.onConnectionStateChanged((connected) => {
    console.log('连接状态:', connected ? '已连接' : '已断开');
  });
});

async function start() {
  try {
    await bt.init();
    const devices = await bt.startDiscovery(['FEE7']); // 替换为你的 service UUID
    if (devices.length === 0) {
      uni.showToast({ title: '未找到设备', icon: 'none' });
      return;
    }
    const target = devices[0]; // 通常选第一个或根据 name 过滤
    await bt.connect(target.deviceId);

    const services = await bt.getServices(target.deviceId);
    const service = services.find(s => s.uuid.toUpperCase().includes('FFF0')); // 替换为你需要的 UUID
    bt.serviceId = service.uuid;

    const chars = await bt.getCharacteristics(target.deviceId, service.uuid);
    const writeChar = chars.find(c => c.properties.write);
    const notifyChar = chars.find(c => c.properties.notify || c.properties.indicate);
    bt.characteristicId = notifyChar.uuid;

    await bt.enableNotify(target.deviceId, service.uuid, notifyChar.uuid);
    uni.showToast({ title: '连接成功', icon: 'success' });
  } catch (err) {
    uni.showToast({ title: '操作失败', icon: 'error' });
  }
}

async function sendCmd() {
  try {
    await bt.writeHex('FE660021'); // 示例指令
  } catch (err) {
    console.error(err);
  }
}

async function disconnect() {
  await bt.disconnect();
  await bt.closeAdapter();
}
</script>