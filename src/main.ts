import {bar} from './bar';
import * as $ from 'jquery';
export class Foo{
    public n:number = 7;
    public z = new bar();
    public g = $;
}

$(()=>{
    alert(new Foo().n);
})