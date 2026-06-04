import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Box, useTheme } from '@mui/material'
import * as React from 'react'

export type IndicatorLightsProps = {
  indicatorLeft?: boolean
  indicatorRight?: boolean
  className?: string
}

const BLINK_INTERVAL_MS = 500

export function IndicatorLights({
  indicatorLeft = false,
  indicatorRight = false,
  className
}: IndicatorLightsProps) {
  const theme = useTheme()
  const [blinkOn, setBlinkOn] = React.useState(true)
  const hasActiveIndicator = indicatorLeft || indicatorRight

  React.useEffect(() => {
    if (!hasActiveIndicator) {
      setBlinkOn(true)
      return
    }

    setBlinkOn(true)
    const interval = window.setInterval(() => setBlinkOn((prev) => !prev), BLINK_INTERVAL_MS)
    return () => window.clearInterval(interval)
  }, [hasActiveIndicator])

  const activeColor = theme.palette.success.main
  const inactiveColor = theme.palette.text.disabled

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2.5,
        minWidth: 0
      }}
    >
      <Box
        aria-label="Left indicator"
        data-active={indicatorLeft && blinkOn}
        sx={{
          display: 'grid',
          placeItems: 'center',
          color: indicatorLeft && blinkOn ? activeColor : inactiveColor,
          opacity: indicatorLeft ? (blinkOn ? 1 : 0.18) : 0.35,
          transition: 'opacity 120ms linear, color 120ms linear'
        }}
      >
        <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 42 }} />
      </Box>

      <Box
        aria-label="Right indicator"
        data-active={indicatorRight && blinkOn}
        sx={{
          display: 'grid',
          placeItems: 'center',
          color: indicatorRight && blinkOn ? activeColor : inactiveColor,
          opacity: indicatorRight ? (blinkOn ? 1 : 0.18) : 0.35,
          transition: 'opacity 120ms linear, color 120ms linear'
        }}
      >
        <KeyboardDoubleArrowRightIcon sx={{ fontSize: 42 }} />
      </Box>
    </Box>
  )
}
