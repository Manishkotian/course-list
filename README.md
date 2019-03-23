
# Course List

## How to setup

### Clone the project

Run the command
 ### `git clone https://github.com/Manishkotian/course-list.git`
 
 Go to project directory
 ### `cd course-list`
 
 ### Package install

Run the command
 ### `npm install`


## How To Run

Run the command
 ### `npm start`

## Process of implementation
1. Fetched endpoint Api and stored the value in state.
2. Looped through Api data to get provider, university and subject list.
3. Looped through Api data to format next session date and  length (because empty strings found in next date session and length).
4. Used React-Bootstrap for UI responsiveness.

## Project structure
1. Containers are the smart components which has filter logic and course listing(i.e Search component and App component)
2. Components are the dumb components which is card layout and navbar layout.
3. Constants are the strings used in all components.
4. Styles are the global stylesheet used for styling.
5. Utils are the functionality done like getting provider, universities, subject, child subject lists, formatting date and length, apply filter and clear filter.

## Features
1. User can filter by next session date(nearest date last) which will sort the course list displaying next session date in ascending order.
2. User can filter by next session date(nearest date first) which will sort the course list displaying next session date in descending order.
3. User can filter by length(highest first ) which will sort the course list displaying length in descending order.
4. User can filter by length(lowest first ) which will sort the course list displaying length in ascending order.
5. User can clear the filter applied using clear button.
6. User can filter the course list using child subject.

## Note
In my current organization we  don't write unit test, due to my busy schedule in my current job it was little more time consuming for me to learn and implement unit test in this code base, so i was unable to write test cases.
