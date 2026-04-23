"use client";

import { useState } from "react";

type Props = {
    //name: string
    defaultValue?: string | null
    onChange?: (val: any) => void
}
const InputEmail = ({defaultValue, onChange }: Props) => {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <input
            type="email"
            id="email"
            data-testid="email" 
            name="email"
            defaultValue={defaultValue ?? ''}
            placeholder={"Enter your email"}
            onChange={onChange && onChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:border-transparent dark:bg-gray-50  dark:text-gray-700 text-base sm:text-sm"
        />
    )
}

export default InputEmail