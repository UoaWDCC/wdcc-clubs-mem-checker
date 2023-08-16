import { useSearchParams } from 'react-router-dom';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MembershipVerify() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<any>({});
  const [responseState, setResponseState] = useState('loading');

  useEffect(() => {
    const webLink = searchParams.get('webLink');
    const fetchData = async () => {
      try {
        const res = await axios.get(`/pages/:${webLink}`);
        setPage(res.data);
        setResponseState('success');
      } catch {
        setResponseState('error');
      }
    };
    fetchData();
  });

  return (
    <div style={{ width: '100vw', height: '100%' }}>
      {responseState == 'loading' ? (
        <p>Loading</p>
      ) : responseState == 'success' ? (
        <ClubCheckerPage
          clubId={page.clubId}
          clubName={page.clubName}
          title={page.title}
          optionsList={page.optionsList}
          isOnboarding={false}
        />
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
