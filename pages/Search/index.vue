<template>
	<view class="search-whole">
		<view class="search-control">
			<input v-model="words" placeholder="搜索关键字,空格相隔">
			<button @click="handleSearch">
				<Am-FontAwesome size="40" class="fas fa-search"></Am-FontAwesome>
			</button>
		</view>
		<option-card :options="['说说', '图片']" @change="handleTypeChange"></option-card>
		<view class="search-results">
			<view
				v-for="result in results.filter(v => v.type === type)"
				:key="result.key"
				class="search-result"
				@click="handleClick(result.id)"
			>
				<view v-if="result.type === 0" :style="{ backgroundSize: 'cover', backgroundImage: ((result.content || !result.piclist) ? '' : `url(${imageProxy(result.piclist[0])})`) }">{{ result.content }}</view>
				<image v-if="result.type === 1" :src="imageProxy(result.src)" mode="aspectFill" lazy-load>
			</view>
		</view>
		<p-loading v-show="loading"></p-loading>
		<button v-show="results.length && !loading" class="search-more" @click="update">查看更多</button>
	</view>
</template>

<script>
	import OptionCard from '../../components/OptionCard.vue'
	import request, { imageProxy } from '../../utils/request.js'
	export default {
		components: {
			OptionCard
		},
		data () {
			return {
				io: null,
				type: 0,
				loading: 0,
				words: '',
				results: [],
				beginTime: 0,
				endTime: 0,
				count: 0
			}
		},
		methods: {
			imageProxy,
			handleSearch () {
				if (!this.words.trim()) return
				this.reset()
				this.update()
			},
			handleTypeChange (type) {
				this.type = type
			},
			handleClick (id) {
				this.$showContent(id)
			},
			reset () {
				this.results = []
				this.endTime = Math.round(new Date().getTime() / 1000)
				this.beginTime = 0
				this.count = 20
				this.current = 0
				this.loading = 0
			},
			update () {
				if (this.loading) return
				const words = this.words.toLowerCase().split(' ').map(v => v.trim()).filter(v => !!v).join(',')
				if (!words) return
				if (this.endTime > 0 && this.type === 0) {
					this.loading++
					request(`/search/${this.beginTime}/${this.endTime}/${this.count}/${words}`).then(res => {
						const times = Object.keys(res.data).sort((a, b) => (b - a))
						this.results = this.results.concat(times.map((time, index) => { return { type: 0, key: `${time}${index}`,  ...res.data[time] } }))
						if (times.length) this.endTime = times[times.length - 1] - 1
						else this.endTime = 0
						this.beginTime = 0
						this.loading--
					})
				}
				if (this.current >= 0 && this.type === 1) {
					this.loading++
					request(`/gallery/types/${this.current}/${this.current + this.count}/${words}`).then(res => {
						this.results = this.results.concat(res.data.map((item, index) => { return { type: 1, key: `${item.id}${index}${item.src}`, ...item } }))
						this.current += this.count
						this.loading--
						if (res.data.length === 0) this.current = -1
					})
				}
			}
		},
		mounted () {
			this.io = uni.createIntersectionObserver(this).relativeTo('.tabbar-whole')
			this.io.observe('.search-more', () => { this.update() })
		},
		beforeDestroy () {
			this.io.disconnect()
		}
	}
</script>

<style lang="less">
	.search-whole {
		display: grid;
		grid-template-columns: 100%;
		gap: 32upx;
		align-items: start;
		align-content: start;
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
		.search-results {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 32upx;
			.search-result {
				width: 100%;
				height: 256upx;
				border-radius: 16upx;
				background-color: fade(white, 64);
				box-shadow: 0upx 0upx 16upx 0upx fade(black, 16);
				animation: fadein 0.5s ease-in-out;
				overflow: hidden;
				* {
					width: 100%;
					height: 100%;
				}
				view {
					padding: 16upx;
				}
			}
		}
		.search-more {
			width: 100%;
		}
	}
</style>
