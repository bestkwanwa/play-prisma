import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new teacher
export const createTeacher = async (name: string, subject: string) => {
    const teacher = await prisma.teacher.create({
        data: {
            name,
            subject,
        },
    });
    return teacher;
};

// Get a teacher by ID
export const getTeacherById = async (id: number) => {
    const teacher = await prisma.teacher.findUnique({
        where: { id },
    });
    return teacher;
};

// Get all teachers
export const getAllTeachers = async () => {
    const teachers = await prisma.teacher.findMany();
    return teachers;
};

// Update a teacher by ID
export const updateTeacher = async (id: number, name: string, subject: string) => {
    const teacher = await prisma.teacher.update({
        where: { id },
        data: {
            name,
            subject,
        },
    });
    return teacher;
};

// Delete a teacher by ID
export const deleteTeacher = async (id: number) => {
    const teacher = await prisma.teacher.delete({
        where: { id },
    });
    return teacher;
};

