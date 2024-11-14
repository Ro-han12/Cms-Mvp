import prisma from "@/lib/prisma";
import FormModal from "@/components/FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table: "teacher" | "student" | "batch" | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "batch":
        const teachers = await prisma.teacher.findMany({
          select: { id: true, name: true },
        });
        const students = await prisma.student.findMany({
          select: { id: true, name: true, grade: true },
        });
        relatedData = { teachers, students };
        break;

      case "teacher":
        const teacherBatches = await prisma.batch.findMany({
          select: { id: true, batchname: true },
        });
        relatedData = { batches: teacherBatches };
        break;

      case "student":
        const studentBatches = await prisma.batch.findMany({
          select: { id: true, batchname: true },
        });
        relatedData = { batches: studentBatches };
        break;

      case "announcement":
        // No related data needed for announcements, assuming simple structure
        relatedData = {};
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
