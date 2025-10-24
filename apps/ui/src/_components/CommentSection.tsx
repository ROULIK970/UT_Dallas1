"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import type { FormikHelpers } from "formik"

const CommentSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  comment: Yup.string().trim().required("Comment is required"),
})

type FormValues = { name: string; comment: string }

type CommentSectionProps = {
  blogId: string | number
}

const CommentSection = ({ blogId }: CommentSectionProps) => {
  const [comments, setComments] = useState<FormValues[]>([])
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://ut-dallas-5poh.onrender.com"
        const res = await fetch(
          `${apiUrl}/api/blogs/${blogId}?populate=comments`
        )
        const data = await res.json()
        const existingComments = data.data.comments || []

        const formattedComments = existingComments.map((c: any) => ({
          name: c.commentatorName || c.name,
          comment: c.comment,
        }))

        setComments(formattedComments)
        console.log(formattedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [blogId])

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true)
    setStatusMessage(null)
    setIsError(false)

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://ut-dallas-5poh.onrender.com"

      const res = await fetch(`${apiUrl}/api/blogs/${blogId}?populate=comments`)
      if (!res.ok) throw new Error("Failed to fetch blog data")

      const data = await res.json()
      const existingComments = data.data.comments || []

      const newComment = {
        commentatorName: values.name,
        comment: values.comment,
      }

      const updatedComments = [
        ...existingComments.map((c: any) => ({
          commentatorName: c.commentatorName,
          comment: c.comment,
        })),
        newComment,
      ]

      const updateRes = await fetch(`${apiUrl}/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            comments: updatedComments,
          },
        }),
      })

      if (!updateRes.ok) {
        const errorData = await updateRes.json().catch(() => ({}))
        console.error("[v0] Strapi error response:", errorData)

        const errorMessage =
          errorData?.error?.message || `Server error: ${updateRes.status}`
        throw new Error(errorMessage)
      }

      setComments([...comments, { name: values.name, comment: values.comment }])
      setStatusMessage("Comment posted successfully!")
      setIsError(false)
      resetForm()
    } catch (error) {
      console.error("[v0] Error posting comment:", error)
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
      setIsError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        Loading comments...
      </div>
    )
  }

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <Formik
        initialValues={{ name: "", comment: "" }}
        validationSchema={CommentSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium mb-1"
              >
                Your Comment
              </label>
              <Field
                id="comment"
                name="comment"
                as="textarea"
                placeholder="What are your thoughts on this blog?"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex w-[245px] ml-auto px-[20px] py-[16px] justify-center items-center gap-2.5 rounded-[9px] border border-[#979797] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] font-medium text-[#333] disabled:opacity-50 hover:bg-gray-50"
            >
              {isSubmitting ? "Posting..." : "Post a Comment"}
            </button>

            {statusMessage && (
              <p
                className={`text-sm ${isError ? "text-red-600" : "text-green-600"}`}
              >
                {statusMessage}
              </p>
            )}

            <div className="mt-6" aria-live="polite">
              {comments.length > 0 ? (
                <div className="space-y-3">
                  {comments.map((c, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-gray-200 p-3"
                    >
                      <div className="flex">
                        <Image
                          src="/demo-img.svg"
                          alt={`${c.name}'s avatar`}
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <p className="font-semibold text-[18px]">{c.name}</p>
                      </div>

                      <div className="text-[16px] text-gray-700">
                        {c.comment}
                      </div>
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
