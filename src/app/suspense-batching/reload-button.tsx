'use client';

export function ReloadButton() {
  return (
    <div className="text-center">
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        🔄 リロードして再確認
      </button>
    </div>
  );
}
