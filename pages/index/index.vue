<template>
	<view class="index-whole">
		<view :class="['index-title', routerNameHiding ? 'index-title-hiding' : '']" v-if="routerNameShow">{{ routerName }}</view>
		<component class="index-content" :is="router"></component>
		<tab-bar class="index-bar" :hook="hook"></tab-bar>
		<page-word></page-word>
		<page-content></page-content>
	</view>
</template>

<script>
	import Home from '../Home'
	import Trend from '../Trend'
	import Love from '../Love'
	import Gallery from '../Gallery'
	import Content from '../Content'
	import Word from '../Word'
	import Search from '../Search'
	import TabBar from '../../components/TabBar.vue'
	export default {
		components: {
			TabBar,
			PageHome: Home,
			PageTrend: Trend,
			PageLove: Love,
			PageGallery: Gallery,
			PageContent: Content,
			PageWord: Word,
			PageSearch: Search
		},
		data() {
			return {
				hook: {
					get: () => this.router,
					set: (router) => {
						this.router = router
					},
				},
				router: null,
				routerNameShow: false,
				routerNameHiding: false,
				routerNameShowTimer: null,
				routerNameShown: []
			}
		},
		created () {
			this.router = 'page-home'
		},
		computed: {
			routerName () {
				const routers = ['page-home', 'page-trend', 'page-love', 'page-gallery', 'page-search']
				const names = ['首页', '趋势', '表白', '画廊', '寻觅']
				return names[routers.indexOf(this.router)]
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
		}
	}
</script>

<style lang="less" scoped>
	.index-whole {
		padding: 32upx;
		display: grid;
		grid-template-columns: 100%;
		gap: 32upx;
		.index-title {
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
			&.index-title-hiding {
				animation: fadeout 0.5s ease-in-out;
			}
		}
		.index-content {
			margin-bottom: calc(var(--tabbar-height) + 32upx);
		}
	}
</style>
