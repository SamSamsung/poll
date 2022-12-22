<?php

$id = intval($_GET['id']);
session_start();
$_SESSION["pollid"] = $id;

$DATABASE_HOST = $_SERVER['dbhost'];
$DATABASE_USER = $_SERVER['dbuser'];
$DATABASE_PASS = $_SERVER['dbpass'];
$DATABASE_NAME = $_SERVER['dbname'];

$con = mysqli_connect(
  $DATABASE_HOST,
  $DATABASE_USER,
  $DATABASE_PASS,
  $DATABASE_NAME
);
if (mysqli_connect_errno()) {
  exit();
}

if ($stmt = $con->prepare("SELECT name, questions, deadline FROM polls WHERE id = ?")) {
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows == 0) {
        header("Location: /");
        $stmt->close();
        $con->close();
        exit;
    } else {
        $stmt->bind_result($name, $questions, $deadline);
        $stmt->fetch();
    };
    $stmt->close();
}

$questions = json_decode($questions, true);

?>

<html>

<head>
    <title><?php echo $name;?></title>
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <div id="formdiv">
        <form action="/submitform.php" method="POST">
            <?php foreach($questions as $question):?>
            <?php if ($question["type"] == "title"):?>
            <h1><?php echo $question["textcontent"];?></h1>
            <?php elseif ($question["type"] == "text"):?>
            <p><?php echo $question["textcontent"];?></p>
            <?php elseif ($question["type"] == "textinput"):?>
            <label for="<?php echo $question["name"];?>"><?php echo $question["question"];?></label>
            <br>
            <input type="text" name="<?php echo $question["name"];?>"
                placeholder="<?php echo $question["placeholder"];?>">
            <br>
            <?php elseif ($question["type"] == "dropdown"):?>
            <label for="<?php echo $question["name"];?>"><?php echo $question["question"];?></label>
            <br>
            <select name="<?php echo $question["name"];?>">
                <option value="<?php echo $question["placeholder"];?>" selected disabled>
                    <?php echo $question["placeholder"];?></option>
                <?php foreach ($question["options"] as $option):?>
                <option value="<?php echo $option;?>"><?php echo $option;?></option>
                <?php endforeach;?>
            </select>
            <br>
            <?php endif;?>
            <?php endforeach;?>
            <input type="submit" value="Submit form">
        </form>
    </div>
</body>

</html>