function makenewelement(conf) {
    switch (conf["type"]) {
        case "title":
            var newnode = document.createElement("h1");
            newnode.textContent = conf["textcontent"];
            return [newnode];
            break;
        case "text":
            var newnode = document.createElement("p");
            newnode.textContent = conf["textcontent"];
            return [newnode];
            break;
        case "textinput":
            var newnode = document.createElement("input");
            var label = document.createElement("label");
            var br = document.createElement("br");
            var br2 = document.createElement("br");
            label.setAttribute("for", conf["name"]);
            label.textContent = conf["question"];
            newnode.type = 'text';
            newnode.placeholder = conf["placeholder"];
            newnode.name = conf["name"];
            return [label, br, newnode, br2];
            break;
        case "dropdown":
            var newnode = document.createElement("select");
            var label = document.createElement("label");
            var br = document.createElement("br");
            var br2 = document.createElement("br");
            label.setAttribute("for", conf["name"]);
            label.textContent = conf["question"];
            var newoption = document.createElement('option');
            newoption.value = "none";
            newoption.innerText = conf["placeholder"];
            newoption.disabled = "true";
            newoption.selected = "true";
            newnode.appendChild(newoption);
            conf["options"].split(';').forEach(element => {
                var newoption = document.createElement('option');
                newoption.value = element;
                newoption.innerText = element;
                newnode.appendChild(newoption);
            });
            newnode.name = conf["name"];
            return [label, br, newnode, br2];
            break;
            
            default:
                break;
    }
}

function getadditionalinfo(id) {
    return document.querySelector("#addfield"+id).value;
}

function hideaddtionalinfo() {
    const additionalinfo = document.querySelectorAll(".additionalinfo");
    additionalinfo.forEach(element => {
        element.style.display = 'none';
    });
}

function addadditioninfo(event) {
    const fieldtype = document.querySelector("#addfieldtype").value;
    hideaddtionalinfo();
    switch (fieldtype) {
        case "title":
            document.querySelector("#addfieldtextcontent").style.display = 'block';
            break;
        case "text":
            document.querySelector("#addfieldtextcontent").style.display = 'block';
            break;
        case "textinput":
            document.querySelector("#addfieldquestion").style.display = 'block';
            document.querySelector("#addfieldplaceholder").style.display = 'block';
            document.querySelector("#addfieldID").style.display = 'block';
            break;
        case "dropdown":
            document.querySelector("#addfieldquestion").style.display = 'block';
            document.querySelector("#addfieldplaceholder").style.display = 'block';
            document.querySelector("#addfieldID").style.display = 'block';
            document.querySelector("#addfieldoptions").style.display = 'block';
            break;
    
        default:
            break;
    }
}

function buildform(conf) {
    const simdiv = document.querySelector("#formdiv");
    simdiv.innerHTML = "";
    let count = 0;
    conf.forEach(elementconf => {
        let newnode = makenewelement(elementconf);
        let newdiv = document.createElement("div");
        newdiv.classList.add("fielddiv");
        let newdivfieldz = document.createElement("div");
        newnode.forEach(element => {
            newdivfieldz.appendChild(element);
        });
        let currentconfp = getcurconf();
        newdiv.appendChild(newdivfieldz);
        let optbtn = document.createElement("button");
        optbtn.innerHTML = "✎";
        optbtn.onclick = new Function('event', `editbtnhandler(event, ${count})`);
        newdiv.appendChild(optbtn);
        simdiv.appendChild(newdiv);
        count++;
    });
}

function getcurconf() {
    var currentconf = document.querySelector("#conf").value;
    if (!currentconf) {
        currentconf = "[]";
    };
    return JSON.parse(currentconf);
}

function ctxchangetext(pos) {
    let currentconfp = getcurconf();
    let newtext = prompt("New text", currentconfp[pos]["textcontent"]);
    currentconfp[pos]["textcontent"] = newtext;
    document.querySelector("#conf").value = JSON.stringify(currentconfp);
    buildform(currentconfp);
}

function ctxchangequestion(pos) {
    let currentconfp = getcurconf();
    let newtext = prompt("New question", currentconfp[pos]["question"]);
    currentconfp[pos]["question"] = newtext;
    document.querySelector("#conf").value = JSON.stringify(currentconfp);
    buildform(currentconfp);
}

function ctxchangeplaceholder(pos) {
    let currentconfp = getcurconf();
    let newtext = prompt("New placeholder", currentconfp[pos]["placeholder"]);
    currentconfp[pos]["placeholder"] = newtext;
    document.querySelector("#conf").value = JSON.stringify(currentconfp);
    buildform(currentconfp);
}

