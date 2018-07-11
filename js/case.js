
var Case =
{
    init: function( x, y )
    {
        this.valeur = 0 ;
        this.possible = [1,2,3,4,5,6,7,8,9] ;
        this.x = x ;
        this.y = y ;
        this.carre = 0 ;
        //console.log("case établie" , this.x, this.y, this.valeur)
        

    },

    setCarre: function()
    {
        if ( this.x < 3 )
        {
            if ( this.y <3 )
            {
                this.carre = 1
            }
            else if ( this.y < 6 )
            {
                this.carre = 4
            }
            else
            {
                this.carre = 7
            }
        }
        if ( this.x < 6 )
        {
            if ( this.y <3 )
            {
                this.carre = 2
            }
            else if ( this.y < 6 )
            {
                this.carre = 5
            }
            else 
            {
                this.carre = 8
            }
        }
        if ( this.x < 9 )
        {
            if ( this.y <3 )
            {
                this.carre = 3
            }
            else if ( this.y < 6 )
            {
                this.carre = 6
            }
            else 
            {
                this.carre = 9
            }
        }
    }

}

