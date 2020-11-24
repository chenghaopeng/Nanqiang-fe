<template>
	<view class="gallery-whole">
		<xyz-masonry
			:masonryList="masonryList"
			:isSize="false"
			:borderRadius="16"
			:imgWidth="320"
		></xyz-masonry>
		<button v-if="hasMore" v-show="!loading" class="gallery-more">查看更多</button>
		<text v-else>到底啦！</text>
	</view>
</template>

<script>
	import XyzMasonry from '../../components/xyz-masonry/xyz-masonry.vue'
	import request, { imageProxy } from '../../utils/request.js'
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
				hasMore: true,
				loading: false
			}
		},
		methods: {
			getMore () {
				if (!this.hasMore || this.loading) return
				this.loading = true
				request(`/gallery/${this.time}/${this.batchSize}`).then(res => {
					this.masonryList = Array.from(new Set(res.data)).map(item => { return { ...item, src: imageProxy(item.src) } })
					this.time = Math.min(this.time, ...this.masonryList.map(item => item.time))
					this.hasMore = !!this.masonryList.length
					this.loading = false
				})
			}
		},
		mounted () {
			this.io = uni.createIntersectionObserver(this).relativeTo('.tabbar-whole')
			this.io.observe('.gallery-more', () => { this.getMore() })
		},
		beforeDestroy () {
			this.io.disconnect()
		}
	}
</script>

<style lang="less">

</style>
