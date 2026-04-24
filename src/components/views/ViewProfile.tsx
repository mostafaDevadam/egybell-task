import React, { useEffect, useState } from 'react'
import { USER_TYPE } from '../../types'
import useLocale from '../../hooks/useLocale'
import { t } from 'i18next'

type Props = {
    user: USER_TYPE | null
}
const ViewProfile = ({ user }: Props) => {
    const [state, setState] = useState<USER_TYPE>()
    const locale = useLocale()

    const bio = `
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti a ipsum esse voluptate dolorem quasi! Libero assumenda maiores reiciendis quod veniam? Vel, modi? Modi similique expedita quasi quo vero. Voluptate?`

    const ar_bio = `
    
كاتبة ومحررة محتوى تعيش في القاهرة. بخبرة تزيد عن خمس سنوات في كتابة المحتوى الرقمي، تساعد ليلى الشركات الناشئة والعلامات التجارية في صياغة قصص مؤثرة بأسلوب بسيط وجذاب. نُشرت كتاباتها في عدة منصات إلكترونية ومجلات محلية. خارج العمل، تستمتع ليلى بالتصوير الفوتوغرافي وتجربة وصفات الطبخ الجديدة.`
    useEffect(() => {
        if (user) {
            setState(user)
        }
    }, [state, user])
    return (
        <div>
            <p className='text-gray-500 text-2xl p-2' data-testid="title"></p>
            {state &&
                <div className='text-start px-4 flex flex-col gap-5' dir={locale === "ar" ? "rtl" : "ltr"}>
                    <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700' data-testid="email" dir={locale === "ar" ? "rtl" : "ltr"}><span>{locale === "en" &&<span>Email: </span>} {state!!.email}</span> {locale === "ar" &&<span></span>} </p>
                    <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10' data-testid="role">{locale === "en" && "Role:"} {state!!.role} </p>
                    <div className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10'>
                        <p data-testid="bio">{t("bio")}</p>
                        <p data-testid="bio-content">{locale === "ar" ? ar_bio : bio}</p>


                    </div>
                </div>

            }

        </div>
    )
}

export default ViewProfile