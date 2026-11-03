'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import StepIndicator from '@/components/StepIndicator';

const SECTIONS: { key: 'industry' | 'targetWork' | 'currentFlow' | 'problems' | 'idealState'; label: string }[] = [
  { key: 'industry', label: '業種' },
  { key: 'targetWork', label: '対象業務' },
  { key: 'currentFlow', label: '現在の業務の流れ' },
  { key: 'problems', label: '困っていること' },
  { key: 'idealState', label: '理想の状態' },
];

export default function ReviewPage() {
  const router = useRouter();
  const { data } = useForm();

  const isEmpty = SECTIONS.every((s) => data[s.key].trim() === '');

  useEffect(() => {
    if (isEmpty) {
      router.replace('/');
    }
  }, [isEmpty, router]);

  if (isEmpty) return null;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <StepIndicator currentStep={2} />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6">入力内容の確認</h1>

        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 mb-8 print-area">
          {SECTIONS.map(({ key, label }) => (
            <div key={key} className="px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                {label}
              </p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {data[key]}
              </p>
            </div>
          ))}
        </div>

        {/* 操作ボタン */}
        <div className="no-print flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full sm:w-auto rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          >
            ← 入力に戻る
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            PDFとして保存
          </button>
        </div>

        <p className="no-print mt-4 text-xs text-gray-400 text-center">
          印刷ダイアログで「PDFに保存」を選択するとPDFとして保存できます。
        </p>
      </main>
    </div>
  );
}
