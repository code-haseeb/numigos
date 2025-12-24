# Quick Start Guide - Event System

## ✅ Implementation Complete!

All changes have been successfully implemented. The event management system is now ready to use.

## 🔄 Important: Restart the Server

Since the server code (`server.js`) has been updated with new API endpoints, you need to restart the server:

1. **Stop the current server**: Press `Ctrl+C` in the terminal running `npm start`
2. **Start the server again**: Run `npm start`

Alternatively, if you're using nodemon, it should auto-restart.

## 🧪 Testing the Implementation

### 1. Create an Event
1. Open your browser and navigate to the Community page
2. Make sure you're logged in
3. Click the "+ Create Event" button in the sidebar
4. Fill in the form:
   - **Event Title**: "Winter Hackathon 2024"
   - **Date**: Select a future date
   - **Time**: "10:00 AM"
   - **Location**: "Computer Lab 3"
   - **Image**: Upload an event poster (optional)
5. Click "Create Event"
6. You should see a success toast message
7. The event should appear in the "Upcoming Events" section

### 2. View Events
- Navigate to the Community page
- The "Upcoming Events" section should display all events from the database
- Each event card shows:
  - Event image
  - Event title
  - Date and time
  - Location

### 3. API Testing (Optional)

You can test the API endpoints directly using curl or Postman:

#### Get All Events
```bash
curl http://localhost:3000/api/events
```

#### Create Event (requires authentication)
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Event",
    "date": "2024-12-30",
    "time": "14:00",
    "location": "Main Hall",
    "imageUrl": ""
  }'
```

## 📊 Database Verification

You can verify the Event table was created in your PostgreSQL database:

```bash
npx prisma studio
```

This will open Prisma Studio where you can:
- View all events in the database
- See the relationships between Users, Communities, and Events
- Manually add/edit/delete events for testing

## 🎯 What's Working Now

✅ Events are saved to the PostgreSQL database
✅ Events are loaded from the database on page load
✅ Authentication is required to create events
✅ Form validation ensures all required fields are filled
✅ Image upload support for event posters
✅ Beautiful UI with loading states and error handling
✅ Events can optionally be associated with communities

## 🐛 Troubleshooting

### Events not showing up?
- Check browser console for errors
- Verify the server is running
- Check that the database migration was applied
- Try refreshing the page

### Can't create events?
- Make sure you're logged in
- Check that all required fields are filled
- Look for error messages in the toast notifications
- Check browser console for API errors

### Server errors?
- Make sure Prisma Client was regenerated: `npx prisma generate`
- Verify the migration was applied: `npx prisma migrate status`
- Check server logs for detailed error messages

## 📝 Summary of Files Changed

1. **prisma/schema.prisma** - Added Event model
2. **server.js** - Added event API endpoints
3. **script.js** - Added loadEvents() and updated handleCreateEvent()
4. **Database** - New Event table created via migration

## 🚀 Next Steps

The basic event system is complete! You can now:
- Create events
- View events
- Delete events (only creators)

Consider adding these features next:
- Event editing
- Event RSVP/attendance
- Event filtering by date/community
- Calendar view
- Event reminders
