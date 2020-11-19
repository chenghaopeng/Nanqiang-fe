<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	:root {
		--primary-color: #4D57C1;
		--tabbar-height: 180upx;
	}
	* {
		box-sizing: border-box;
	}
</style>
