import { readNotice } from '@/types/api';
import { useEffect, useState } from 'react';

const cache: Record<number, any> = {};

export type useReadNoticeOptions = Partial<{
    noticeId: number;
    eventCode: string;
}>

export function useReadNotice(options: useReadNoticeOptions) {
  const [notice, setNotice] = useState<readNotice>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {    
    const fetchNotice = async () => {
      setLoading(true);
      if (!options.noticeId || !options.eventCode) return;

      if (cache[options.noticeId]) return cache[options.noticeId];

      const response = await fetch(`/api/classeviva/notice/read?noticeId=${options.noticeId}&eventCode=${options.eventCode}`);
      const json = await response.json();

      cache[options.noticeId] = json.data.notice;
      setNotice(json.data.notice);
    }
    
    fetchNotice()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [options]);

  return { notice, loading, error };
}