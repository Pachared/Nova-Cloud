import React from 'react'

import { LoginText } from '@/features/auth/constants/LoginText';

function Login() {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const githubUrl = clientId ? "/api/auth/github" : "#";

    return (
        <div className="flex flex-col items-center rounded-2xl bg-black px-25 py-20">
            <img
                src="/Nova.svg"
                alt="Nova"
                className="w-25 h-25 mb-4 object-cover transition-all duration-300 ease-out group-hover:rotate-6 group-hover:scale-90"
            />
            <h2 className="text-2xl font-blod mb-2">
                {LoginText.welcomeMessage}
            </h2>
            <h2 className="text-md font-medium mb-10">
                {LoginText.instructionMessage}
            </h2>
            <a
                href={githubUrl}
                aria-disabled={!clientId}
                className="w-full cursor-pointer rounded-2xl bg-gray-500 p-2 text-center text-white transition hover:bg-gray-800 aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
                {LoginText.githubButtonText}
            </a>
        </div>
    )
}

export default Login