function ctxchangeoptions(pos) {
    let currentconfp = getcurconf();
    let newtext = prompt("New options", currentconfp[pos]["options"]);
    currentconfp[pos]["options"] = newtext;
    document.querySelector("#conf").value = JSON.stringify(currentconfp);
    buildform(currentconfp);
}

function ctxchangeID(pos) {
    let currentconfp = getcurconf();
    let newtext = prompt("New ID", currentconfp[pos]["ID"]);
    currentconfp[pos]["ID"] = newtext;
    document.querySelector("#conf").value = JSON.stringify(currentconfp);
    buildform(currentconfp);
}

function ctxmoveup(pos) {
    let currentconfp = getcurconf();
    let temp = currentconfp[pos];
    currentconfp[pos] = currentconfp[pos-1];
    currentconfp[pos-1] = temp;
    document.querySelector("#conf").value = JSON.stringify(currentconfp);
    buildform(currentconfp);
}

function editbtnhandler(event, pos) {
    const ctx = document.querySelector("#context-menu");
    let currentconfp = getcurconf();
    ctx.style.left = event.clientX;
    ctx.style.top = event.clientY;
    ctx.querySelectorAll("div").forEach(child => {
        child.style.display = "none";
    })
    console.log(pos);
    switch (currentconfp[pos]["type"]) {
        case "title":
            ctx.querySelector("#ctxtextcontent").style.display = "block";
            break;
        case "text":
            ctx.querySelector("#ctxtextcontent").style.display = "block";
            break;
        case "textinput":
            ctx.querySelector("#ctxquestion").style.display = "block";
            ctx.querySelector("#ctxplaceholder").style.display = "block";
            ctx.querySelector("#ctxID").style.display = "block";
            break;
        case "dropdown":
            ctx.querySelector("#ctxquestion").style.display = "block";
            ctx.querySelector("#ctxplaceholder").style.display = "block";
            ctx.querySelector("#ctxoptions").style.display = "block";
            ctx.querySelector("#ctxID").style.display = "block";
            break;
            
        default:
            break;
    }
    if (pos != 0) {
        ctx.querySelector("#ctxup").style.display = "block";
    }
    ctx.style.display = "block";
    ctx.querySelector("#ctxtextcontent").onclick = new Function(`ctxchangetext(${pos});hidectx()`);
    ctx.querySelector("#ctxquestion").onclick = new Function(`ctxchangequestion(${pos});hidectx()`);
    ctx.querySelector("#ctxplaceholder").onclick = new Function(`ctxchangeplaceholder(${pos});hidectx()`);
    ctx.querySelector("#ctxoptions").onclick = new Function(`ctxchangeoptions(${pos});hidectx()`);
    ctx.querySelector("#ctxID").onclick = new Function(`ctxchangeID(${pos});hidectx()`);
    ctx.querySelector("#ctxup").onclick = new Function(`ctxmoveup(${pos});hidectx()`);
}

function hidectx() {
    document.querySelector("#context-menu").style.display = "none";
}

function addfield(event) {
    const fieldtype = document.querySelector("#addfieldtype").value;
    switch (fieldtype) {
        case "title":
            var newnodeconf = {"type": fieldtype, "textcontent": document.querySelector("#addfieldtextcontent").value};
            break;
            case "text":
            var newnodeconf = {"type": fieldtype, "textcontent": document.querySelector("#addfieldtextcontent").value};
            break;
            case "textinput":
                var newnodeconf = {"type": fieldtype, "question": document.querySelector("#addfieldquestion").value, "placeholder": document.querySelector("#addfieldplaceholder").value, "name": document.querySelector("#addfieldID").value};
                break;
                case "dropdown":
                var newnodeconf = {"type": fieldtype, "question": document.querySelector("#addfieldquestion").value, "placeholder": document.querySelector("#addfieldplaceholder").value, "options": document.querySelector("#addfieldoptions").value, "name": document.querySelector("#addfieldID").value};
                break;
    
        default:
            break;
    }
    let currentconfp = getcurconf();
    currentconfp.push(newnodeconf);
    document.querySelector("#conf").value = JSON.stringify(currentconfp);
    buildform(currentconfp);
    document.querySelector("#addfieldtype").value = "none";
    hideaddtionalinfo();
}
document.querySelector("#addfieldtype").addEventListener("input", addadditioninfo);
document.querySelector("#addfieldsubmit").addEventListener("click", addfield);