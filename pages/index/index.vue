<template>
	<view class="index-whole">
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
	import Qa from '../Qa'
	import TabBar from '../../components/TabBar.vue'
	export default {
		components: {
			TabBar,
			PageHome: Home,
			PageTrend: Trend,
			PageLove: Love,
			PageGallery: Gallery,
			PageQa: Qa,
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
				router: null
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
		.index-content {
			margin-bottom: calc(var(--tabbar-height) + 32upx);
		}
	}
</style>
