import { Timestamp } from './timestamp';

// データをシミュレートする非同期関数
async function fetchData(delay: number, content: string) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return content;
}

// キャッシュ用のマップ
const cache = new Map<string, Promise<string>>();

// React Server Componentとして動作するコンポーネント
export async function SlowComponent1() {
  const key = 'component1';
  if (!cache.has(key)) {
    cache.set(key, fetchData(2000, 'コンポーネント 1 のデータ'));
  }
  const data = await cache.get(key)!;

  return (
    <div className="p-4 border border-green-200 rounded-lg bg-green-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
          1
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-green-900">コンポーネント 1</h3>
          <p className="text-sm text-green-700">{data} (遅延: 2000ms)</p>
        </div>
        <div className="text-green-600">
          <Timestamp />
        </div>
      </div>
    </div>
  );
}

export async function SlowComponent2() {
  const key = 'component2';
  if (!cache.has(key)) {
    cache.set(key, fetchData(2300, 'コンポーネント 2 のデータ'));
  }
  const data = await cache.get(key)!;

  return (
    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          2
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900">コンポーネント 2</h3>
          <p className="text-sm text-blue-700">{data} (遅延: 2300ms)</p>
        </div>
        <div className="text-blue-600">
          <Timestamp />
        </div>
      </div>
    </div>
  );
}

export async function SlowComponent3() {
  const key = 'component3';
  if (!cache.has(key)) {
    cache.set(key, fetchData(2600, 'コンポーネント 3 のデータ'));
  }
  const data = await cache.get(key)!;

  return (
    <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          3
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-purple-900">コンポーネント 3</h3>
          <p className="text-sm text-purple-700">{data} (遅延: 2600ms = 2.6秒 → LCP閾値超過)</p>
        </div>
        <div className="text-purple-600">
          <Timestamp />
        </div>
      </div>
    </div>
  );
}
