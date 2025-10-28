import React from 'react'
import { AlertCircle } from 'lucide-react'
export default function ErrorMessage({ message }) {
    return (
        <div className="flex justify-center items-center h-64 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <AlertCircle className="w-6 h-6 mr-3" />
            <span className="block sm:inline">{message}</span>
        </div>
    )
}
