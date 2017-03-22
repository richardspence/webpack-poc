import * as React from 'react';
import * as _ from 'lodash';
import * as temp from 'text!./template';

export class MyComponent extends React.Component<{}, {}> {
    render() {
        const keys = _.keys({
            a: 7,
            b: 4
        });
        return <div >This is my Component.  woot! {keys.map(k => {
            return <p>{k}</p>;
        })}<div dangerouslySetInnerHTML={{__html: temp}} /></div>;
    }
}