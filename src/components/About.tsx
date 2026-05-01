import backgroundImg from "@/assets/KASAR-BG-WEB.png";

const About = () => {
  return (
    <section
      id="about"
      // Added massive bottom padding (pb-64 on mobile, pb-96 on desktop) to push the background down
      className="pt-24 pb-64 md:pb-96 relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        // Anchored the image to the bottom so the white sky stays behind the text
        backgroundPosition: "bottom center", 
      }}
    >
      <div className="w-full max-w-7xl relative z-10 mx-auto px-4 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase font-bold tracking-[0.3em] text-red-600">
            About Jatra
          </p>

          <h2 className="mt-4 text-4xl font-semibold md:text-5xl text-black">
            Jatra – Back to the Roots of Uttarakhand
          </h2>

          {/* Changed text color to text-gray-900 and added font-medium for better readability */}
          <p className="mt-6 text-lg text-gray-900 font-medium leading-relaxed">
            Jatra – Back to the Roots of Uttarakhand is a cultural revival initiative aimed at reconnecting people with the region’s rich heritage, traditions, and lifestyle. It promotes pride in local culture while encouraging support for artisans, craftsmen, and handmade products. The festival showcases folk music, dance, storytelling, and traditional crafts from the hills, while also integrating adventure activities like trekking, paragliding, cycling, and outdoor challenges. It hosts cultural discussions and knowledge-sharing sessions involving experts and youth, along with competitions in arts, sports, and local skills for all age groups. Jatra also emphasizes sustainability, cleanliness, and eco-friendly practices, bringing together communities and visitors to celebrate unity, while boosting tourism by highlighting the natural beauty and cultural richness of Uttarakhand.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;