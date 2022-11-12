import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState({});

  return {
    user
  };
}

export default useAuth;