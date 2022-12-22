<?php

$DATABASE_HOST = $_SERVER['dbhost'];
$DATABASE_USER = $_SERVER['dbuser'];
$DATABASE_PASS = $_SERVER['dbpass'];
$DATABASE_NAME = $_SERVER['dbname'];

session_start();
if (!isset($_SESSION["pollid"])) {
    header("Location: /");
    exit;
} else {
    $pollid = $_SESSION["pollid"];
}

$con = mysqli_connect(
  $DATABASE_HOST,
  $DATABASE_USER,
  $DATABASE_PASS,
  $DATABASE_NAME
);
if (mysqli_connect_errno()) {
  exit();
}


$colnames = "(";
$colvals = [];
$qmarks = "(";
$types = "";

foreach ($_POST as $key => $value) {
    $colnames = $colnames.$key.",";
    $qmarks = $qmarks."?,";
    $types = $types."s";
    array_push($colvals, $value);
}

$colnames[-1] = ")";
$qmarks[-1] = ")";

if ($stmt = $con->prepare("INSERT INTO poll".$pollid." ".$colnames." VALUES ".$qmarks)) {
    $stmt->bind_param($types, ...$colvals);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($ctutorials);
        $stmt->fetch();
    } else {
        $ctutorials = "";
    }
}
$stmt->close();
$con->close();

header("Location: /");