import {Provider as ReduxProvider} from 'react-redux';
import { globalAppReduxStore } from '../../utils/store';

interface IAppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = (props: IAppProvidersProps) => {
  return <ReduxProvider store={globalAppReduxStore}>{props.children}</ReduxProvider>;
};

export default AppProviders;
