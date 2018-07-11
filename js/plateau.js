var Case =
{
    init: function( x, y )
    {
        this.valeur = 0 ;
        this.possible = [1,2,3,4,5,6,7,8,9] ;
        this.x = x ;
        this.y = y ;
        this.carre = 0 ;
        this.setCarre() ;
        this.possible2 = [];
        this.autreLigne = [];
        this.autreCol = [];
        this.setLiCol();
        //console.log("case établie" , this.x, this.y, this.valeur, this.carre)
    },

    copiCase: function()
    {
        copi = Object.create(Case) ;
        copi.init( this.x , this.y ) ;
        copi.possible = this.possible;
        copi.valeur = this.valeur ;
        return copi ;
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
        else if ( this.x < 6 )
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
        else if ( this.x < 9 )
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
    },

    setLiCol: function()
    {
        if (this.x === 0)
        {
            this.autreLigne = [1,2] ;
        }
        else if (this.x == 1)
        {
            this.autreLigne = [0,2];
        }
        else if (this.x == 2)
        {
            this.autreLigne = [0,1];
        }
        else if (this.x == 3)
        {
            this.autreLigne = [4,5];
        }
        else if (this.x == 4)
        {
            this.autreLigne = [3,5];
        }
        else if (this.x == 5)
        {
            this.autreLigne = [3,4];
        }
        else if (this.x == 6)
        {
            this.autreLigne = [7,8];
        }
        else if (this.x == 7)
        {
            this.autreLigne = [6,8];
        }
        else if (this.x == 8)
        {
            this.autreLigne = [6,7];
        }

        if (this.y == 0)
        {
            this.autreCol = [1,2];
        }
        else if (this.y == 1)
        {
            this.autreCol = [0,2];
        }
        else if (this.y == 2)
        {
            this.autreCol = [0,1];
        }
        else if (this.y == 3)
        {
            this.autreCol = [4,5];
        }
        else if (this.y == 4)
        {
            this.autreCol = [3,5];
        }
        else if (this.y == 5)
        {
            this.autreCol = [3,4];
        }
        else if (this.y == 6)
        {
            this.autreCol = [7,8];
        }
        else if (this.y == 7)
        {
            this.autreCol = [6,8];
        }
        else if (this.y == 8)
        {
            this.autreCol = [6,7];
        }


    }
}

