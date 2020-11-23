<template>
	<view class="gallery-whole">
		<xyz-masonry :masonryList="masonryList" :isSize="false" :borderRadius="16"></xyz-masonry>
		<button class="gallery-more">查看更多</button>
	</view>
</template>

<script>
	import XyzMasonry from '../../components/xyz-masonry/xyz-masonry.vue'
	import request from '../../utils/request.js'
	export default {
		comments: {
			XyzMasonry
		},
		data () {
			return {
				io: null,
				time: 0,
				batchSize: 10,
				masonryList: []
			}
		},
		methods: {
			getMore () {
				request(`/gallery/${this.time}/${this.batchSize}`).then(res => {
					this.masonryList = res.data
					this.time = Math.max(...this.masonryList.map(item => item.time))
				})
			}
		},
		mounted () {
			this.io = uni.createIntersectionObserver(this).relativeTo('.gallery-whole')
			this.io.observe('.gallery-more', () => { this.getMore() })
		},
		beforeDestroy () {
			this.io.disconnect()
		}
	}
</script>

<style lang="less">

</style>
