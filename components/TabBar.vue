<template>
	<view class="tabbar-whole">
		<view :class="['tabbar-title', routerNameHiding ? 'tabbar-title-hiding' : '']" v-if="routerNameShow">{{ routerName }}</view>
		<view class="tabbar-tabs">
			<Am-FontAwesome
				v-for="tab in tabs"
				:key="tab.router"
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
						icon: 'question-circle',
						router: 'page-qa',
						size: 66
					},
					{
						icon: 'image',
						router: 'page-gallery',
						size: 78
					}
				],
				routerNameShow: false,
				routerNameHiding: false,
				routerNameShowTimer: null,
				routerNameShown: []
			}
		},
		methods: {
			handleTabChange (router) {
				if (router === this.hook.get()) return
				this.hook.set(router)
			}
		},
		computed: {
			routerName () {
				const routers = ['page-home', 'page-trend', 'page-love', 'page-gallery', 'page-search', 'page-qa']
				const names = ['首页', '趋势', '表白', '画廊', '寻觅', '欲知']
				return names[routers.indexOf(this.hook.get())]
			}
		},
		watch: {
			routerName (n) {
				if (this.routerNameShown.indexOf(n) >= 0) return
				this.routerNameShown.push(n)
				this.routerNameShow = true
				this.routerNameHiding = false
				if (this.routerNameShowTimer) clearTimeout(this.routerNameShowTimer)
				this.routerNameShowTimer = setTimeout(() => {
					this.routerNameHiding = true
					this.routerNameShowTimer = setTimeout(() => {
						this.routerNameShow = false
						this.routerNameHiding = false
						this.routerNameShowTimer = null
					}, 500)
				}, 2000)
			}
		},
		created () {
			this.hook.set('page-home')
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
		.tabbar-title {
			position: fixed;
			bottom: calc(var(--tabbar-height) + 8vw);
			left: 50%;
			padding: 16upx 64upx;
			transform: translatex(-50%);
			font-size: 64upx;
			font-weight: 100;
			background-color: fade(white, 8);
			backdrop-filter: blur(32upx);
			border-style: solid;
			border-width: 2upx;
			border-color: fade(#4D57C1, 24);
			border-radius: 32upx;
			z-index: 200;
			animation: fadein 0.5s ease-in-out;
			box-shadow: 0upx 0upx 64upx 0upx fade(black, 16);
			&.tabbar-title-hiding {
				animation: fadeout 0.5s ease-in-out;
			}
		}
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
