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

  // Create Users
  const userTeacher = await prisma.user.create({
    data: {
      username: 'teacher_user',
    },
  });

  const userStudent = await prisma.user.create({
    data: {
      username: 'student_user',
    },
  });

  // Create a Teacher
  const teacher = await prisma.teacher.create({
    data: {
      userId: userTeacher.id,
      firstName: 'John',
      lastName: 'Doe',
      sex: 'MALE',
      phoneNumber: '1234567890',
      address: '123 Teacher St.',
    },
  });

  // Create a Student
  const student = await prisma.student.create({
    data: {
      userId: userStudent.id,
      grade: '10',
      email: 'student@example.com',
      phoneNumber: '0987654321',
      address: '456 Student Rd.',
      sex: 'FEMALE',
    },
  });

  // Create a Batch and link it to the teacher and student
  const batch = await prisma.batch.create({
    data: {
      name: 'Math 101',
      teacherId: teacher.id,
      students: {
        connect: [{ id: student.id }],
      },
    },
  });

  // Create an Announcement related to the Batch
  const announcement = await prisma.announcement.create({
    data: {
      title: 'Exam Announcement',
      description: 'There will be an exam on Monday.',
      date: new Date(),
      batchId: batch.id,
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
