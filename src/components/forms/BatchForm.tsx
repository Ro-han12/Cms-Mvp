"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  BatchName: z.string().min(1, { message: "Batch name is required!" }),
  Capacity: z.string().min(1, { message: "Max strength of the batch required!" }),
  Teachers: z.string().min(1, { message: "Select trainers for the batch" }),
  Students: z.string().min(1, { message: "Select students for the batch" }),
  ZoomLink: z.string().min(1, { message: "Enter Zoom Link" }),
  
});

type Inputs = z.infer<typeof schema>;

const BatchForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Batch</h1>
      
      
    
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Batch Name"
          name="BatchName"
          defaultValue={data?.BatchName}
          register={register}
          error={errors.BatchName}
        />
        <InputField
          label="Capacity"
          name="Capacity"
          defaultValue={data?.Capacity}
          register={register}
          error={errors.Capacity}
        />
        <InputField
          label="Teachers"
          name="Teachers"
          defaultValue={data?.Teachers}
          register={register}
          error={errors.Teachers}
        />
        <InputField
          label="Students"
          name="Students"
          defaultValue={data?.Students}
          register={register}
          error={errors.Students}
        />
        <InputField
          label="Zoom Link"
          name="ZoomLink"
          defaultValue={data?.ZoomLink}
          register={register}
          error={errors.ZoomLink}
        />
        
        
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default BatchForm;
