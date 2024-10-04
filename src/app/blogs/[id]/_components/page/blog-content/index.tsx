import Heading from '@/components/ui/heading'
import SocialMedias from '@/components/ui/social-medias'
import Image from 'next/image'

const socialMediaLinks = [
  {
    id: "1",
    platform: "Facebook",
    url: "https://www.facebook.com",
    ariaLabel: "Facebook",
  },
  {
    id: "2",
    platform: "Instagram",
    url: "https://www.instagram.com",
    ariaLabel: "Instagram",
  },
  {
    id: "3",
    platform: "Twitter",
    url: "https://www.twitter.com",
    ariaLabel: "Twitter",
  },
];

export default function BlogContent() {
  return (
    <section id="blog">
        <header className="mb-10 px-36 text-center">
          <Heading as="h1" className="mb-4">
            Fast Fashion, And Faster Fashion
          </Heading>
          <p className="text-h5-desktop text-dark-gray">
            by <strong className="uppercase">ANNY JOHNSON </strong> -{" "}
            <span>October 8,2020</span>
          </p>
        </header>
        <div className="relative mb-16 h-[40.25rem]">
          <Image
            src="https://via.placeholder.com/600x400?text=Main+Image"
            fill
            alt="blog title"
          />
        </div>
        <div className="px-36 text-h5-desktop">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            placerat, augue a volutpat hendrerit, sapien tortor faucibus augue,
            a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
            consequat sed eu felis. Nunc sed porta augue. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Aliquam placerat, augue a
            volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex
            vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu
            felis.
          </p>
          <div className="relative mt-14 h-[18.75rem]">
            <Image
              src="https://via.placeholder.com/600x400?text=Text+Image"
              fill
              alt="blog title"
            />
          </div>
          <div className="mt-20 flex items-center justify-between border-b border-b-gray pb-11">
            <div className="flex items-center gap-2">
              <span>Tags </span>-
              <span className="text-dark-gray">Fashion, Style, Season</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Share</span> -
              <SocialMedias socialMedias={socialMediaLinks} />
            </div>
          </div>
        </div>
      </section>
  )
}
