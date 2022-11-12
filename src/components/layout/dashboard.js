import { useEffect } from 'react';
import { invoke } from '../../lib/firebase-functions';
const Dashboard = () => {

  useEffect(() => {
    (async () => {
      const response = await invoke('test');
      console.log(response);
    })();
  }, []);
  return (<>
    <h1>Dashboard</h1>

  </>);
}

export default Dashboard;