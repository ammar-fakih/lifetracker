export const inputs = {
  exercise: [
    { name: 'Exercise Name', type: 'text', dbName: 'name' },
    { name: 'Exercise Category', type: 'text', dbName: 'category' },
    { name: 'Duration', type: 'number', dbName: 'duration' },
    { name: 'Intensity', type: 'number', dbName: 'intensity' },
  ],
  nutrition: [
    { name: 'Nutrition Name', type: 'text', dbName: 'name' },
    { name: 'Nutrition Category', type: 'text', dbName: 'category' },
    { name: 'Quantity', type: 'number', dbName: 'quantity' },
    { name: 'Calories', type: 'number', dbName: 'calories' },
    { name: 'Image URL', type: 'text', dbName: 'image_url' },
  ],
  sleep: [
    { name: 'Start Time', type: 'date', dbName: 'start_time' },
    { name: 'End Time', type: 'date', dbName: 'end_time' },
  ],
};
