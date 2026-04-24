
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLocale from "../../../hooks/useLocale";
import { useTranslation } from "react-i18next";

type Props = {
onChange?: (val: any) => void
onBlur?: (val: any) => void
name?: string
value?: any
minLength?: number
dataTestid?: string
}

const InputPassword = ({name, value, onChange, onBlur, minLength = 1, dataTestid}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const locale = useLocale()
    const { t } = useTranslation()


    return (
       
            <div className="relative" dir={locale === "ar" ? "rtl" : "ltr"}> 
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name={name}
                    placeholder={t("form.placeholders.enter-your-password")}
                    defaultValue={value}
                    className={`w-full border border-gray-300 rounded-lg dark:bg-white dark:text-gray-700 py-2 px-3 sm:py-2.5 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`} 
                    onChange={onChange && onChange}     
                    onBlur={(e) => {(onBlur && name !== "password" && onBlur(e))}}
                    minLength={minLength}
                    title="Password must be at least 6 characters long"
                    data-testid={dataTestid!!}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none ${locale === "ar" ? "left-0 pl-3" : "right-0 pr-3"}`} 
                >
                    {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                    ) : (
                        <FaEye className="h-5 w-5" />
                    )}
                </button>
            </div>
        
    )
}

export default InputPassword