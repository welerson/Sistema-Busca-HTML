
import React from 'react';
import { ResultData, JsonObject } from '../types';

const isArrayOfObjects = (data: any): data is JsonObject[] => {
    return Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null;
};

const renderValue = (value: any): React.ReactNode => {
    if (typeof value === 'object' && value !== null) {
        return <pre className="bg-gray-900 p-2 rounded text-xs whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>;
    }
    if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('www'))) {
        return <a href={value} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-all">{value}</a>
    }
    return String(value);
};

export const ResultsDisplay: React.FC<{ data: ResultData }> = ({ data }) => {
    if (typeof data === 'string') {
        return <p className="text-gray-300">{data}</p>;
    }

    if (isArrayOfObjects(data)) {
        const headers = Object.keys(data[0]);
        return (
            <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            {headers.map(header => (
                                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-700/50">
                                {headers.map(header => (
                                    <td key={`${rowIndex}-${header}`} className="px-4 py-3 whitespace-normal text-sm text-gray-300 align-top break-words">
                                        {renderValue(row[header])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
         if (Object.keys(data).length === 0) {
            return <p className="text-gray-400">Nenhum dado encontrado.</p>;
        }
        return (
             <div className="w-full bg-gray-900/50 p-4 rounded-lg">
                <ul className="space-y-2">
                    {Object.entries(data).map(([key, value]) => (
                        <li key={key} className="flex flex-col sm:flex-row">
                           <strong className="font-semibold text-cyan-400 sm:w-1/3 shrink-0">{key}:</strong>
                           <span className="text-gray-300 sm:w-2/3 break-words">{renderValue(value)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if(Array.isArray(data) && data.length === 0) {
        return <p className="text-gray-400">Nenhum dado encontrado.</p>
    }

    return <p className="text-gray-400">Formato de dados não suportado.</p>;
};
