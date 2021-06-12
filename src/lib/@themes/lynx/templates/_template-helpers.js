import { view_height } from 'storylynx/stores/story-store.js'
import { get } from 'svelte/store'

export const animate_asset = (elem, clip, index, intersecting, scroll) => {
	const group = clip.assets_bin[index]
	if (intersecting && elem && group && group.transition) {
		const transition = group && group.transition
		const { top, height } = elem.getBoundingClientRect()
		const threshold = 1 - Math.min(Math.max((top + height) / (get(view_height) + height), 0), 1)
		if (transition === 'ZoomIn') {
			return `transform:scale(${1 + (threshold * 0.25)});`
		} else if (transition === 'ZoomOut') {
			return `transform:scale(${1.25 - (threshold * 0.25)});`
		}

		return ''
	}
	return ''
}

export const get_audio_in_range = (clip, range) => {
	const in_range = []
	for (let audio_clip of clip.audio_clips) {
		const range_length = audio_clip.clips_in_range.length
		const where_in_range = range === 'start' ? 0 : range_length - 1
		if (
			range_length
			&& audio_clip.clips_in_range[where_in_range].id === clip.id
			&& audio_clip.audio_asset.mime_type.includes('audio')
		) {
			in_range.push(audio_clip.id)
		}
	}
	return in_range
}
