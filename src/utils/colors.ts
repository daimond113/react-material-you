// https://github.com/material-foundation/material-color-utilities/issues/34

import {
	alphaFromArgb,
	redFromArgb,
	greenFromArgb,
	blueFromArgb,
	themeFromSourceColor,
	argbFromRgb,
	type CustomColor,
	Score,
	QuantizerCelebi,
} from "@material/material-color-utilities"

// https://github.com/material-foundation/material-color-utilities/issues/34

export const hexFromArgb = (argb: number): `#${number | string}` => {
	const a = alphaFromArgb(argb)
	const r = redFromArgb(argb)
	const g = greenFromArgb(argb)
	const b = blueFromArgb(argb)
	const outParts = [
		r.toString(16),
		g.toString(16),
		b.toString(16),
		a.toString(16),
	]

	// Pad single-digit output values
	for (const [i, part] of outParts.entries()) {
		if (part.length === 1) {
			outParts[i] = "0" + part
		}
	}

	return ("#" + outParts.join("")) as never
}

// https://github.com/material-foundation/material-color-utilities/pull/51
export async function sourceColorFromImage(image: HTMLImageElement) {
	// Convert Image data to Pixel Array
	const imageBytes = await new Promise<Uint8ClampedArray>((resolve, reject) => {
		const canvas = document.createElement("canvas")
		const context = canvas.getContext("2d")
		if (!context) {
			return reject(new Error("Could not get canvas context"))
		}
		const fin = () => {
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(image, 0, 0)
			let rect = [0, 0, image.width, image.height]
			const { area } = image.dataset
			if (area && /^\d+(\s*,\s*\d+){3}$/.test(area)) {
				rect = area.split(/\s*,\s*/).map((s) => parseInt(s, 10))
			}
			resolve(context.getImageData(rect[0], rect[1], rect[2], rect[3]).data)
		}
		if (image.complete) {
			fin()
		} else {
			image.onload = fin
		}
	})

	// Convert Image data to Pixel Array
	const pixels: number[] = []
	for (let i = 0; i < imageBytes.length; i += 4) {
		const r = imageBytes[i]
		const g = imageBytes[i + 1]
		const b = imageBytes[i + 2]
		const a = imageBytes[i + 3]
		if (a < 255) {
			continue
		}
		const argb = argbFromRgb(r, g, b)
		pixels.push(argb)
	}

	// Convert Pixels to Material Colors
	const result = QuantizerCelebi.quantize(pixels, 128)
	const ranked = Score.score(result)
	const top = ranked[0]
	return top
}

// https://github.com/material-foundation/material-color-utilities/pull/51

export async function themeFromImage(
	image: HTMLImageElement,
	customColors: CustomColor[] = []
) {
	const source = await sourceColorFromImage(image)
	return themeFromSourceColor(source, customColors)
}

export const rgbFromArgb = (
	argb: number
): [r: number, g: number, b: number] => {
	const r = redFromArgb(argb)
	const g = greenFromArgb(argb)
	const b = blueFromArgb(argb)
	return [r, g, b]
}

export const overlapTwoColors = (colorOne: string, colorTwo: string) =>
	`linear-gradient(0deg, ${colorOne}, ${colorOne}), ${colorTwo}`
