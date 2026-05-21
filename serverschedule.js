const blocksEachDay = {
    'monday': ['A', 'B', 'C', 'D', 'E'],
    'tuesday': ['B', 'C', 'D', 'E', 'A'],
    'wednesday': ['C', 'D', 'E', 'A', 'B'],
    'thursday': ['D', 'E', 'A', 'B', 'C'],
    'friday': ['E', 'A', 'B', 'C', 'D'],
    'saturday': ['A', 'B', 'C', 'D', 'E']
}

// 1. Know the day
// 2. Query database for the student's classes
// 3. Order classes based on given schedule by day
// 4. Serve information to client