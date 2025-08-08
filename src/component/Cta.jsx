import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

export default function Cta() {
  const ownerEmail = "13.tech.ak@gmail.com";
  const {
    register,
    handleSubmit,
    reset,

    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({ mode: "onChange" });

  const [status, setStatus] = useState("");
  const [formLocked, setFormLocked] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFormLocked(true);
      const timer = setTimeout(() => {
        setStatus("");
        reset();
        setFormLocked(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    if (formLocked) return;
    setStatus("Sending...");

    try {
      const res = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (res.status === 200) {
        setStatus("Message sent successfully!");
      } else {
        setStatus("Failed to send: Unexpected response");
      }
    } catch (err) {
      console.error("EmailJS Error", err);
      setStatus("Network or Email service error");
    }
  };

  return (
    <div
      id="contact"
      className="relative z-10 w-full min-h-max px-6 sm:px-8 md:px-16 py-8 lg:py-14 flex justify-center  bg-[#F6F5F0]"
    >
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 ">
        <div>
          <h2 className="text-2xl md:text-4xl font-semibold text-[#0F0F0F] mb-4">
            Let’s Build What’s Next
          </h2>
          <div className="flex-col items-center justify-between lg:max-h-7xl ">
            <p className="text-[15px] sm:text-[17px] mb-6">
              Open to full–time roles, freelance work, or meaningful
              collaborations.
            </p>
            <p className="text-[15px] sm:text-[17px]">
              If you’re looking for someone who writes clean code, thinks in
              components, and cares about the user — I’d be glad to connect.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <span className="text-xl">
                <FaEnvelope />
              </span>
              <span className="text-[15px] sm:text-[17px] font-medium">
                13.tech.ak@gmail.com
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:pt-14">
          <div>
            <label className="block mb-1 font-medium text-[15px] sm:text-[17px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name must contain only letters",
                },
              })}
              className="w-full border-2 border-black p-3 rounded-2xl outline-none bg-inherit"
              placeholder="Enter Your Name"
              disabled={formLocked}
            />
            {errors.name && (
              <p className="text-[15px] sm:text-[17px] text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-[15px] sm:text-[17px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
                validate: (value) =>
                  value.toLowerCase() !== ownerEmail.toLowerCase() ||
                  "You can not use the owner's email.",
              })}
              className="w-full border-2 border-black p-3 rounded-2xl outline-none  bg-inherit"
              placeholder="Enter Your Email"
              disabled={formLocked}
            />
            {errors.email && (
              <p className="text-[15px] sm:text-[17px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-[15px] sm:text-[17px]">
              Message
            </label>
            <textarea
              name="message"
              {...register("message", { required: "Message is required" })}
              className="w-full border-2 border-black p-3 rounded-2xl outline-none h-32  bg-inherit"
              placeholder="Enter Your Message"
              disabled={formLocked}
            />
            {errors.message && (
              <p className="text-[15px] sm:text-[17px] text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {status && (
            <p
              className={`text-[15px] sm:text-[17px] ${
                status.includes("successfully")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}

          <div className=" flex justify-end">
            <button
              type="submit"
              className="px-4 py-1 rounded-full bg-gradient-to-b from-[#0EA5E9] to-[#8B5CF6] text-white border border-[#22D3EE]"
              disabled={isSubmitting || formLocked}
            >
              {isSubmitting && !isSubmitSuccessful ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
