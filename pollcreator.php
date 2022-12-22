<html>

<head>
    <title>Poll creator</title>
    <link rel="stylesheet" href="/main.css">
</head>

<body>
    <div id="context-menu">
        <div class="ctxitem" id="ctxtextcontent">
            Change text
        </div>
        <div class="ctxitem" id="ctxquestion">
            Change question
        </div>
        <div class="ctxitem" id="ctxplaceholder">
            Change placeholder
        </div>
        <div class="ctxitem" id="ctxoptions">
            Change options
        </div>
        <div class="ctxitem" id="ctxID">
            Change ID
        </div>
        <div class="ctxitem" id="ctxup">
            Move up
        </div>
        <div class="ctxitem" id="ctxdown">
            Move down
        </div>
    </div>
    <div id="pollcreator">
        <div id="pollcontrol">
            <form action="/pollcreation.php" method="POST">
                <input type="text" name="name" placeholder="Poll name">
                <input type="hidden" id="conf" name="conf">
                <input type="hidden" id="fields" name="fields">
                <input type="submit" value="Create poll">
            </form>
            <div id='addfield'>
                <select id="addfieldtype">
                    <option value="none" selected disabled>Select</option>
                    <option value="title">Title</option>
                    <option value="text">Text</option>
                    <option value="textinput">Text input</option>
                    <option value="dropdown">Dropdown</option>
                </select>
                <input type="text" class="additionalinfo" id="addfieldtextcontent" placeholder="Content">
                <input type="text" class="additionalinfo" id="addfieldquestion" placeholder="Question">
                <input type="text" class="additionalinfo" id="addfieldplaceholder" placeholder="Placeholder">
                <input type="text" class="additionalinfo" id="addfieldoptions" placeholder="Options (separated by ;)">
                <input type="text" class="additionalinfo" id="addfieldid" placeholder="ID">
                <button id='addfieldsubmit'>Add field</button>
            </div>
        </div>
        <div id='formdiv'>

        </div>
    </div>
</body>
<script src="/js/pollcreator.js"></script>

</html>