import {
   FormControl,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

type InputFieldProps = {
   type: "text" | "email" | "tel" | "date" | "password"
   value: string | undefined
   label?: string
   placeholder?: string
   onBlur: () => void
   onChange: (val: string) => void
   className?: string
   hasError?: boolean
   errorMessage?: string
   required?: boolean
   disabled?: boolean
}

const InputField = ({ required = true, ...props }: InputFieldProps) => {
   const handleDisplay = () => {
      const type = props.type?.toLowerCase() ?? "text"
      const { hasError, disabled, errorMessage, ...inputProps } = props
      return (
         <div className="relative">
            <input
               {...inputProps}
               type={type}
               onChange={(e) => props.onChange(e.target.value)}
               disabled={disabled}
               className={cn(
                  "w-full rounded-[6px] border border-[#CCC] px-4 py-2 text-[15px] outline-none placeholder:text-sm focus:border-black",
                  props.className,
                  hasError && "border-red-500",
                  disabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
               )}
            />
         </div>
      )
   }

   return (
      <div className="relative flex w-full flex-col gap-0.5">
         <FormItem>
            {props.label && (
               <FormLabel
                  className={cn(
                     "text-sm font-normal capitalize text-black",
                     props.disabled && "text-gray-500"
                  )}
               >
                  {props.label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                  {!required && (
                     <span className="text-sm text-[#666]"> (optional)</span>
                  )}
               </FormLabel>
            )}
            <FormControl>{handleDisplay()}</FormControl>

            {props.hasError && (
               <FormMessage className="text-sm text-red-500">
                  {props.errorMessage || "This field has an error"}
               </FormMessage>
            )}
         </FormItem>
      </div>
   )
}

export default InputField