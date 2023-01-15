let btnLang = document.querySelectorAll(".btn-lang");
let result = document.querySelector('.result');
let typesChoices = document.querySelector('.types');
let divSubmit = document.querySelector('.submit');


let html = ['paragraph', 'links', 'image', 'lists', 'favicon', 'classes', 'id', 'forms', 'tables', 'h1 to h6', 'iframes'];
let css = ['select a class', "select an ID", 'color', 'tables', 'height/width', 'icons', 'text', 'backgrounds', 'borders', 'box model', 'transitions'];
let js = ['variables', 'operators', 'functions', 'objects', 'arrays', 'dates', 'booleans', 'loops', 'conditions', 'RegExp', 'Arrow function'];
let php = ['variables', 'strings', 'array', 'loops', 'functions', 'if else else if', 'operators', 'superglobals', 'switch', 'forms', 'include'];

btnLang.forEach(function(el){
    el.addEventListener("click", function(){
        typesChoices.innerHTML = "";
        divSubmit.innerHTML = "";
        let value = el.getAttribute('value');
        result.innerHTML = "What code exemple do you need for "+ value +" ?";
        let btnSubmit = document.createElement('button');
        btnSubmit.setAttribute('class', 'btnSubmit');
        btnSubmit.setAttribute('disabled', '');
        btnSubmit.innerHTML = "Generate code";
        divSubmit.appendChild(btnSubmit);
        

        if(value == "Html"){
            for(i = 0; i<html.length; i++){
                let p = document.createElement('p');
                p.className= 'btn-type html';
                p.innerHTML = html[i];
                p.addEventListener('click', chooseType);
                typesChoices.appendChild(p);
            }
        }
        else if(value == "Css"){
            for(i = 0; i<css.length; i++){
                let p = document.createElement('p');
                p.className= 'btn-type css';
                p.innerHTML = css[i];
                p.addEventListener('click', chooseType);
                typesChoices.appendChild(p);
            }
        }
        else if(value == "Javascript"){
            for(i = 0; i<js.length; i++){
                let p = document.createElement('p');
                p.className= 'btn-type javascript';
                p.innerHTML = js[i];
                p.addEventListener('click', chooseType);
                typesChoices.appendChild(p);
            }
        }
        else if(value == "Php"){
            for(i = 0; i<php.length; i++){
                let p = document.createElement('p');
                p.className= 'btn-type php';
                p.innerHTML = php[i];
                p.addEventListener('click', chooseType);
                typesChoices.appendChild(p);
            }
        }
    });
});

function chooseType(i){
    let type = i.target.className.split(' ')[1];
    let choice = i.target.innerHTML;
    let btnSubmit = document.querySelector('.btnSubmit');
    let generated = document.querySelector('.generated-code');
    console.log(type);
    console.log(choice);
    if(type != "" && choice != ""){
        let prompt = "Generate an exemple of "+choice+" in "+type+ " and explain it.";
        generated.innerHTML = prompt; 
        btnSubmit.removeAttribute('disabled');
        btnSubmit.addEventListener('click', function(){
            generated.innerHTML = "";
            btnSubmit.setAttribute('disabled', '');
            btnSubmit.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
            fetch(`https://api.openai.com/v1/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 2000,
                    model: "text-davinci-003"
                }),
            })
            .then((response) => response.json())
            .then(data =>
                generated.innerHTML = data.choices[0].text.split("\n").map((str) => `<p>${str}</p>`).join("")
                )
            .then(
                btnSubmit.innerHTML = "Generate code"
                )
            prompt = "";
        })
        
    }
}