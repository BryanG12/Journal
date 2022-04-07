import React from 'react';
import ReactDOM from 'react-dom/client';

import { JournalApp } from './JournalApp';
import './styles/styles.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);



root.render(<JournalApp />);