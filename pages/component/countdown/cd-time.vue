<template>
	<text>{{ countdown }}</text>
</template>

<script>
	export default {
		props: {
			type: {
				type: [String, Number], // 1 dhms 2 hms 3 s
				default: 1
			},
			seconds: {
				type: Number,
				default: 0
			},
			startDate: {
				type: [Date, String],
				default: ""
			},
			endDate: {
				type: [Date, String],
				default: ""
			}
		},
		data() {
			return {
				countdown: "",
				secondsTime: 0,
				time: null
			};
		},
		created() {
			// 初始化数值
			if (this.seconds) {
			      this.secondsTime = this.seconds;
			} else {
				if (this.startDate && this.endDate) {
			        this.secondsTime = Math.round((new Date(this.endDate.replace(/-/g, '/')).getTime() - new Date(this.startDate.replace(/-/g, '/')).getTime()) / 1000);
				}
				if (!this.startDate && this.endDate) {
					this.secondsTime = Math.round((new Date(this.endDate.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000);
				}
			}
		},
		mounted() {
			this.initTime();
		},
		beforeDestroy() {
			clearInterval(this.time);
		},
		methods: {
			initTime() {
				let _this = this;
				if (this.time) clearInterval(this.time);
				this.time = setInterval(() => {
					let d = parseInt(_this.secondsTime / (24 * 60 * 60));
					d = _this.formatTime(d);
					let h = parseInt(_this.secondsTime / (60 * 60) % 24);
					h = _this.formatTime(h);
					let m = parseInt(_this.secondsTime / 60 % 60);
					m = _this.formatTime(m);
					let s = parseInt(_this.secondsTime % 60);
					s = _this.formatTime(s);
					if (_this.type === 1) {
						_this.countdown = d + ':' + h + ':' + m + ':' + s;
					} else if (_this.type === 2) {
						_this.countdown = h + ':' + m + ':' + s;
					} else if (_this.type === 3) {
						_this.countdown = s;
					}
					_this.secondsTime--;
					if (_this.secondsTime < 0) {
						clearInterval(this.time);
						_this.$emit("end");
					}
				}, 1000)
			},
			formatTime(val) {
				val = Number(val);
				val = val < 0 ? 0 : val;
				return val < 10 ? `0${val}` : `${val}`;
			}
		}
	}
</script>

<style scoped lang="scss"></style>
