const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkEvents() {
    try {
        const events = await prisma.event.findMany({
            include: {
                creator: { select: { name: true } },
                community: { select: { name: true } }
            },
            orderBy: { date: 'asc' }
        });

        console.log(`\n✅ Found ${events.length} events in the database:\n`);

        events.forEach((event, index) => {
            console.log(`${index + 1}. ${event.title}`);
            console.log(`   📅 ${event.date} at ${event.time}`);
            console.log(`   📍 ${event.location}`);
            console.log(`   👤 Created by: ${event.creator.name}`);
            console.log(`   🏛️  Community: ${event.community ? event.community.name : 'General Event'}`);
            console.log('');
        });

        console.log('✨ All events loaded successfully!\n');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkEvents();
