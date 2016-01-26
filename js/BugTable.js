
import React from 'react';

import _ from 'lodash';

import PersonIcon from './PersonIcon';

const BugTable = React.createClass({
    getInitialState: function() {
        return {
            bugs: []
        };
    },

    componentDidMount: function() {
        this.props.model.get(
            'bugs[1..20].raisedBy["name","role","thumbnail"]', 
            'bugs[1..20].["id", "title"]')
        .then((response) => {
            this.setState({'bugs': response.json.bugs});
        });
    },

    render: function() {
        const rows = _.map(this.state.bugs, function(bug) {
            const raisedByInfo = bug.raisedBy.name + '\n' + bug.raisedBy.role;
            return (<tr key={bug.id}>
                <td key="image">
                    <PersonIcon {...bug.raisedBy} /> 
                </td>
                <td key="title">
                    {bug.title}
                </td>
            </tr>);
        });
        return (<table className="bug-table">
            <tbody>
                {rows}
            </tbody>
        </table>);
    }
});

export default BugTable;
