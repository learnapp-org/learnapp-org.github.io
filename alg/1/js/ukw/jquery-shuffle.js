/*
 * Add a shuffle function to Array object prototype
 * Usage : 
 * var tmpArray = ["a", "b", "c", "d", "e"];
 * tmpArray.shuffle();
 */
(function($){

    Array.prototype.shuffle = function ()
    {
        var i = this.length, j, temp;
        if (i == 0) return;
        while (--i) 
        {
            j = Math.floor(Math.random() * (i + 1));
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
    };
})(jQuery)