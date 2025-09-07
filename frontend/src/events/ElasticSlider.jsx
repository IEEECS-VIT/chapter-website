import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

const MAX_OVERFLOW = 50

export default function ElasticSlider({
  value,
  onChange,
  startingValue = 0,
  maxValue = 100,
  className = "",
  isStepped = false,
  stepSize = 1,
  leftIcon = <>-</>,
  rightIcon = <>+</>,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 w-full ${className}`}
    >
      <Slider
        value={value}
        onChange={onChange}
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

function Slider({
  value,
  onChange,
  startingValue,
  maxValue,
  isStepped,
  stepSize,
  leftIcon,
  rightIcon,
}) {
  const sliderRef = useRef(null)
  const [region, setRegion] = useState("middle")
  const [sliderWidth, setSliderWidth] = useState(0)

  const clientX = useMotionValue(0)
  const overflow = useMotionValue(0)
  const scale = useMotionValue(1)

  useEffect(() => {
    if (!sliderRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSliderWidth(entry.contentRect.width)
      }
    })
    observer.observe(sliderRef.current)
    return () => observer.disconnect()
  }, [])

  useMotionValueEvent(clientX, "change", (latest) => {
    if (!sliderRef.current) return
    const { left, right } = sliderRef.current.getBoundingClientRect()
    let newValue
    if (latest < left) {
      setRegion("left")
      newValue = left - latest
    } else if (latest > right) {
      setRegion("right")
      newValue = latest - right
    } else {
      setRegion("middle")
      newValue = 0
    }
    overflow.set(decay(newValue, MAX_OVERFLOW))
  })

  const handlePointerMove = (e) => {
    if (e.buttons > 0 && sliderWidth > 0 && sliderRef.current) {
      const { left } = sliderRef.current.getBoundingClientRect()
      let newValue =
        startingValue +
        ((e.clientX - left) / sliderWidth) * (maxValue - startingValue)
      if (isStepped) newValue = Math.round(newValue / stepSize) * stepSize
      newValue = Math.min(Math.max(newValue, startingValue), maxValue)
      onChange?.(newValue)
      clientX.set(e.clientX)
    }
  }

  const handlePointerDown = (e) => {
    handlePointerMove(e)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerUp = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    animate(overflow, 0, { type: "spring", bounce: 0.5 })
  }

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue
    if (totalRange === 0) return 0
    return ((value - startingValue) / totalRange) * 100
  }

  // transforms
  const scaleX = useTransform(overflow, (o) =>
    sliderWidth > 0 ? 1 + o / sliderWidth : 1
  )
  const scaleY = useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8])
  const opacity = useTransform(scale, [1, 1.2], [0.7, 1])
  const barHeight = useTransform(scale, [1, 1.2], [12, 18])
  const marginY = useTransform(scale, [1, 1.2], [0, -3])

  return (
    <motion.div
      onHoverStart={() => animate(scale, 1.2)}
      onHoverEnd={() => animate(scale, 1)}
      onTouchStart={() => animate(scale, 1.2)}
      onTouchEnd={() => animate(scale, 1)}
      style={{ scale, opacity }}
      className="flex w-full touch-none select-none items-center justify-center gap-4"
    >
      <motion.div
        animate={{
          scale: region === "left" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(overflow, (o) =>
            region === "left" ? -o / scale.get() : 0
          ),
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
            scaleX,
            scaleY,
            height: barHeight,
            marginTop: marginY,
            marginBottom: marginY,
            transformOrigin: "center",
          }}
          className="flex flex-grow"
        >
          <div className="relative h-full flex-grow overflow-hidden rounded-full bg-gray-400">
            <div
              className="absolute h-full bg-white rounded-full"
              style={{ width: `${getRangePercentage()}%` }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{
          scale: region === "right" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(overflow, (o) =>
            region === "right" ? o / scale.get() : 0
          ),
        }}
      >
        {rightIcon}
      </motion.div>
    </motion.div>
  )
}

function decay(value, max) {
  if (max === 0) return 0
  const entry = value / max
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5)
  return sigmoid * max
}
