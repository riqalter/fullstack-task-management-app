<?php
require 'config.php';

// Get all tasks
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM tasks ORDER BY created_at DESC";
    $result = mysqli_query($db_conn, $sql);
    $tasks = array();
    
    while ($row = mysqli_fetch_assoc($result)) {
        $tasks[] = $row;
    }
    
    echo json_encode($tasks);
}

// Create new task
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    $title = mysqli_real_escape_string($db_conn, $data->title);
    $description = mysqli_real_escape_string($db_conn, $data->description);
    $status = mysqli_real_escape_string($db_conn, $data->status);
    $due_date = mysqli_real_escape_string($db_conn, $data->due_date);
    
    $sql = "INSERT INTO tasks (title, description, status, due_date) 
            VALUES ('$title', '$description', '$status', '$due_date')";
    
    if (mysqli_query($db_conn, $sql)) {
        echo json_encode(array("message" => "Task created successfully"));
    } else {
        echo json_encode(array("message" => "Task creation failed"));
    }
}

// Update task
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    
    $id = mysqli_real_escape_string($db_conn, $data->id);
    $title = mysqli_real_escape_string($db_conn, $data->title);
    $description = mysqli_real_escape_string($db_conn, $data->description);
    $status = mysqli_real_escape_string($db_conn, $data->status);
    $due_date = mysqli_real_escape_string($db_conn, $data->due_date);
    
    $sql = "UPDATE tasks SET 
            title='$title', 
            description='$description', 
            status='$status', 
            due_date='$due_date' 
            WHERE id=$id";
    
    if (mysqli_query($db_conn, $sql)) {
        echo json_encode(array("message" => "Task updated successfully"));
    } else {
        echo json_encode(array("message" => "Task update failed"));
    }
}

// Delete task
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    
    $sql = "DELETE FROM tasks WHERE id=$id";
    
    if (mysqli_query($db_conn, $sql)) {
        echo json_encode(array("message" => "Task deleted successfully"));
    } else {
        echo json_encode(array("message" => "Task deletion failed"));
    }
}
?>