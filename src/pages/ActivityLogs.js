import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getLogsAPI } from '../api/logs.api';
import Table from '../components/data-tables/Table';
import Spinner from '../components/Spinner';
const ActivityLogsPage = () => {
    const [logs, setLogs] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    /*useEffect(() => {
        getLogsAPI().then(
            (th) => {
                setLogs(th.data)
                console.log("logs th:", th)
            })
        
    }, [logs])*/
    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        const time = setTimeout(() => {
            getLogsAPI().then((th) => {
                // if (!mounted) return
                setIsLoading(false);
                console.log("users:", th);
                th.data && setLogs(th.data);
            }).catch((err) => {
                console.log("err:", err);
                // if (!mounted) return
                setIsError(true);
            }).finally(() => {
                //if (!mounted) return
                setIsLoading(false);
                setIsError(false);
            });
        }, 1000);
        return () => {
            clearTimeout(time);
            setIsLoading(false);
            mounted = false;
        };
    }, [logs]);
    return (_jsxs("div", { children: [_jsx("p", { className: 'text-gray-500 text-2xl p-2', children: "Activity Logs" }), !logs && isLoading && _jsxs("div", { children: [_jsx(Spinner, { title: "Loading..." }), " "] }), logs && _jsx(Table, { type: 'logs', fields: ["id", "action", "user", "timestamp"], docs: logs, isActions: false })] }));
};
export default ActivityLogsPage;
