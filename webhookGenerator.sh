#!/bin/bash

# Array of random messages
messages=("Hello" "Hi there" "Greetings" "How are you?" "Webhook test" "Random message" "Ping" "Sample text" "Another test" "Final message")

while true; do
  # Generate a random sleep duration between 1 and 10 seconds
  sleep_time=$(( (RANDOM % 10) + 1 ))
  echo "Waiting $sleep_time seconds..."
  sleep $sleep_time

  # Pick a random message
  random_index=$(( RANDOM % ${#messages[@]} ))
  random_text="${messages[$random_index]}"

  # Send the POST request with the correct Content-Type header
  curl --request POST \
    --url http://localhost:3001/webhook \
    --header "Content-Type: application/json" \
    --data "{\"text\": \"$random_text\"}"
  
  echo ""

done