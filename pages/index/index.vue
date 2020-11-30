<template>
	<view class="index-whole">
		<component class="index-content" :is="router">{{ router }}</component>
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
	import TabBar from '../../components/TabBar'
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
				router: 'page-home'
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.index-whole {
		padding: 32upx;
		display: flex;
		flex-flow: column nowrap;
		background-color: #eaebec;
		.index-content {
			margin-bottom: var(--tabbar-height);
			min-height: 100vh;
		}
	}
</style>
