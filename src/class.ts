import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new class
export const createClass = async (grade: number, classNumber: number) => {
  return await prisma.class.create({
    data: {
      grade,
      class: classNumber,
    },
  });
};

// Get a class by ID
export const getClassById = async (id: number) => {
  return await prisma.class.findUnique({
    where: { id },
    include: {
      students: true,
      teachers: true,
      headTeacher: true,
    },
  });
};

// Get all classes
export const getAllClasses = async () => {
  return await prisma.class.findMany({
    include: {
      students: true,
      teachers: true,
      headTeacher: true,
    },
  });
};

// Update a class by ID
export const updateClass = async (id: number, grade: number, classNumber: number) => {
  return await prisma.class.update({
    where: { id },
    data: {
      grade,
      class: classNumber,
    },
  });
};

// Delete a class by ID
export const deleteClass = async (id: number) => {
  return await prisma.class.delete({
    where: { id },
  });
};

// Add a teacher to a class
export const addTeacherToClass = async (teacherId: number, grade: number, classNumber: number) => {
  const updatedClass = await prisma.class.update({
    where: {
      grade_class: {
        grade,
        class: classNumber,
      },
    },
    data: {
      teachers: {
        connect: { id: teacherId },
      },
    },
  });
  return updatedClass;
};

// Get all teachers in a class
export async function getAllTeachersInClass(grade: number, classNumber: number) {
  const classWithTeachers = await prisma.class.findUnique({
    where: {
      grade_class: {
        grade,
        class: classNumber,
      },
    },
    include: {
      teachers: true,
    },
  });

  return classWithTeachers?.teachers || [];
}