var Plateau =
{
    init: function ()
    {
        this.grille = [] ;
        this.savedgrille = [];
        this.savegrille = [];
        this.vTest = [] ;
        for ( var i = 0 ; i < 9 ; i++ )
        {
            for ( var y = 0 ; y < 9 ; y++ )
            {
               case_temp = Object.create(Case) ;
               case_temp.init(i,y) ;
               this.grille.push(case_temp) ;
               var d = case_temp.copiCase() ; 
               this.savegrille.push(d); 
            }
        }
    },

    grilleSave: function(lagrille)
    {
        lagrille = [];
        for ( var a = 0 ; a < 81 ; a++ )
        {
            var d = this.grille[a].copiCase();
            lagrille.push(d);
        }
        return lagrille;
    },

    isFini: function()
    {
        this.fini = true;
        for ( var i = 0 ; i < 81 ; i++ )
        {
            var d = this.grille[i];
            if ( d.valeur == 0 )
            {
                this.fini = false ;
            }
        }
        return this.fini ;
    },

    isChanged: function()
    {
        this.changed = false;
        for ( var i = 0 ; i < 81 ; i++ )
        {
            if ( !(this.grille[i].possible.length == this.savegrille[i].possible.length) || !(this.grille[i].valeur == this.savegrille[i].valeur))
            {
                this.changed = true ;
            }
        }
        return this.changed;
    },

    testV: function(casetested)
    {
        var ligne = casetested.x ;
        var col = casetested.y ;
        var u = casetested.carre ;

        for ( var j = 0 ; j < 81 ; j++ ) 
        {
            var d = this.grille[j] ;
            if ( d.x == ligne && ( casetested.possible.find(function(element) { return element == d.valeur }) == d.valeur))
            {
                casetested.possible.splice( casetested.possible.indexOf(d.valeur) , 1) ;
            }
            if ( d.y == col && ( casetested.possible.find(function(element) { return element == d.valeur }) == d.valeur ))
            {
                casetested.possible.splice( casetested.possible.indexOf(d.valeur) , 1) ;
            }
            if ( d.carre == u && ( casetested.possible.find(function(element) { return element == d.valeur }) == d.valeur ))
            {
                casetested.possible.splice( casetested.possible.indexOf(d.valeur) , 1) ;
            }
        }

        for ( var indice = 0 ; indice < casetested.possible.length ; indice++ )
        {
            var e = casetested.possible[indice] ;
            var kligne = 0 ;
            var kcarre = 0 ;
            var kcol = 0 ;

            for ( var i = 0 ; i < 81 ; i++ )
            {
                var f = this.grille[i] 
                if ( (f.x === ligne) && (f.possible.find(function(element) { return element == e }) == e ))
                {
                    kligne = kligne + 1 ;
                }
                if ( (f.y === col) && (f.possible.find(function(element) { return element == e }) == e ))
                {
                    kcol = kcol + 1 ;
                }
                if ( (f.carre === u) && (f.possible.find(function(element) { return element == e }) == e ))
                {
                    kcarre = kcarre + 1 ;
                }
            }

            if ( ( kcarre === 1 || kligne === 1 || kcol === 1 ) && (casetested.possible.find(function(element){return element == e }) == e) )
            {
                casetested.possible2 = [e] ;
            }
        }
    },

    chiffreExc: function(caseT)
    {
        for ( var w = 0; w < caseT.possible.length ; w ++ )
        {
            var numPos = caseT.possible[w];
            var numPosSurAutreLigne = false;
            var numPosSurAutreCol = false;
            var numPosHorsCarreMemeLigne = false ;
            var numPosHorsCarreMemeCol = false ;

            for ( var q = 0 ; q < 81 ; q++ )
            {
                var casetemp = this.grille[q];
                if ( casetemp.carre == caseT.carre && (casetemp.possible.find(function(element){return element == numPos }) == numPos ) )
                {
                    if ( caseT.autreLigne.find(function(element){return element == casetemp.x}) == casetemp.x ) 
                    {
                        numPosSurAutreLigne = true ;
                    }
                    if ( caseT.autreCol.find(function(element){return element == casetemp.y}) == casetemp.y ) 
                    {
                        numPosSurAutreCol = true ;
                    }
                }

                if ( casetemp.x == caseT.x && !(casetemp.carre == caseT.carre) && (casetemp.possible.find(function(element){return element == numPos }) == numPos ) )
                {
                    numPosHorsCarreMemeLigne = true ;
                }
                if ( casetemp.y == caseT.y && !(casetemp.carre == caseT.carre) && (casetemp.possible.find(function(element){return element == numPos }) == numPos ) )
                {
                    numPosHorsCarreMemeCol = true ;
                }
            }

            if ( !numPosSurAutreLigne )
            {
                for ( var c = 0; c < 81 ; c++ )
                {
                    var g = this.grille[c] ;
                    if ( g.x == caseT.x && !(g.carre == caseT.carre) && (g.possible.find(function(element){return element == numPos}) == numPos) )
                    {
                        g.possible.splice( g.possible.indexOf(numPos) , 1) ;
                    }
                }
            }
            if ( !numPosSurAutreCol )
            {
                for ( var c = 0; c < 81 ; c++ )
                {
                    var g = this.grille[c] ;
                    if ( g.y == caseT.y && !(g.carre == caseT.carre) && (g.possible.find(function(element){return element == numPos}) == numPos) )
                    {
                        g.possible.splice( g.possible.indexOf(numPos) , 1) ;
                    }
                }
            }
            if ( !numPosHorsCarreMemeLigne )
            {
                for ( var c = 0; c < 81 ; c++ )
                {
                    var g = this.grille[c] ;
                    if ( g.carre == caseT.carre && !( g.x == caseT.x ) && (g.possible.find(function(element){return element == numPos}) == numPos) )
                    {
                        g.possible.splice( g.possible.indexOf(numPos) , 1) ;
                    }
                }
            }
            if ( !numPosHorsCarreMemeCol)
            {
                for ( var c = 0; c < 81 ; c++ )
                {
                    var g = this.grille[c] ;
                    if ( g.carre == caseT.carre && !( g.y == caseT.y ) && (g.possible.find(function(element){return element == numPos}) == numPos) )
                    {
                        g.possible.splice( g.possible.indexOf(numPos) , 1) ;
                    }
                }
            }
        }
    },

    verif: function(casetested)
    {
        if ( casetested.possible.length == 1 && casetested.valeur == 0)
        {
            casetested.valeur = casetested.possible[0] ;
        }
        if ( !(casetested.valeur == 0) )
        {
            casetested.possible = [] ;            
        }
        if ( casetested.possible2.length == 1 && casetested.valeur == 0 )
        {
            casetested.valeur = casetested.possible2[0] ;
        } 
    },

    round1tour: function()
    {
        for ( var i = 0 ; i < 81 ; i++ )
        {
            var d = this.grille[i] ;            
            this.testV(d) ;
            this.verif(d) ;            
        }
        console.log("round1tour");
    },

    hardround1tour: function()
    {
        for ( var i = 0 ; i < 81 ; i++ )
        {
            var d = this.grille[i] ;
            this.chiffreExc(d);
            this.verif(d);
        }
        console.log("hardround1tour");
    }
}

