<template>
	<view class="index-whole">
		<component class="index-content" :is="router">{{ router }}</component>
		<tab-bar class="index-bar" :hook="hook"></tab-bar>
	</view>
</template>

<script>
	import Home from '../Home'
	import Trend from '../Trend'
	import Love from '../Love'
	import Gallery from '../Gallery'
	import TabBar from '../../components/TabBar'
	export default {
		components: {
			TabBar,
			PageHome: Home,
			PageTrend: Trend,
			PageLove: Love,
			PageGallery: Gallery
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
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		.index-content {
			margin-bottom: var(--tabbar-height);
		}
	}
</style>
