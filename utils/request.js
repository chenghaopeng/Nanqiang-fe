const server = 'http://localhost:5000'

const request = (api = '/', data = {}, method = 'GET') => {
	let url = server + api
	if (method === 'GET') {
		url += '?' + Object.keys(data).map(key => (key + '=' + data[key])).join('&')
	}
	return uni.request({
		url,
		data
	}).then(data => {
		const [err, res] = data
		if (err || res.statusCode !== 200) {
			console.log('ERROR!!')
			return { code: -1 }
		}
		return res.data
	})
}

export const imageProxy = src => {
	//#ifdef H5
		return server + '/gallery/get?src=' + src
	//#endif
	//#ifndef H5
		return src
	//#endif
}

export default request
