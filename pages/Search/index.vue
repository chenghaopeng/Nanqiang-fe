<template>
	<view class="search-whole">
		<view class="search-control">
			<input v-model="words" placeholder="搜索关键字,空格相隔" @input="handleChange()">
			<button @click="handleSearch"><Am-FontAwesome
					size="40"
					class="fas fa-search"
				></Am-FontAwesome></button>
			{{ results }}
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data () {
			return {
				words: '',
				results: [],
				beginTime: 0,
				endTime: 0,
				count: 0
			}
		},
		methods: {
			handleChange () {
				this.reset()
			},
			handleSearch () {
				this.reset()
				this.update()
			},
			reset () {
				this.results = []
				this.beginTime = Math.round(new Date().getTime() / 1000) - 3600 * 24 * 7
				this.endTime = Math.round(new Date().getTime() / 1000)
				this.count = 20
			},
			update () {
				const words = this.words.split(' ').filter(v => !!v).join(',')
				request(`/search/${this.beginTime}/${this.endTime}/${this.count}/${words}`).then(res => {
					this.results = res.data
					const times = Object.keys(res.data).map(key => parseInt(res.data[key].time))
					this.endTime = Math.max(times)
					this.beginTime = Math.max(times) - 3600 * 24 * 7
				})
			}
		}
	}
</script>

<style lang="less">
	.search-whole {
		display: grid;
		grid-template-columns: 100%;
		gap: 16upx;
		align-items: start;
		.search-control {
			display: grid;
			grid-template-columns: auto 80upx;
			gap: 16upx;
			align-items: center;
			input {
				padding: 16upx 32upx;
				height: 80upx;
				border-radius: 8upx;
				background-color: white;
				box-shadow: 0upx 0upx 8upx 0upx fade(black, 8);
				letter-spacing: 2upx;
			}
			button {
				width: 80upx;
				height: 80upx;
				padding: 0;
				background-color: var(--primary-color);
				color: white;
			}
		}
	}
</style>
