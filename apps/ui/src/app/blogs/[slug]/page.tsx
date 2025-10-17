import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import CommentSection from "@/_components/CommentSection"
import ShareAndDownloadButtons from "@/_components/ShareAndDownloadBtns"
import SimilarBlogsSection from "@/_components/SimilarBlogsSection"
import staticData from "@/data/staticData.json"

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const blog = staticData.blogs.similarBlogs.find(
    (blog) => blog.slug === params.slug
  )

  const blogDesc =
    "Lorem ipsum dolor sit amet consectetur. Nulla amet suspendisse convallis mauris. Lobortis est parturient auctor sed posuere diam cursus. Viverra pretium sit eget condimentum. Risus sit in porttitor tempor aliquet nullam porta habitant. Id sed sed viverra dis. Vulputate ultrices lectus nunc ipsum maecenas ut tristique mi viverra. Maecenas magna augue ultricies nulla nibh convallis sit. Amet penatibus cras et sit leo. Commodo at lectus sagittis porttitor in et. Lorem vel pretium massa massa aliquam. Fermentum sociis donec augue viverra eleifend consequat. Consectetur nisl diam nibh netus vulputate duis ullamcorper blandit urna. Nunc ac erat maecenas eu neque id vel. Dignissim diam diam eu hendrerit. Suspendisse penatibus libero vitae volutpat eu a tellus. In tempor eu sed tincidunt. Consectetur et viverra convallis libero adipiscing justo. Scelerisque suscipit mauris facilisis maecenas. Cursus proin integer at fermentum turpis sed ullamcorper mi. Sed quis massa quam sit praesent proin eros. Nibh quam aliquet nisl diam. Pellentesque pellentesque nunc dui at vitae consectetur. Ac in dolor non commodo sagittis.Lorem ipsum dolor sit amet consectetur. Tincidunt ultrices vitae consequat maecenas lacus. Amet leo facilisis viverra suspendisse adipiscing vivamus morbi eu amet. Sit enim placerat mi facilisis. Ut sodales consequat luctus ante ut phasellus pellentesque.Lorem ipsum dolor sit amet consectetur. Pharetra augue ornare dolor quis facilisi nunc gravida sed. Et arcu at consectetur ullamcorper. Vel aliquam hac hac malesuada in enim bibendum dolor. Nulla pellentesque posuere eget iaculis curabitur nunc. Magna scelerisque imperdiet platea id orci. Sagittis volutpat rutrum ornare arcu pellentesque ut lobortis sed id. Eu vel at iaculis turpis accumsan nunc lacus. Vitae egestas at suscipit scelerisque nullam. Id arcu nam at placerat. Elementum ut rhoncus quisque tempor senectus nunc ac. Habitasse adipiscing urna lectus facilisi fermentum diam pharetra. Dolor eu nunc ante condimentum est faucibus turpis arcu. Egestas vitae non eget diam. At bibendum nam sed sed at sem.Lorem ipsum dolor sit amet consectetur. Pharetra augue ornare dolor quis facilisi nunc gravida sed. Et arcu at consectetur ullamcorper. Vel aliquam hac hac malesuada in enim bibendum dolor. Nulla pellentesque posuere eget iaculis curabitur nunc. Magna scelerisque imperdiet platea id orci. Sagittis volutpat rutrum ornare arcu pellentesque ut lobortis sed id. Eu vel at iaculis turpis accumsan nunc lacus. Vitae egestas at suscipit scelerisque nullam. Id arcu nam at placerat. Elementum ut rhoncus quisque tempor senectus nunc ac. Habitasse adipiscing urna lectus facilisi fermentum diam pharetra. Dolor eu nunc ante condimentum est faucibus turpis arcu. Egestas vitae non eget diam. At bibendum nam sed sed at sem.Lorem ipsum dolor sit amet consectetur. Nulla amet suspendisse convallis mauris. Lobortis est parturient auctor sed posuere diam cursus. Viverra pretium sit eget condimentum. Risus sit in porttitor tempor aliquet nullam porta habitant. Id sed sed viverra dis. Vulputate ultrices lectus nunc ipsum maecenas ut tristique mi viverra. Maecenas magna augue ultricies nulla nibh convallis sit. Amet penatibus cras et sit leo. Commodo at lectus sagittis porttitor in et. Lorem vel pretium massa massa aliquam. Fermentum sociis donec augue viverra eleifend consequat. Consectetur nisl diam nibh netus vulputate duis ullamcorper blandit urna. Nunc ac erat maecenas eu neque id vel. Dignissim diam diam eu hendrerit. Suspendisse penatibus libero vitae volutpat eu a tellus. In tempor eu sed tincidunt. Consectetur et viverra convallis libero adipiscing justo. Scelerisque suscipit mauris facilisis maecenas. Cursus proin integer at fermentum turpis sed ullamcorper mi. Sed quis massa quam sit praesent proin eros. Nibh quam aliquet nisl diam. Pellentesque pellentesque nunc dui at vitae consectetur. Ac in dolor non commodo sagittis."

  const latestBlogs = staticData.blogs.latestBlogs

  if (!blog) return notFound()

  return (
    <div className="p-10">
      <div className=" mx-auto">
        <h1 className="text-[#101828] text-center text-[64px]">{blog.title}</h1>
        <p className="text-gray-600 text-center text-sm mb-[12px]">
          {blog.blogDescription}
        </p>
        <p className="text-center mb-[12px]">Dr Sarah Chen</p>
        <Image
          src={blog.img}
          width={1601}
          height={728}
          alt="blog-image"
          className="mx-auto"
        />
        <div className="flex md:flex-row flex-col gap-[56px] md:mt-[100px] mt-[10px]">
          <div className="flex flex-col gap-5">
            <p className="flex-1 md:text-[18px] text-[13px]">{blogDesc}</p>
            <div className="flex justify-between items-center">
              <div className="flex-1 hidden md:flex">
                <Image
                  src="/arrow-left-line.svg"
                  alt="arrow-left-line"
                  width={24}
                  height={24}
                />
                <Link href="/blogs" className="text-[20px] text-[#1D2A49]">
                  Back to Home
                </Link>
              </div>
              <ShareAndDownloadButtons />
            </div>
          </div>

          <div className="flex-1 hidden lg:block">
            <h1 className="text-[#1D2A49] text-[24px] md:text-[36px] font-medium">
              Latest Blogs
            </h1>
            {latestBlogs.map((blog, index) => (
              <div
                key={index}
                className="rounded-[10px] p-2 md:p-5 mt-2 border md:h-[195px] md:w-[461px] border-[rgba(68,98,169,0.2)] shadow-[0_4px_20px_0_rgba(153,86,236,0.08)]"
              >
                <p className="md:py-[12px] md:px-[16px] py-[9px] px-[12px] text-left rounded-[4px] bg-[rgba(68,98,169,0.1)] inline-flex">
                  {blog.blogTitle}
                </p>
                <p className="text-[#1D2A49] text-[12px] md:text-[20px] font-semibold">
                  {blog.blogDescription}
                </p>
                <div className="flex">
                  <p className="md:text-[16px] text-[12px]">Read more</p>
                  <Image
                    src="/arrow-right-up.svg"
                    alt="arrow-right-up"
                    height={18}
                    width={18}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SimilarBlogsSection />
      <CommentSection />
    </div>
  )
}
