<template>
	<view v-if="show" :class="['popup-whole', hiding ? 'popup-whole-hiding' : '']">
		<view class="popup-container">
			<view class="popup-container-back" @click="handleClose">
				<Am-FontAwesome size="64" class="fas fa-times-circle"></Am-FontAwesome>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'PopupView',
		data () {
			return {
				show: false,
				hiding: false
			}
		},
		mounted () {
			this.$emit('mounted', () => { this.show = true })
		},
		methods: {
			handleClose () {
				this.hiding = true
				setTimeout(() => {
					this.show = false
					this.hiding = false
				}, 200)
			}
		}
	}
</script>

<style lang="less">
	.popup-whole {
		position: fixed;
		left: 4vw;
		top: calc(4vh + var(--window-top));
		width: calc(100% - 8vw);
		height: calc(100% - var(--window-top) - 8vh);
		padding: 64upx;
		backdrop-filter: blur(128upx);
		border-radius: 64upx;
		box-shadow: 0upx 0upx 128upx 0upx fade(black, 32);
		pointer-events: all;
		animation: show 0.2s ease-in-out;
		overflow: hidden;
		&.popup-whole-hiding {
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
		.popup-container {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			.popup-container-back {
				position: absolute;
				right: 32upx;
				top: 32upx;
				height: 64upx;
				width: 64upx;
				color: var(--primary-color);
				filter: drop-shadow(0upx 2upx 4upx fade(black, 32));
			}
		}
	}
</style>
