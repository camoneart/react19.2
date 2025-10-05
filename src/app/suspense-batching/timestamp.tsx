'use client';

import { useEffect, useState } from 'react';

export function Timestamp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="text-xs text-inherit">
      ✓ 読み込み完了{mounted ? `: ${new Date().toLocaleTimeString('ja-JP')}` : ''}
    </div>
  );
}
