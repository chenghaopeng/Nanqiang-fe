<template>
	<view class="gallery-whole">
		<xyz-masonry
			:masonryList="masonryList"
			:isSize="false"
			:borderRadius="16"
			:imgWidth="320"
		></xyz-masonry>
		<button v-if="hasMore" class="gallery-more">查看更多</button>
		<text v-else>到底啦！</text>
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
				time: Number.MAX_SAFE_INTEGER,
				batchSize: 10,
				masonryList: [],
				hasMore: true
			}
		},
		methods: {
			getMore () {
				request(`/gallery/${this.time}/${this.batchSize}`).then(res => {
					this.masonryList = res.data
					this.time = Math.min(this.time, ...this.masonryList.map(item => item.time))
					this.hasMore = !!this.masonryList.length
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
