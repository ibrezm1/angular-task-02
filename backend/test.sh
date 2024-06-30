#!/bin/bash

# Set the username and password for basic authentication
USERNAME="u"
PASSWORD="p"

# Base URL for the API
# BASE_URL="https://zoomcarft.000webhostapp.com/proj-react/backend/api2.php"
BASE_URL="http://localhost/be/taskbe/api.php"

# Function to perform a GET request
get_tasks() {
  curl -u $USERNAME:$PASSWORD -X GET "$BASE_URL?table=demo_tasks&limit=10&page=1&search=$1"
}

# Function to perform a POST request to insert data
insert_task() {
  curl -u $USERNAME:$PASSWORD -X POST "$BASE_URL?table=demo_tasks&action=insert" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Description of the new task",
    "status": "pending"
  }'
}

# Function to perform a POST request to update data
update_task() {
  curl -u $USERNAME:$PASSWORD -X POST "$BASE_URL?table=demo_tasks&action=update&id=$1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task Title",
    "description": "Updated description",
    "status": "pending"
  }'
}

# Function to delete the last task
delete_last_task() {
  # Get all tasks
  tasks=$(curl -u $USERNAME:$PASSWORD -X GET "$BASE_URL?table=demo_tasks")
  
  # Extract the ID of the last task
  last_id=$(echo "$tasks" | jq -r '.[-1].id')

  if [ -z "$last_id" ]; then
    echo "No tasks found or unable to retrieve the last task ID."
    return 1
  fi

  echo "Deleting task with ID: $last_id"

  # Delete the last task
  curl -u $USERNAME:$PASSWORD -X POST "$BASE_URL?table=demo_tasks&action=delete&id=$last_id"
}

# Function to perform a GET request to fetch all tasks
get_all_tasks() {
  curl -u $USERNAME:$PASSWORD -X GET "$BASE_URL?table=demo_tasks"
}


# Function to perform a POST request to delete data
delete_task() {
  curl -u $USERNAME:$PASSWORD -X POST "$BASE_URL?table=demo_tasks&action=delete&id=$1"
}

# Example usage
echo "Getting tasks with search term 'report'"
get_tasks "g"

echo "Inserting a new task"
insert_task

echo "Updating task with ID 1"
update_task 25

echo "Deleting task with ID 1"
delete_task 2


# Example usage
echo "Fetching all tasks"
get_all_tasks

echo "Deleting the last task"
delete_last_task