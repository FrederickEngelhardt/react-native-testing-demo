import testProps from '../src/components/Main/testProps'
import { takeScreenshot, pixelDiff } from '../helpers/screenshot'

/**
 * [device, element, by] from detox
 */
describe('App', () => {
	beforeEach(async () => {
		await device.reloadReactNative()
	})

	afterEach(async () => {
		takeScreenshot('App')
	})

	afterAll(async () => {
		pixelDiff('App')
	})

	it('should show nav and main-screen', async () => {
		await expect(element(by.id('nav'))).toBeVisible()
		await expect(element(by.id('screen-main'))).toBeVisible()
	})

	describe('Message Of The Day', () => {
		it('should clicking the button should display the next text option', async () => {
			const tap = async () => element(by.id('change-message-button')).tap()

			await tap()
			await expect(element(by.text(testProps.motdTextOptions[1]))).toBeVisible()

			await tap()
			await expect(element(by.text(testProps.motdTextOptions[2]))).toBeVisible()
		})
	})

	describe('Animated Circle', () => {
		it('should leave the screen after being clicked', async () => {
			await element(by.id('animated-bouncing-button')).tap()
			await expect(
				element(by.id('animated-bouncing-button-container')),
			).toBeNotVisible()
		})
	})
})
