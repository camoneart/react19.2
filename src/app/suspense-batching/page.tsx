import { Suspense } from 'react';
import { SlowComponent1, SlowComponent2, SlowComponent3 } from './components';
import { ReloadButton } from './reload-button';

export default function SuspenseBatchingDemo() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            React 19.2 Suspense Batching Demo
          </h1>
          <p className="text-gray-600">
            複数のSuspense境界がバッチ処理されて一緒に表示される挙動を確認
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            バッチ処理の動作確認
          </h2>

          <div className="space-y-4">
            {/* 各コンポーネントは異なる遅延時間を持つが、バッチ処理により一緒に表示される */}
            <Suspense fallback={<LoadingCard name="コンポーネント 1" delay="2000ms" />}>
              <SlowComponent1 />
            </Suspense>

            <Suspense fallback={<LoadingCard name="コンポーネント 2" delay="2300ms" />}>
              <SlowComponent2 />
            </Suspense>

            <Suspense fallback={<LoadingCard name="コンポーネント 3" delay="2600ms (LCP閾値超過)" />}>
              <SlowComponent3 />
            </Suspense>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">💡 期待される挙動（LCPヒューリスティック）</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>通常時</strong>: 近い時間帯に完了するSuspense境界がバッチ処理され、まとめて表示される</li>
              <li>• <strong>LCP閾値（2.5秒）接近時</strong>: バッチ処理を停止し、即座にコンテンツを表示</li>
              <li>• これによりCore Web Vitals（LCP）のスコアを維持しつつ、UX最適化を実現</li>
              <li>• コンポーネント3（2.6秒）は閾値を超えるため、バッチ処理が適用されない可能性がある</li>
            </ul>
          </div>
        </div>

        <ReloadButton />
      </div>
    </div>
  );
}

function LoadingCard({ name, delay }: { name: string; delay: string }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {name} - 遅延: {delay}
      </div>
    </div>
  );
}
