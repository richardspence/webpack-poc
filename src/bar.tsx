import { MyComponent } from 'components/MyComponent';
import { MyService } from './services/MyService';
import * as $ from 'jquery';
import * as ReactDom from 'react-dom';
import * as React from 'react';
export class bar {
    constructor() {
        new MyService();
        const x = MyComponent;
        ReactDom.render(<MyComponent />, $('#test')[0]);
    }
    private x = 9;
}

export default bar;