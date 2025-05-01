import React from 'react';
import PageMainA from '../components/PageMain/PageMainA';
import PageMainB from '../components/PageMain/PageMainB';

const PageMain = () => {
  return (
    <div className='flex flex-col gap-20'>
      <div>
        <PageMainA />
      </div>
      <div>
        <PageMainB />
      </div>
    </div>
  );
};

export default PageMain;