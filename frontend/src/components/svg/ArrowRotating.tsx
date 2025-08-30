import { cn } from "@/lib/utils"
import React from "react"
import { ChevronDown } from "lucide-react"

type Props = {
   active: boolean
}
const ArrowRotating = ({ active }: Props) => {
   return (
      <div
         className={cn("rotate-0 transition-transform duration-200", {
            "rotate-180": active,
         })}
      >
         <ChevronDown className="w-4 h-4" />
      </div>
   )
}

export default ArrowRotating