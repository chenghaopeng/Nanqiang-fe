<template>
	<view class="tabbar-whole">
		<view class="tabbar-tabs">
			<Am-FontAwesome
				v-for="tab in tabs"
				:size="tab.size"
				:class="['tabbar-tab', hook.get().startsWith(tab.router) ? 'checked' : '', 'fas', 'fa-' + tab.icon]"
				@click="handleTabChange(tab.router)"
			></Am-FontAwesome>
			<view class="tabbar-tab-search">
				<Am-FontAwesome
					size="64"
					:class="['fas', 'fa-search']"
					@click="handleTabChange('page-search')"
				></Am-FontAwesome>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TabBar',
		props: ['hook'],
		data () {
			return {
				tabs: [
					{
						icon: 'home',
						router: 'page-home',
						size: 64
					},
					{
						icon: 'chart-line',
						router: 'page-trend',
						size: 70
					},
					{
						icon: 'heart',
						router: 'page-love',
						size: 64
					},
					{
						icon: 'image',
						router: 'page-gallery',
						size: 78
					}
				]
			}
		},
		methods: {
			handleTabChange (router) {
				if (router === this.hook.get()) return
				this.hook.set(router)
			}
		}
	}
</script>

<style lang="less" scoped>
	.tabbar-whole {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		height: var(--tabbar-height);
		padding: 0upx 64upx;
		border-top-left-radius: calc(var(--tabbar-height) / 2);
		border-top-right-radius: calc(var(--tabbar-height) / 4);
		background-color: fade(white, 64);
		box-shadow: 0upx 0upx calc(var(--tabbar-height) / 4) 0upx fade(black, 16%);
		backdrop-filter: blur(64upx) saturate(150%) brightness(150%);
		.tabbar-tabs {
			height: 100%;
			width: 100%;
			display: grid;
			grid-template-columns: repeat(5, auto);
			gap: 48upx;
			justify-items: center;
			align-items: center;
			.tabbar-tab {
				color: #CCCCCC;
				transition: 0.2s ease-in-out;
				filter: drop-shadow(2upx 2upx 4upx fade(black, 16));
				&.checked {
					color: var(--primary-color);
					animation-name: twinkle;
					animation-duration: 0.2s;
					animation-timing-function: ease-in-out;
				}
				@keyframes twinkle {
					0%, 100% { transform: scale(1); }
					50% { transform: scale(1.5); }
				}
			}
			.tabbar-tab-search {
				--size: calc(var(--tabbar-height) * 2 / 3);
				width: calc(var(--size) * 0.8);
				> view {
					height: var(--size);
					width: var(--size);
					transform: translate(0upx, calc(var(--size) * -0.5));
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: var(--primary-color);
					color: white;
					border-radius: calc(var(--size) * 0.25);
				}
			}
		}
	}
</style>
