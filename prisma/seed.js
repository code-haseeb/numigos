const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // 1. Create Users
    const password = await bcrypt.hash('password123', 10);

    const user1 = await prisma.user.upsert({
        where: { email: 'sarah@nutech.edu.pk' },
        update: {},
        create: {
            name: 'Sarah Ahmad',
            email: 'sarah@nutech.edu.pk',
            password,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'bilal@nutech.edu.pk' },
        update: {},
        create: {
            name: 'Bilal Ahmed',
            email: 'bilal@nutech.edu.pk',
            password,
        },
    });

    console.log(`Created users: ${user1.name}, ${user2.name}`);

    // 2. Create Communities
    const comm1 = await prisma.community.upsert({
        where: { name: 'Nutech CS Society' },
        update: {},
        create: {
            name: 'Nutech CS Society',
            description: 'The official community for CS students. Coding, Hackathons, and AI.',
            imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            creatorId: user2.id,
            members: { connect: [{ id: user1.id }, { id: user2.id }] }
        },
    });

    const comm2 = await prisma.community.upsert({
        where: { name: 'Arts & Media Club' },
        update: {},
        create: {
            name: 'Arts & Media Club',
            description: 'For the creative minds. Photography, design, and exhibitions.',
            imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            creatorId: user1.id,
            members: { connect: [{ id: user1.id }] }
        },
    });

    const comm3 = await prisma.community.upsert({
        where: { name: 'Pakistan Nutech Cultural Society' },
        update: {},
        create: {
            name: 'Pakistan Nutech Cultural Society',
            description: 'Celebrating the rich heritage and culture of Pakistan at Nutech. Join us for cultural nights and food festivals.',
            imageUrl: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=800&auto=format&fit=crop',
            creatorId: user1.id,
            members: { connect: [{ id: user1.id }, { id: user2.id }] }
        },
    });

    const comm4 = await prisma.community.upsert({
        where: { name: 'Nutech Tech Club' },
        update: {},
        create: {
            name: 'Nutech Tech Club',
            description: 'Innovating for the future. Robotics, AI, and hackathons.',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
            creatorId: user2.id,
            members: { connect: [{ id: user2.id }] }
        },
    });

    console.log('Seeded communities');

    // 3. Create Blogs (Posts)
    const post1 = await prisma.post.create({
        data: {
            title: 'My Journey Through the First Semester',
            content: 'Starting university can be overwhelming. When I first stepped onto the Nutech campus, I didn\'t know what to expect. The buildings looked huge, the schedule seemed packed, and I knew no one. Fast forward to the end of the semester, and it\'s been a ride I wouldn\'t trade for anything. Finding my tribe was key - joining societies helped immensely.',
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Student Life',
            authorId: user1.id,
            comments: {
                create: [
                    { content: 'Totally agree with the joining societies part!', authorId: user2.id },
                    { content: 'Great advice for freshmen.', authorId: user2.id },
                ]
            }
        },
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Highlights from the Winter Hackathon',
            content: 'The Computer Science Society hosted its annual hackathon last weekend. We saw some incredible projects ranging from AI healthcare solutions to smart campus apps. The energy was electric, and seeing everyone code through the night was inspiring. Congrats to the winning team!',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Events',
            authorId: user2.id,
            comments: {
                create: [
                    { content: 'Can\'t wait for the next one!', authorId: user1.id },
                ]
            }
        },
    });
    console.log('Seeded blogs and comments');

    // 4. Create Upcoming Events
    const event1 = await prisma.event.create({
        data: {
            title: 'Winter Coding Bootcamp 2024',
            date: '2024-12-28',
            time: '10:00 AM',
            location: 'Computer Lab 4',
            imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user2.id,
            communityId: comm1.id
        }
    });

    const event2 = await prisma.event.create({
        data: {
            title: 'AI & Machine Learning Workshop',
            date: '2024-12-30',
            time: '02:00 PM',
            location: 'Main Auditorium',
            imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user2.id,
            communityId: comm4.id
        }
    });

    const event3 = await prisma.event.create({
        data: {
            title: 'New Year Cultural Night',
            date: '2024-12-31',
            time: '06:00 PM',
            location: 'University Grounds',
            imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user1.id,
            communityId: comm3.id
        }
    });

    const event4 = await prisma.event.create({
        data: {
            title: 'Photography Exhibition Opening',
            date: '2025-01-05',
            time: '05:00 PM',
            location: 'Arts Gallery, Building C',
            imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user1.id,
            communityId: comm2.id
        }
    });

    const event5 = await prisma.event.create({
        data: {
            title: 'Robotics Competition 2025',
            date: '2025-01-10',
            time: '09:00 AM',
            location: 'Engineering Workshop',
            imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user2.id,
            communityId: comm4.id
        }
    });

    const event6 = await prisma.event.create({
        data: {
            title: 'Career Fair 2025',
            date: '2025-01-15',
            time: '10:00 AM',
            location: 'Sports Complex',
            imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user1.id,
            communityId: null
        }
    });

    const event7 = await prisma.event.create({
        data: {
            title: 'Web Development Masterclass',
            date: '2025-01-18',
            time: '03:00 PM',
            location: 'Lab 3, CS Building',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user2.id,
            communityId: comm1.id
        }
    });

    const event8 = await prisma.event.create({
        data: {
            title: 'Traditional Food Festival',
            date: '2025-01-20',
            time: '12:00 PM',
            location: 'Main Cafeteria',
            imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&w=800&q=80',
            creatorId: user1.id,
            communityId: comm3.id
        }
    });

    console.log('Seeded 8 upcoming events');

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
