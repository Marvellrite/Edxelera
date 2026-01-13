import React, { useRef, useState } from "react"

type OtpType = "numeric" | "alphanumeric"

interface OtpInputGroupProps {
  length: number
  type?: OtpType
  onChange?: (otp: string) => void
  onComplete?: (otp: string) => void
}

export const OtpInputGroup = ({
  length,
  type = "numeric",
  onChange,
  onComplete,
}: OtpInputGroupProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const handleChange = (value: string, index: number) => {
    const char = value.slice(-1)

    if (!isValidChar(char, type)) return

    const nextOtp = [...otp]
    nextOtp[index] = char
    setOtp(nextOtp)

    onChange?.(nextOtp.join(""))

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    if (nextOtp.every(Boolean)) {
      onComplete?.(nextOtp.join(""))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const nextOtp = [...otp]
        nextOtp[index] = ""
        setOtp(nextOtp)
        onChange?.(nextOtp.join(""))
      } else {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData("text")
      .split("")
      .filter((char) => isValidChar(char, type))
      .slice(0, length)

    const nextOtp = [...otp]

    pasted.forEach((char, i) => {
      nextOtp[i] = char
    })

    setOtp(nextOtp)
    onChange?.(nextOtp.join(""))

    if (pasted.length === length) {
      onComplete?.(nextOtp.join(""))
    }

    inputsRef.current[pasted.length - 1]?.focus()
  }

  return (
    <div className="flex gap-2">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el:HTMLInputElement | null) => {inputsRef.current[index] = el}}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          maxLength={1}
          inputMode={type === "numeric" ? "numeric" : "text"}
          autoComplete="one-time-code"
          className="w-14 aspect-square rounded-md border text-center text-lg"
        />
      ))}
    </div>
  )
}

const isValidChar = (char: string, type: OtpType) => {
  if (type === "numeric") return /^[0-9]$/.test(char)
  return /^[a-zA-Z0-9]$/.test(char)
}
