
import React from 'react';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="w-full text-center bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
        <strong className="font-bold">Erro!</strong>
        <p className="block sm:inline ml-2">{message}</p>
    </div>
);
