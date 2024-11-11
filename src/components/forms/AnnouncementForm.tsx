"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  Title: z.string().min(1, { message: "Title is required!" }),
  Description: z.string().min(1, { message: " Enter Description!" }),
  Date: z.date({ message: "Event date" }),
  
  
});

type Inputs = z.infer<typeof schema>;

const AnnouncementForm = ({
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
          label="Title"
          name="Title"
          defaultValue={data?.Title}
          register={register}
          error={errors.Title}
        />
        <InputField
          label="Description"
          name="Description"
          defaultValue={data?.Description}
          register={register}
          error={errors.Description}
        />
        <InputField
          label="Date"
          name="Date"
          defaultValue={data?.birthday}
          register={register}
          error={errors.Date}
          type="date"
        />
        
        
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
