import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Quiz from './components/quiz/Quiz';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Quiz />
      </div>
    </Provider>
  );
};

export default App;
