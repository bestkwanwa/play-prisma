import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Teachers
    const teacher1 = await prisma.teacher.create({
        data: {
            name: 'John Doe',
            subject: 'Mathematics',
        },
    });

    const teacher2 = await prisma.teacher.create({
        data: {
            name: 'Jane Smith',
            subject: 'Science',
        },
    });

    // Seed Classes
    const class1 = await prisma.class.create({
        data: {
            grade: 10,
            class: 1,
        },
    });

    const class2 = await prisma.class.create({
        data: {
            grade: 10,
            class: 2,
        },
    });

    // Seed Students
    await prisma.student.createMany({
        data: [
            { name: 'Alice', age: 15, classId: class1.id },
            { name: 'Bob', age: 16, classId: class1.id },
            { name: 'Charlie', age: 15, classId: class2.id },
            { name: 'David', age: 16, classId: class2.id },
        ],
    });

    // Assign Head Teachers to Classes
    await prisma.$transaction([
        prisma.class.update({
            where: { id: class1.id },
            data: {
                headTeacher: {
                    connect: { id: teacher1.id },
                },
                teachers: {
                    connect: { id: teacher1.id },
                },
            },
        }),
        prisma.class.update({
            where: { id: class2.id },
            data: {
                headTeacher: {
                    connect: { id: teacher2.id },
                },
                teachers: {
                    connect: { id: teacher2.id },
                },
            },
        }),
        prisma.teacher.update({
            where: { id: teacher1.id },
            data: {
                headClassId: class1.id,
            },
        }),
        prisma.teacher.update({
            where: { id: teacher2.id },
            data: {
                headClassId: class2.id,
            },
        }),
    ]);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
