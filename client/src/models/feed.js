/* 
    Feed model The raw data for the feed display.
    Currently mocked at the client side. 
*/
import { myFetch } from "./my-fetch";

export const getposts = function() {
    return  myFetch('posts');
} 