function generationGrille()
{
    grilleTXT = formGrille.value ;
    if ( grilleTXT.length == 81 ) 
    {
        for ( var i = 0 ; i < 81 ; i++ )
        {
            plateau.grille[i].valeur = parseInt(grilleTXT[i]) ;
        }    
    }
    actuGrille() ;
}

function createGrille()
{
    for ( var idx = 0 ; idx < 81 ; idx ++ )
    {
        var c = document.createElement("img") ;
        c.type = "img" ;
        c.id = idx ;
        c.src = "./img/Cvide.png" ;
        grillehtml.appendChild(c) ;
    }
}

function resetGrille()
{
    plateau = Object.create(Plateau) ;
    plateau.init() ;
    actuGrille() ;
}

function actuGrille()
{
    for ( var i = 0 ; i < 81 ; i++ )
    {
        var vcase = plateau.grille[i].valeur ;
        var c = document.getElementById(i) ;
        if ( vcase != 0 )
        {
            if ( vcase == 1)
            {
                c.src = "./img/c1.png" ;
            }
            if ( vcase == 2)
            {
                c.src = "./img/c2.png" ;
            } 
            if ( vcase == 3)
            {
                c.src = "./img/c3.png" ;
            } 
            if ( vcase == 4)
            {
                c.src = "./img/c4.png" ;
            } 
            if ( vcase == 5)
            {
                c.src = "./img/c5.png" ;
            } 
            if ( vcase == 6)
            {
                c.src = "./img/c6.png" ;
            } 
            if ( vcase == 7)
            {
                c.src = "./img/c7.png" ;
            } 
            if ( vcase == 8)
            {
                c.src = "./img/c8.png" ;
            } 
            if ( vcase == 9)
            {
                c.src = "./img/c9.png" ;
            } 

        }
        else {
            c.src ="./img/cvide.png"
        }
    }
}

function hardround()
{
    plateau.hardround1tour();
    actuGrille();
}

function round()
{
    while( plateau.isChanged() && !(plateau.isFini()) )
    {
        plateau.savegrille = plateau.grilleSave(plateau.savegrille);
        plateau.round1tour();
    }
    actuGrille();
}

function tabegaux(a,b)
{
    var egaux = true;
    if (!(a.length == b.length))
    {
        egaux = false ;
    }
    else 
    {
        for ( var i = 0 ; i < a.length ; i++ )
        {
            if ( !( a[i] == b[i] ) )
            {
                egaux = false;
            }
        }
    }
    return egaux
}

var plateau = Object.create(Plateau) ;
plateau.init() ;

document.body.onload = createGrille() ;


document.getElementById("btnReset").addEventListener('click', resetGrille) ;

document.getElementById("btnResoudre").addEventListener('click', round ) ;

document.getElementById("btnGenerer").addEventListener('click', generationGrille) ;

document.getElementById("btnResoudre2").addEventListener('click', hardround ) ;


