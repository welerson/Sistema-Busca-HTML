
import React from 'react';

interface QueryInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const QueryInput: React.FC<QueryInputProps> = ({ value, onChange, onSubmit, isLoading }) => (
    <div>
        <label htmlFor="query-input" className="block text-sm font-medium text-gray-300 mb-2">
            2. Descreva os Dados a Serem Extraídos
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
            <input
                id="query-input"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && onSubmit()}
                placeholder="Ex: 'Liste todos os nomes e e-mails da tabela'"
                className="flex-grow p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 ease-in-out"
            />
            <button
                onClick={onSubmit}
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition duration-200 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                    </>
                ) : 'Processar'}
            </button>
        </div>
    </div>
);
