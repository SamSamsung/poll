<?php

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

if ($stmt = $con->prepare("INSERT into polls (name, questions) VALUES (?, ?)")) {
    $stmt->bind_param('ss', $_POST['name'], $_POST['conf']);
    $stmt->execute();
    $insert_id = strval($stmt->insert_id);
    $stmt->close();
}

$parsed_names = json_decode($_POST["fields"]);

$col_names = "(`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,";
foreach ($parsed_names as $key => $value) {
    $col_names = $col_names.$value." TEXT,";
}
$col_names[-1] = ")";


if ($stmt = $con->prepare("CREATE TABLE poll".$insert_id." ".$col_names."  ENGINE=InnoDB DEFAULT CHARSET=utf8;")) {
    $stmt->execute();
    $stmt->close();
}
$con->close();

header("Location: /pollcreator.php");