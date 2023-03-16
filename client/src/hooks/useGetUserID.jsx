import { useState, useEffect } from 'react';

export default function useGetUserID() {
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const userID = window.localStorage.getItem('userID');
    setUserID(userID);
  }, []);

  return userID;
}

// export default useGetUserID = () => {
//   return window.localStorage.getItem("userID");
// };
