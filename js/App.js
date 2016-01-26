
import React from 'react';


import CurrentUser from './CurrentUser';
import BugTable from './BugTable';


const App = React.createClass({

	render: function() {
		return (<div>
			<CurrentUser model={this.props.model}/>
            <BugTable model={this.props.model}/>
		</div>);
    }
});

export default App;
