import React from 'react'
import { Button } from "../../Assets/ui/button"
import { ToastAction } from "../../Assets/ui/toast"
import { useToast } from "../../Assets/ui/use-toast"

const ToastDestructive = () => {
    const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export default ToastDestructive
