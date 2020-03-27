import React from 'react';

export default function Header(/*props*/{ children }){
    //props é o parametro que vem do app.js, o header
    //{children} significa que o parametro esta 'desestruturado', ou seja, ao inves de passar
    //um parametro só e inteiro, que possa conter muita informação e/ou muitas propriedades
    //passa-se apenas a propriedade ou valor que deseja
    return (
        <header>
            {/*<h1>Be The Hero</h1>*/}
            {/*props.title retorna o atributo de mesmo nome (title) do header no app.js 
            props.childer retorna todo o conteudo, seja ele texto ou html*/}
            {/*<h1>{props.title}</h1>*/}
            <h1>{children}</h1>
            
        </header>
    );
}

//export default Header;