<template>
	<view class="p-loading-whole">
		<view class="p-loading-circle"></view>
		<view class="p-loading-circle"></view>
		<view class="p-loading-circle"></view>
	</view>
</template>

<script>
	export default {
		name: 'PLoading',
		data () {
			return {
			}
		}
	}
</script>

<style lang="less">
	.p-loading-whole {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 32upx);
		gap: 16upx;
		justify-content: center;
		.p-loading-circle {
			width: 32upx;
			height: 32upx;
			border-radius: 8upx;
			background-color: var(--primary-color);
			animation-name: twinkle;
			animation-timing-function: ease-in-out;
			animation-duration: 1s;
			animation-direction: alternate-reverse;
			animation-iteration-count: infinite;
			animation-play-state: running;
		}
		.p-loading-circle:nth-child(1) {
			animation-delay: 0s;
		}
		.p-loading-circle:nth-child(2) {
			animation-delay: 0.1s;
		}
		.p-loading-circle:nth-child(3) {
			animation-delay: 0.2s;
		}
		@keyframes twinkle {
			0% { opacity: 1; transform: scale(1); }
			75% { opacity: 0.9; transform: scale(0.75); }
			100% { opacity: 0.7; transform: scale(0.5); }
		}
	}
</style>
