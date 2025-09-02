export const uploadGoogleService = {
	uploadGoogleImg,
}

async function uploadGoogleImg(imgFile) {
	const CLOUD_NAME = 'dqsm2zdx5'
	const UPLOAD_PRESET = 'rare-bnb'
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

	const formData = new FormData()
	
    // Building the request body
	formData.append('file', imgFile)
	formData.append('upload_preset', UPLOAD_PRESET)
	
    // Sending a post method request to Cloudinary API
	try {
		const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
		const imgData = await res.json()
		return imgData.secure_url
	} catch (err) {
		console.error(err)
		throw err
	}
}