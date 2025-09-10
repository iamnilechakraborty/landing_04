"use client"

import { useState, useEffect } from "react"
import { Crown, Flame, CheckCircle2, UserCheck } from "lucide-react"
import Link from "next/link"

// TypeScript declaration for the Meta Pixel function
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

const indianNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Reyansh",
  "Ayaan",
  "Krishna",
  "Ishaan",
  "Saanvi",
  "Aadya",
  "Kiara",
  "Diya",
  "Pari",
  "Ananya",
  "Riya",
  "Sita",
  "Priya",
  "Anjali",
]
const joinTimes = ["Just Now", "1 minute ago", "2 minutes ago", "5 minutes ago", "10 minutes ago"]

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(10 * 60)
  const [notification, setNotification] = useState<{ name: string; time: string } | null>(null)

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft === 0) return
    const intervalId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft])

  // Social Proof Notification Logic
  useEffect(() => {
    const showNotification = () => {
      const randomName = indianNames[Math.floor(Math.random() * indianNames.length)]
      const randomTime = joinTimes[Math.floor(Math.random() * joinTimes.length)]
      setNotification({ name: randomName, time: randomTime })
    }
    showNotification()
    const notificationInterval = setInterval(() => {
      setNotification(null)
      setTimeout(showNotification, 1000)
    }, 5000)
    return () => clearInterval(notificationInterval)
  }, [])

  // Exit-Intent Popup Logic
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "Wait! Don't miss this opportunity. Join now for free!"
      e.preventDefault()
      e.returnValue = message
      return message
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [])

  const handleJoinClick = () => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Subscribe")
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 font-sans overflow-hidden">
      <div className="glow-container rounded-2xl">
        <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
          <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800">
            <Crown className="h-7 w-7 text-yellow-500" />
            <span className="mx-2">Queen Shots</span>
            <Crown className="h-7 w-7 text-yellow-500" />
          </h1>
          <p className="mt-2 text-gray-600">Telegram ka Sabse Bada Number Sureshot Prediction</p>

          <div className="my-6 inline-flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-black">
            <Flame className="mr-2 h-5 w-5 text-orange-500" />
            Loss Recovery Queen 100%
          </div>

          <ul className="space-y-3 text-left text-gray-700">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Daily Gift Available</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Daily Number Sureshot</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Loss Recovery Queen Strategy</span>
            </li>
          </ul>

          <Link
            href="https://t.me/+swg4PbqecQMyM2I1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleJoinClick}
            className="mt-8 block w-full rounded-lg bg-gradient-to-r from-pink-500 to-red-500 py-3 font-bold text-white shadow-md"
          >
            Click Here to Join Channel
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            Free joining ends in... <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>
          </p>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-max transition-opacity duration-500">
            {notification && (
              <div className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-white shadow-lg">
                <UserCheck className="h-4 w-4 text-green-400" />
                <p className="text-xs">
                  <span className="font-bold">{notification.name}</span> Joined {notification.time}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
