import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// create a new student
export const createStudent = async (name: string, age: number, classId: number) => {
    return await prisma.student.create({
        data: {
            name,
            age,
            classId,
        },
    });
};

// get a student by ID
export const getStudentById = async (id: number) => {
    return await prisma.student.findUnique({
        where: { id },
    });
};

// get all students
export const getAllStudents = async () => {
    return await prisma.student.findMany();
};

// update a student by ID
export const updateStudent = async (id: number, data: { name?: string; age?: number; classId?: number }) => {
    return await prisma.student.update({
        where: { id },
        data,
    });
};

// delete a student by ID
export const deleteStudent = async (id: number) => {
    return await prisma.student.delete({
        where: { id },
    });
};

// get students by grade and class
export const getStudentsByGradeAndClass = async (grade: number, classNumber: number) => {
    return await prisma.student.findMany({
        where: {
            class: {
                grade,
                class: classNumber,
            },
        },
        include: {
            class: true,
        },
    });
};