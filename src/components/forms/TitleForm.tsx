"use client";

import React from 'react'

type Props = {
    title: string
}

const Title = ({ title }: Props) => {
    return (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-700">
            {title}
        </h1>
    )
}

export default Title