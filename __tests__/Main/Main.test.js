import React from 'react'
import { render, fireEvent, waitForElement } from 'react-native-testing-library'
import mockDate from 'mockdate'

import Main from '../../src/components/Main'
import testProps from '../../src/components/Main/testProps'

jest.mock('NativeAnimatedHelper')

const frameTime = 10

global.requestAnimationFrame = cb => {
	// Default implementation of requestAnimationFrame calls setTimeout(cb, 0),
	// which will result in a cascade of timers - this generally pisses off test runners
	// like Jest who watch the number of timers created and assume an infinite recursion situation
	// if the number gets too large.
	//
	// Setting the timeout simulates a frame every 1/100th of a second
	setTimeout(cb, frameTime)
}

global.timeTravel = (time = frameTime) => {
	const tickTravel = () => {
		// The React Animations module looks at the elapsed time for each frame to calculate its
		// new position
		const now = Date.now()
		mockDate.set(new Date(now + frameTime))

		// Run the timers forward
		jest.advanceTimersByTime(frameTime)
	}

	// Step through each of the frames
	const frames = time / frameTime
	let framesEllapsed
	for (framesEllapsed = 0; framesEllapsed < frames; framesEllapsed++) {
		tickTravel()
	}
}

describe('Main', () => {
	test('clicking button should increment step text', async () => {
		const { getByText, queryAllByA11yLabel } = render(<Main />)
		const incrementButton = queryAllByA11yLabel('Change Message')

		expect(incrementButton).toHaveLength(1)

		fireEvent(incrementButton[0], 'press')

		await waitForElement(() => {
			getByText(testProps.motdTextOptions[1])
		})
	})
})

describe('AnimatedButton', () => {
	beforeEach(() => {
		// As part of constructing the Animation, it will grab the
		// current time. Mocking the date right away ensures everyone
		// is starting from the same time
		mockDate.set(0)

		// Need to fake the timers for timeTravel to work
		jest.useFakeTimers()
	})

	test('clicking animation button makes the circle leave the screen', async () => {
		const { getByTestId, queryAllByA11yLabel } = render(<Main />)

		const button = queryAllByA11yLabel('Click to Toggle Animation')
		expect(button).toHaveLength(1)

		fireEvent(button[0], 'press')
		const parseData = data =>
			data._fiber.memoizedProps.style[1].transform[1].translateX._parent._value

		// AnimatedValue should be 0
		const data0 = getByTestId('animated-bouncing-button-container')
		expect(parseData(data0)).toBe(0)

		// After 2000ms the value should be 50
		global.timeTravel(2000)
		const data50 = getByTestId('animated-bouncing-button-container')
		expect(parseData(data50)).toBe(50)

		// After 4000ms value should be 100
		global.timeTravel(4000)
		const data100 = getByTestId('animated-bouncing-button-container')
		expect(parseData(data100)).toBe(100)
	})
})
