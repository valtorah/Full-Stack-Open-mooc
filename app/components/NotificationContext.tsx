"use client"

import { createContext, useCallback, useContext, useRef, useState } from "react"

type NotificationType = "success" | "error"

type NotificationContextType = {
  message: string
  type: NotificationType
  showNotification: (message: string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
})

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotificationType>("success")
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // useCallback keeps the function identity stable, so components can safely
  // list it in the dependencies of useEffect
  const showNotification = useCallback(
    (msg: string, notifType: NotificationType = "success") => {
      setMessage(msg)
      setType(notifType)
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setMessage(""), 5000)
    },
    [],
  )

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  )
}

export const useNotification = () => useContext(NotificationContext)
