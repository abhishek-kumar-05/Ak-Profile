// components/ContactForm.jsx
"use client";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function Cta() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(result.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
    setLoading(false);
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

        <form onSubmit={handleSubmit} className="space-y-4 lg:pt-14">
          <div>
            <label className="block mb-1 font-medium text-[15px] sm:text-[17px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-black p-3 rounded-2xl outline-none bg-inherit"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[15px] sm:text-[17px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-black p-3 rounded-2xl outline-none  bg-inherit"
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[15px] sm:text-[17px]">
              Message
            </label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border-2 border-black p-3 rounded-2xl outline-none h-32  bg-inherit"
              placeholder="Enter Your Message"
            />
          </div>
          <div className=" flex justify-end">
            <button
              type="submit"
              className="px-4 py-1 rounded-full bg-gradient-to-b from-[#0EA5E9] to-[#8B5CF6] text-white border border-[#22D3EE]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>

          {success && (
            <p className="text-green-600 mt-2">Message sent successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}
