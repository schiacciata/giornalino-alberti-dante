import { AgendaAssignment } from '@/types/api';
import { useEffect, useState } from 'react';

const cache: Record<string, any> = {};

export function useFetchAgenda(date: Date) {
  const [agenda, setAgenda] = useState<AgendaAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchAgenda = async () => {
      setLoading(true);
      const day = date.getDay();

      if (cache[day]) return cache[day];

      const response = await fetch(`/api/classeviva/agenda?date=${date}`);
      const json = await response.json();

      cache[day] = json.data.agenda;
      setAgenda(json.data.agenda);
    }
    
    fetchAgenda()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [date]);

  return { agenda, loading, error };
}