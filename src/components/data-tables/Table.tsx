import React from 'react'
import { USER_TYPE } from '../../types'
import { Link } from 'react-router'
import { useAppSelector } from '../../store/store'

type Props<T = any> = {
    docs: T[]
    fields: string[]
}
const Table = ({docs, fields }: Props) => {
    const {role} = useAppSelector(state => state.auth)


    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg  p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 pb-5 px-4 " >
                <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
                    <colgroup>
                        <col style={{ width: "5%" }} />   {/* id */}
                        <col style={{ width: "50%", marginLeft: '50px' }} />  {/* email (adjust down if needed) */}
                        <col style={{ width: "20%" }} />  {/* role */}
                        <col style={{ width: "15%" }} />  {/* actions */}
                    </colgroup>

                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                        {fields && fields.map((f, index) => (
                            <th key={index} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">{f}</th>
                        ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                        {docs && docs.map((m, index) => (
                            <tr key={index} className="text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-300 hover:text-gray-700">
                                <td className="px-3 py-2 whitespace-nowrap">{m.id}</td>

                                <td
                                    className="px-3 py-2 truncate overflow-hidden"
                                    title={m.email}
                                >
                                    {m.email}
                                </td>

                                <td className="px-3 py-2 whitespace-nowrap">{m.role}</td>

                                <td className="px-3 py-2">
                                   {role === 'admin' && <div className="flex flex-col md:flex-row gap-2">
                                         <Link to={`/profile/${m.id}/view`} 
                                        className="cursor-pointer text-blue-700 border border-blue-700 hover:border-0 hover:bg-blue-500 hover:text-white px-3 py-1 rounded">View</Link>
                                        <Link to={`/profile/${m.id}/edit`} 
                                        className="cursor-pointer text-green-700 border border-green-700 hover:border-0 hover:bg-green-500 hover:text-white px-3 py-1 rounded">Edit</Link>
                                    </div> }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default Table