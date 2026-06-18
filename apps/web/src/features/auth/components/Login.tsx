import React from 'react'

import { LoginText } from '@/features/marketing/constants/constants';

function Login() {

    const clientId = "YOUR_GITHUB_CLIENT_ID";
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || "http://localhost:3000";
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

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
            <a href={githubUrl} className="w-full cursor-pointer rounded-2xl bg-gray-500 p-2 text-center text-white transition hover:bg-gray-800">
                {LoginText.githubButtonText}
            </a>
        </div>
    )
}

export default Login
