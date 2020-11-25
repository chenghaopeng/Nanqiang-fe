<template>
	<image :src="src" :style="{ width: width + 'rpx', height: height + 'rpx' }">
</template>

<script>
	import { getImageInfo } from '../utils/request.js'
	export default {
		name: 'AutoSizeImage',
		props: {
			src: {
				type: String,
				default: ''
			},
			width: {
				type: Number,
				default: 400
			}
		},
		data () {
			return {
				height: 300
			}
		},
		mounted () {
			getImageInfo(this.src).then(res => {
				res = res[1]
				this.height = this.width / res.width * res.height
			})
		}
	}
</script>

<style lang="less">

</style>
