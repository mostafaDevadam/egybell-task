import React from 'react'
import { useAppSelector } from '../store/store'
import useLocale from '../hooks/useLocale'

const DashboardPage = () => {
  const { user, role } = useAppSelector((state) => state.auth)
  const locale = useLocale()

  console.log({ user, role })
  const lorem = `
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est exercitationem illo architecto blanditiis culpa quod neque assumenda sapiente nemo, tempora, incidunt et saepe aperiam accusantium rerum! Reprehenderit eaque aperiam sapiente!
  
  `
  const ar_lorem = `
  مرحبًا بك في لوحة التحكم الرئيسية. من خلال هذه الواجهة التفاعلية، يمكنك متابعة الأداء العام للنظام، واستعراض المقاييس الأساسية في الوقت الفعلي، وتحليل البيانات الواردة من مختلف المصادر بشكل موحد وسهل. تتيح لك اللوحة إمكانية تخصيص طريقة عرض المؤشرات، وتصفية النتائج بحسب الفترات الزمنية أو الأقسام المختلفة، كما يمكنك الانتقال بسهولة بين التقارير التفصيلية والرسوم البيانية التفاعلية التي تعكس بدقة آخر التحديثات والاتجاهات. لوحة التحكم هذه مصممة لمساعدتك في اتخاذ قرارات أسرع وأكثر ذكاءً، من خلال توفير رؤى واضحة وقابلة للتنفيذ في مكان واحد.
  `
  return (
    <div>
      <p className='text-gray-500 text-2xl p-2 dark:text-gray-100 test-title'></p>

    

      <div className='text-start px-4 flex flex-col gap-5 '>
        <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 test-content'>{locale === "en" &&<span>Email: </span>} {user!!.email}</p>
        <p className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10 test-content'>{locale === "en" && "Role:"} {role}</p>
      </div>

        {[1,2,3,4].map((m,i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-5 px-4 mt-5" >
        <div className="test-content w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600 dark:hover:border-gray-100">
          {locale === "ar" ? ar_lorem : lorem}</div>
        <div className="test-content w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600 dark:hover:border-gray-100">
          {locale === "ar" ? ar_lorem : lorem}</div>
      </div>
      ))}

     


    </div>
  )
}

export default DashboardPage