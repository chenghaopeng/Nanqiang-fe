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

export default request
