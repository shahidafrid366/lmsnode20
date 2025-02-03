import { RequestHandler } from "express";
import { db } from "../../common/db";
import { IdSchema } from "../../common/zod-schemas";

// Explicitly declare the return type as Promise<void>
export const deleteModuleHandler: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const moduleId = await IdSchema.parseAsync(req.params.moduleId);
    await db.module.delete({
      where: {
        id: moduleId,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
