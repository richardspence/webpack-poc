import {bar} from './bar';
import * as $ from 'jquery';
import {MyService} from 'services/MyService';
export class Foo{
    /**
     *
     */
    constructor() {
        new MyService();
    }
    public n:number = 7;
    public z = new bar();
    public g = $;
}
export default Foo;