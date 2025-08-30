import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
   className?: string
   isLink?: boolean
   imageUrl?: string | null
}

const Logo = ({ className, isLink = true, imageUrl = "/logo.svg" }: Props) => {
   const image = (
      <Image
         src={imageUrl ?? "/logo.svg"}
         alt="logo"
         width={255}
         height={58}
      />
   )
   if (!isLink) {
      return <div className="!w-fit">{image}</div>
   }
   return (
      <Link href={"/"} className={cn("!w-fit", className)}>
         {image}
      </Link>
   )
}

export default Logo