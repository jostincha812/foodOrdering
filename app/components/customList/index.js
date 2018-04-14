import React from 'react';
import { List } from 'native-base';
import PageLoader from '../pageLoader';
import NoRecordsFound from '../noRecordsFound';

const CustomList = ( { loading, data, renderRow } ) => {
  if ( loading ) return <PageLoader />
  
  return (
    !data.length ? <NoRecordsFound /> : <List 
      dataArray={ data }
      renderRow={ renderRow }
    />
  )
};

export default CustomList;