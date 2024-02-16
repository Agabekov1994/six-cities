import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import mocksDataOffers from './mocks/offers';
import { Provider } from 'react-redux';
import { store } from './store';

if (mocksDataOffers.length) {

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error('Фильм не найден');
}
