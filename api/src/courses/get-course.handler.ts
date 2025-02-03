import { RequestHandler } from "express";
import { db } from "../common/db";
import { IdSchema } from "../common/zod-schemas";
import { Prisma } from "@prisma/client";

// Helper function to fetch course data
export const getCourseData = async (courseId: number) => {
  const where: Prisma.CourseWhereInput = {
    id: courseId,
  };

  const data = await db.course.findFirst({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      liveLink: true,
      archived: true,
      modulesOrder: true,
      modules: {
        select: {
          id: true,
          title: true,
          topics: {
            select: {
              id: true,
              title: true,
              videoLink: true,
              assignmentFiles: true,
              resourceFiles: true,
            },
          },
        },
      },
      projectFiles: true,
    },
  });

  return data;
};

// Main handler to get course details
export const getCourseHandler: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const courseId = IdSchema.parse(req.params.courseId);
    let data = null;

    data = await getCourseData(courseId);

    res.json(data);
  } catch (error) {
    next(error);
  }
};
