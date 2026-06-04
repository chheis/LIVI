import { act, render, screen } from '@testing-library/react'
import { IndicatorLights } from '../IndicatorLights'

describe('IndicatorLights', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test('renders both indicators as inactive by default', () => {
    render(<IndicatorLights />)

    expect(screen.getByLabelText('Left indicator')).toHaveAttribute('data-active', 'false')
    expect(screen.getByLabelText('Right indicator')).toHaveAttribute('data-active', 'false')
  })

  test('blinks the left indicator while it stays enabled', () => {
    render(<IndicatorLights indicatorLeft />)

    expect(screen.getByLabelText('Left indicator')).toHaveAttribute('data-active', 'true')

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(screen.getByLabelText('Left indicator')).toHaveAttribute('data-active', 'false')

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(screen.getByLabelText('Left indicator')).toHaveAttribute('data-active', 'true')
  })

  test('can blink both indicators together', () => {
    render(<IndicatorLights indicatorLeft indicatorRight />)

    expect(screen.getByLabelText('Left indicator')).toHaveAttribute('data-active', 'true')
    expect(screen.getByLabelText('Right indicator')).toHaveAttribute('data-active', 'true')

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(screen.getByLabelText('Left indicator')).toHaveAttribute('data-active', 'false')
    expect(screen.getByLabelText('Right indicator')).toHaveAttribute('data-active', 'false')
  })
})
