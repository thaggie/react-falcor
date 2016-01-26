
import React from 'react';
import ReactDom from 'react-dom';

import Falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

import App from './App';

const model = new Falcor.Model({
    source: new FalcorDataSource('/model.json')
}).batch();

ReactDom.render(<App model={model}/>, document.getElementById('app'));