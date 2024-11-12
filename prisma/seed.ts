// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create an Admin
  const admin = await prisma.admin.create({
    data: {
      username: 'admin_user',
    },
  });

  // Create a Teacher
  const teacher = await prisma.teacher.create({
    data: {
      teacherId: 'T001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      photo: 'https://example.com/photo.jpg',
      phone: '1234567890',
      address: '123 Teacher St.',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  });

  // Create a Student
  const student = await prisma.student.create({
    data: {
      studentId: 'S001',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      photo: 'https://example.com/photo2.jpg',
      phone: '0987654321',
      grade: 10,
      address: '456 Student Ave.',
    },
  });

  // Create a Batch and associate it with the teacher and student
  const batch = await prisma.batch.create({
    data: {
      batchname: 'Math 101',
      capacity: 30,
      teacherId: teacher.id,
      zoomLink: 'https://zoom.us/j/123456789',
      students: {
        connect: [{ id: student.id }],
      },
    },
  });

  // Create an Announcement
  const announcement = await prisma.announcement.create({
    data: {
      title: 'New Course Launch',
      description: 'We are excited to announce the launch of a new course.',
      date: new Date(), // Current date
    },
  });

  console.log('Seeding completed');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
