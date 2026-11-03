'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type FormData } from '@/context/FormContext';
import StepIndicator from '@/components/StepIndicator';

const FIELDS: {
  key: keyof FormData;
  label: string;
  type: 'input' | 'textarea';
  maxLength: number;
  placeholder: string;
}[] = [
  {
    key: 'industry',
    label: '業種',
    type: 'input',
    maxLength: 100,
    placeholder: '例：飲食業、小売業、建設業',
  },
  {
    key: 'targetWork',
    label: '対象業務',
    type: 'input',
    maxLength: 100,
    placeholder: '例：受発注管理、請求書作成、在庫管理',
  },
  {
    key: 'currentFlow',
    label: '現在の業務の流れ',
    type: 'textarea',
    maxLength: 2000,
    placeholder: '例：注文を電話で受け、手書きで台帳に記入。夕方にExcelへ転記して在庫を確認している。',
  },
  {
    key: 'problems',
    label: '困っていること',
    type: 'textarea',
    maxLength: 2000,
    placeholder: '例：記入漏れが多く、月末に集計するのに毎回2〜3時間かかる。',
  },
  {
    key: 'idealState',
    label: '理想の状態',
    type: 'textarea',
    maxLength: 2000,
    placeholder: '例：注文を入力したら自動で在庫が更新され、月末集計が30分以内に終わる。',
  },
];

type Errors = Partial<Record<keyof FormData, string>>;

export default function HomePage() {
  const router = useRouter();
  const { data, setData } = useForm();
  const [errors, setErrors] = useState<Errors>({});

  function handleChange(key: keyof FormData, value: string) {
    setData({ ...data, [key]: value });
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): Errors {
    const next: Errors = {};
    for (const field of FIELDS) {
      const val = data[field.key].trim();
      if (val === '') {
        next[field.key] = 'この項目は必須です。';
      } else if (data[field.key].length > field.maxLength) {
        next[field.key] = `${field.maxLength}文字以内で入力してください（現在 ${data[field.key].length} 文字）。`;
      }
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      const firstErrorKey = FIELDS.find((f) => next[f.key])?.key;
      if (firstErrorKey) {
        document.getElementById(firstErrorKey)?.focus();
      }
      return;
    }
    router.push('/review');
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <StepIndicator currentStep={1} />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        {/* サービス説明 */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
          <p className="font-semibold mb-1">BizHear とは</p>
          <p className="mb-2">
            業務の現状・課題・理想を整理して、打ち合わせに持参できるヒアリングシートを作成するツールです。
            専門知識は不要です。質問に沿って入力するだけで、開発者や支援者に伝わりやすい資料が完成します。
          </p>
          <p className="text-red-700 font-medium">
            ⚠ 氏名・住所・電話番号などの個人情報や、機密情報は入力しないでください。
          </p>
        </div>

        {/* 入力フォーム */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                {field.label}
                <span className="ml-1 text-red-600">*</span>
              </label>

              {field.type === 'input' ? (
                <input
                  id={field.key}
                  type="text"
                  value={data[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  maxLength={field.maxLength + 1}
                  placeholder={field.placeholder}
                  aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                  aria-invalid={!!errors[field.key]}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[field.key]
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-white'
                  }`}
                />
              ) : (
                <textarea
                  id={field.key}
                  value={data[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={5}
                  placeholder={field.placeholder}
                  aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                  aria-invalid={!!errors[field.key]}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${
                    errors[field.key]
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-white'
                  }`}
                />
              )}

              <div className="flex justify-between mt-1">
                {errors[field.key] ? (
                  <p id={`${field.key}-error`} className="text-xs text-red-600" role="alert">
                    {errors[field.key]}
                  </p>
                ) : (
                  <span />
                )}
                <p className="text-xs text-gray-400 ml-auto">
                  {data[field.key].length} / {field.maxLength}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              確認する →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
