
import React from 'react';
import ReactDOM from 'react-dom';
import Ilias2 from './components/Ilias2';
import getLoggedUser from './components/helper/GetCurrentUser';

ReactDOM.render(<Ilias2 loggedUser={getLoggedUser()} />, document.querySelector('#root'));
