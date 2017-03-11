import * as React from 'react';
import * as _ from 'lodash';

export class MyComponent extends React.Component<{}, {}> {
    render() {
        const keys = _.keys({
            a: 7,
            b: 4
        });
        return <div >This is my Component.  woot! {keys.map(k => {
            return <p>{k}</p>;
        })}</div>;
    }
}