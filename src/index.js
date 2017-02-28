import React from 'react';
import ReactDOM from 'react-dom';
import MyNotes from './MyNotes';

document.addEventListener('DOMContentLoaded', function() {
  let root = document.getElementById('root');
  ReactDOM.render(<MyNotes />, root);
});
