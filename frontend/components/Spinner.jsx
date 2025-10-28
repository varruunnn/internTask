import React from 'react'
import { ShoppingCart, Trash2, X, Loader2, AlertCircle } from 'lucide-react';
export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-violet-600 animate-spin" />
        </div>
    )
}
