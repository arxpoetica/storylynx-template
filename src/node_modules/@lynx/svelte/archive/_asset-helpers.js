const imageMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif']
const imageExts = /(\.jpeg|\.jpg|\.png|\.svg|\.gif)/gi
const assetToThumb = asset => `${asset.url.split(asset.handle)[0]}resize=w:600,h:600,fit:crop/${asset.handle}`
const isImage = asset => imageMimeTypes.indexOf(asset.mimeType) > -1

export const extractThumb = resource => {

	let thumb = ''
	// handle: "m7XmgYQTSORhwbFDE33w"
	// id: "cjuou3amc1j7c0946unvl6lx4"
	// mimeType: "image/jpeg"
	// url: "https://media.graphcms.com/m7XmgYQTSORhwbFDE33w"

	const internalAsset = resource.internalResources.filter(asset => isImage(asset))[0]
	if (internalAsset) {
		thumb = assetToThumb(internalAsset)
	} else if (resource.internalThumb) {
		thumb = assetToThumb(resource.internalThumb)
	} else if (resource.externalResources.length) {
		const url = resource.externalResources.filter(url => url.match(imageExts))[0]
		if (url) {
			thumb = url
		} else if (resource.externalThumb) {
			thumb = resource.externalThumb
		}
	} else if (resource.externalThumb) {
		thumb = resource.externalThumb
	}

	return thumb
}
