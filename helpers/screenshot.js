import { execSync } from 'child_process'
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import pixelMatch from 'pixelmatch'
import { PNG } from 'pngjs'

const SCREENSHOT_DIR = resolve('./tmp/screenshots')

const SCREENSHOT_OPTIONS = {
	timeout: 1000,
	killSignal: 'SIGKILL',
}

let screenshotIndex = 0

export const takeScreenshot = (componentPath) => {
	const platform = device.getPlatform()

	if (!existsSync(`${SCREENSHOT_DIR}/${componentPath}`)) {
		mkdirSync(`${SCREENSHOT_DIR}/${componentPath}`)
	}
	const screenshotFilename = `${SCREENSHOT_DIR}/${componentPath}/screenshot-${screenshotIndex++}.png`
	switch (platform) {
		case 'ios':
			execSync(
				`xcrun simctl io booted screenshot ${screenshotFilename}`,
				SCREENSHOT_OPTIONS,
			)
			break
		case 'android':
			execSync(`adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > ${screenshotFilename}
`)
			break
		default:
			return console.warn(`Unsupported OS: ${platform}, screenshots disabled`)
	}
}

export const pixelDiff = (componentPath) => {
	const COMPONENT_PATH = `${SCREENSHOT_DIR}/${componentPath}`
	const img1 = PNG.sync.read(
		readFileSync(`${COMPONENT_PATH}/screenshot-0.png`),
	)
	const img2 = PNG.sync.read(
		readFileSync(`${COMPONENT_PATH}/screenshot-1.png`),
	)
	const { width, height } = img1
	const diff = new PNG({ width, height })

	pixelMatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 })

	writeFileSync(`${COMPONENT_PATH}/diff.png`, PNG.sync.write(diff))
}
