<template>
	<view v-if="show" :class="['content-whole', hiding ? 'content-whole-hiding' : '']">
		<view class="content-container">
			<view class="content-container-back" @click="handleClose">
				<Am-FontAwesome size="64" class="fas fa-times-circle"></Am-FontAwesome>
			</view>
			<view class="content-container-whole">
				<view class="content-container-whole-content">
					{{ content }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				show: false,
				hiding: false,
				id: null,
				loading: false,
				content: null
			}
		},
		methods: {
			load (id) {
				this.id = id
				this.loading = true
				this.show = true
				request('/content/' + id).then(res => {
					this.loading = false
					if (res.code === 0) this.content = res.data
					else this.content = null
				})
			},
			handleClose () {
				this.hiding = true
				setTimeout(() => {
					this.show = false
					this.hiding = false
				}, 200)
			}
		},
		mounted () {
			Vue.prototype.$showContent = id => {
				this.load(id)
			}
		}
	}
</script>

<style lang="less">
	.content-whole {
		position: fixed;
		left: 8vw;
		top: 8vh;
		width: calc(100% - 16vw);
		height: calc(100% - 16vh);
		padding: 64upx;
		backdrop-filter: blur(128upx);
		border-radius: 64upx;
		box-shadow: 0upx 0upx 128upx 0upx fade(black, 32);
		pointer-events: all;
		animation: show 0.2s ease-in-out;
		overflow: hidden;
		&.content-whole-hiding {
			animation: hide 0.2s ease-in-out;
		}
		@keyframes show {
			0% { transform: scale(0.75); opacity: 0; }
			75% { transform: scale(1.1); opacity: 1; }
			100% { transform: scale(1); opacity: 1; }
		}
		@keyframes hide {
			0% { transform: scale(1); opacity: 1; }
			25% { transform: scale(1.1); opacity: 0.5; }
			100% { transform: scale(0.75); opacity: 0; }
		}
		.content-container-back {
			position: absolute;
			right: 32upx;
			top: 32upx;
			height: 64upx;
			width: 64upx;
			color: var(--primary-color);
			filter: drop-shadow(0upx 2upx 4upx fade(black, 32));
		}
		.content-container {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			.content-container-whole {
			}
		}
	}
</style>
