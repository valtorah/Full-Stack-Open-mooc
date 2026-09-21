"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const color = type === "success" ? "bg-green-600" : "bg-red-600"

  return (
    <div
      data-testid="notification"
      className={`mx-auto mt-4 w-full max-w-3xl rounded px-4 py-2 text-white ${color}`}
    >
      {message}
    </div>
  )
}
