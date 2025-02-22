import {Provider as ReduxProvider} from 'react-redux';
import {
  store as reduxStore,
  persistor as reduxPersistor,
} from '../../utils/store';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingSplashScreen from '../LoadingSplashScreen/LoadingSplashScreen';

interface IAppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = (props: IAppProvidersProps) => {
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate loading={<LoadingSplashScreen />} persistor={reduxPersistor}>
        {props.children}
      </PersistGate>
    </ReduxProvider>
  );
};

export default AppProviders;
