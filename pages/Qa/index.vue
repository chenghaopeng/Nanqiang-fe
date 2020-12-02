<template>
	<view class="qa-whole">
		<view class="qa-control">
			<input type="text" :placeholder="placeholder" v-model="text">
			<view class="qa-control-search" @click="handleSearch">知</view>
		</view>
		<p-loading v-if="loading"></p-loading>
		<view v-if="results" class="qa-results">
			<text v-if="results.length === 0">我无知了</text>
			<view v-for="result in results" :key="result.id" @click="$showContent(result.id)" class="qa-result">
				<view class="qa-result-question">{{ result.content }}</view>
				<template v-if="result.commentlist && result.commentlist.length > 0">
					<view class="qa-result-answer" v-for="comment in result.commentlist">{{ comment.content }}</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data () {
			return {
				text: '',
				placeholder: '逸夫楼什么时候关门？',
				loading: false,
				results: null
			}
		},
		methods: {
			handleSearch () {
				this.text = this.text.trim()
				if (!this.text) {
					this.text = this.placeholder
				}
				this.loading = true
				request(`/qa/${this.text}`).then(res => {
					this.loading = false
					this.results = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.qa-whole {
		padding-top: 16upx;
		display: grid;
		grid-template-columns: 100%;
		gap: 48upx;
		.qa-control {
			position: relative;
			filter: drop-shadow(0upx 0upx 32upx fade(black, 8));
			background-color: white;
			border-radius: 48upx;
			input {
				padding-left: 48upx;
				padding-right: 128upx;
				height: 96upx;
				width: 100%;
				letter-spacing: 2upx;
			}
			.qa-control-search {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				height: 96upx;
				width: 96upx;
				top: 0;
				right: 8upx;
				color: white;
				background: var(--primary-color);
				font-weight: bold;
				font-size: large;
				border-radius: 50%;
				transform: scale(1.28);
				box-shadow: 2upx 2upx 4upx 0upx fade(black, 32);
			}
		}
		.qa-results {
			display: grid;
			grid-template-columns: 100%;
			gap: 32upx;
			.qa-result {
				padding: 32upx;
				display: grid;
				grid-template-columns: 100%;
				gap: 16upx;
				background-color: fade(white, 40);
				line-height: 48upx;
				border-radius: 32upx;
				box-shadow: 0upx 0upx 16upx 0upx fade(black, 8);
				.qa-result-question {
					font-size: large;
				}
				.qa-result-answer {
					color: grey;
				}
			}
		}
	}
</style>
