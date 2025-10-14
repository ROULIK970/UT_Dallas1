"use client"
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik"
import * as Yup from "yup"
import Image from "next/image"

const CommentSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  comment: Yup.string().trim().required("Comment is required"),
})

type FormValues = { name: string; comment: string }

const CommentSection = () => {
  const [comments, setComments] = useState<FormValues[]>([])



  //No backend, just simulating a submit
  const handleSubmit = (
    values: FormValues,
    { resetForm, setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true)
    setStatus(null)


    const submitted = { ...values }

    setTimeout(() => {
      setComments((prev) => [...prev, submitted])
      setStatus({ success: "Comment posted successfully!" })
      resetForm()
      setSubmitting(false)
    }, 500)
  }

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <Formik initialValues={{ name: "", comment: "" }} validationSchema={CommentSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                name="comment"
                as="textarea"
                placeholder="What are your thought on this blog ?"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage name="comment" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex w-[245px] ml-auto px-[20px] py-[16px] justify-center items-center gap-[10px] rounded-[9px] border border-[#979797] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] font-medium text-[#333] disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post a Comment"}
            </button>

            {status?.success && <p className="text-green-600 text-sm">{status.success}</p>}
            {status?.error && <p className="text-red-500 text-sm">{status.error}</p>}

            <div className="mt-6" aria-live="polite">
              {comments.length > 0 ? (
                <div className="space-y-3">
                  {comments.map((c, idx) => (
                    <div key={idx} className="rounded-md border border-gray-200 p-3">
                      <div className="flex">
                        <Image src='/demo-img.svg' alt='demo-img' width={32}
                          height={32}
                          className="rounded-full mr-2" />
                        <p className="font-[600] text-[18px]">{c.name}</p>
                      </div>

                      <div className="text--[16px] text-gray-700]">{c.comment}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CommentSection
