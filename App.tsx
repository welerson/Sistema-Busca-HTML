
import React, { useState, useCallback } from 'react';
import { extractDataFromHtml } from './services/geminiService';
import { HtmlInput } from './components/HtmlInput';
import { QueryInput } from './components/QueryInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ResultData } from './types';

const App: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [result, setResult] = useState<ResultData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!htmlContent.trim() || !query.trim()) {
            setError("Por favor, cole o conteúdo HTML e insira uma consulta.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const extractedData = await extractDataFromHtml(htmlContent, query);
            setResult(extractedData);
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro desconhecido.";
            setError(`Falha ao processar: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [htmlContent, query]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold text-cyan-400">
                        <span className="text-gray-100">Analisador de</span> HTML com IA
                    </h1>
                </div>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2">Extraia Dados de HTML com Linguagem Natural</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto">
                        Cole o código-fonte HTML de qualquer página, descreva os dados que você precisa e deixe a IA extraí-los para você em um formato estruturado.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl flex flex-col space-y-6">
                        <HtmlInput value={htmlContent} onChange={setHtmlContent} />
                        <QueryInput 
                            value={query} 
                            onChange={setQuery} 
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Output Section */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl flex flex-col min-h-[400px] lg:min-h-0">
                         <h3 className="text-lg font-semibold text-cyan-400 mb-4 border-b border-gray-700 pb-2">Resultados Extraídos</h3>
                        <div className="flex-grow flex items-center justify-center">
                            {isLoading && <Spinner />}
                            {error && <ErrorMessage message={error} />}
                            {!isLoading && !error && result && <ResultsDisplay data={result} />}
                            {!isLoading && !error && !result && (
                                <div className="text-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="mt-2">Os resultados aparecerão aqui.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
