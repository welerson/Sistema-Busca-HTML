
import React from 'react';

interface HtmlInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const HtmlInput: React.FC<HtmlInputProps> = ({ value, onChange }) => (
    <div>
        <label htmlFor="html-input" className="block text-sm font-medium text-gray-300 mb-2">
            1. Cole o Código-Fonte HTML Aqui
        </label>
        <textarea
            id="html-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="<html>...</html>"
            className="w-full h-64 p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 ease-in-out resize-y font-mono text-sm"
            spellCheck="false"
        />
    </div>
);
