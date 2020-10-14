import { LeftCircleFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  console.log(router);
  useEffect(() => {
    setShow(history.length > 1);
  });

  function goBack() {
    router.back();
  }

  return show ? (
    <LeftCircleFilled
      className='back-button'
      style={{ fontSize: '30px' }}
      onClick={goBack}
    />
  ) : null;
};

export { BackButton };
