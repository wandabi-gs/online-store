import React from 'react'

function Loader({ loading }) {
    if (loading) {
        return (
            <div className="min-h-screen min-w-full absolute flex items-center justify-center bg-indigo-600 bg-opacity-75 z-20 top-0">

            </div>
        )
    }
    return
}

export default Loader