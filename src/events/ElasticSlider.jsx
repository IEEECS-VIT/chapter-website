import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const MAX_OVERFLOW = 50

export default function ElasticSlider({
  value,
  onChange,
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <>-</>,
  rightIcon = <>+</>
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 w-full ${className}`}>
      <Slider
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    </div>
  )
}

function Slider({ value: controlledValue, onChange, defaultValue, startingValue, maxValue, isStepped, stepSize, leftIcon, rightIcon }) {
  const [value, setValue] = useState(defaultValue)
  const sliderRef = useRef(null)
  const [region, setRegion] = useState('middle')
  const [sliderWidth, setSliderWidth] = useState(0)
  const clientX = useMotionValue(0)
  const overflow = useMotionValue(0)
  const scale = useMotionValue(1)

  useEffect(() => {
    if (typeof controlledValue === 'number') setValue(controlledValue)
  }, [controlledValue])

  useEffect(() => {
    if (!sliderRef.current) return
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setSliderWidth(entry.contentRect.width)
      }
    })
    observer.observe(sliderRef.current)
    return () => observer.disconnect()
  }, [])

  useMotionValueEvent(clientX, 'change', latest => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect()
      let newValue
      if (latest < left) {
        setRegion('left')
        newValue = left - latest
      } else if (latest > right) {
        setRegion('right')
        newValue = latest - right
      } else {
        setRegion('middle')
        newValue = 0
      }
      overflow.set(decay(newValue, MAX_OVERFLOW))
    }
  })

  const handlePointerMove = e => {
    if (e.buttons > 0 && sliderWidth > 0 && sliderRef.current) {
      const { left } = sliderRef.current.getBoundingClientRect()
      let newValue = startingValue + ((e.clientX - left) / sliderWidth) * (maxValue - startingValue)
      if (isStepped) newValue = Math.round(newValue / stepSize) * stepSize
      newValue = Math.min(Math.max(newValue, startingValue), maxValue)
      setValue(newValue)
      onChange?.(newValue)
      clientX.set(e.clientX)
    }
  }

  const handlePointerDown = e => {
    handlePointerMove(e)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerUp = () => {
    animate(overflow, 0, { type: 'spring', bounce: 0.5 })
  }

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue
    if (totalRange === 0) return 0
    return ((value - startingValue) / totalRange) * 100
  }

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, 1.2)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.2)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.2], [0.7, 1])
        }}
        className="flex w-full touch-none select-none items-center justify-center gap-4"
      >
        <motion.div
          animate={{
            scale: region === 'left' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))
          }}
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="relative flex w-full flex-grow cursor-grab touch-none select-none items-center py-4"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => 1 + (sliderWidth > 0 ? overflow.get() / sliderWidth : 0)),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const { left } = sliderRef.current.getBoundingClientRect()
                  return clientX.get() < left + sliderWidth / 2 ? 'right' : 'left'
                }
              }),
              height: useTransform(scale, [1, 1.2], [12, 18]),
              marginTop: useTransform(scale, [1, 1.2], [0, -3]),
              marginBottom: useTransform(scale, [1, 1.2], [0, -3])
            }}
            className="flex flex-grow"
          >
            <div className="relative h-full flex-grow overflow-hidden rounded-full bg-gray-400">
              <div className="absolute h-full bg-white rounded-full" style={{ width: `${getRangePercentage()}%` }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === 'right' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))
          }}
        >
          {rightIcon}
        </motion.div>
      </motion.div>
    </>
  )
}

function decay(value, max) {
  if (max === 0) return 0
  const entry = value / max
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5)
  return sigmoid * max
}
